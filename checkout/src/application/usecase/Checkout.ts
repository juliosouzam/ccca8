import { Order } from "../../domain/entities/Order";
import { RepositoryFactory } from "../../domain/factory/RepositoryFactory";
import { CouponRepository } from "../../domain/repositories/CouponRepository";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { CalculateFreightGateway } from "../gateway/CalculateFreightGateway";
import { DecrementStockGateway } from "../gateway/DecrementStockGateway";
import { GetItemGateway } from "../gateway/GetItemGateway";

export class Checkout {
  private couponRepository: CouponRepository;
  private orderRepository: OrderRepository;

  constructor(
    private repositoryFactory: RepositoryFactory,
    readonly getItemGateway: GetItemGateway,
    readonly calculateFreightGateway: CalculateFreightGateway,
    readonly decrementStockGateway: DecrementStockGateway
  ) {
    this.couponRepository = this.repositoryFactory.createCouponRepository();
    this.orderRepository = this.repositoryFactory.createOrderRepository();
  }

  async execute(input: Input): Promise<void> {
    const nextSequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.createdAt, nextSequence);
    const orderItems = [];
    const decrementOrderItems = [];
    for (const orderItem of input.orderItems) {
      const item = await this.getItemGateway.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
      orderItems.push({
        volume: item.getVolume(),
        density: item.getDensity(),
        quantity: orderItem.quantity,
      });
      decrementOrderItems.push({
        idItem: orderItem.idItem,
        quantity: orderItem.quantity,
      });
    }
    order.freight = await this.calculateFreightGateway.calculate(
      orderItems,
      input.from || "",
      input.to || ""
    );
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon);
      order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
    await this.decrementStockGateway.execute(decrementOrderItems);
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  coupon?: string;
  createdAt?: Date;
  from?: string;
  to?: string;
};
