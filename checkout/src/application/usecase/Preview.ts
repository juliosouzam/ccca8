import { Order } from "../../domain/entities/Order";
import { CouponRepository } from "../../domain/repositories/CouponRepository";
import { CalculateFreightGateway } from "../gateway/CalculateFreightGateway";
import { GetItemGateway } from "../gateway/GetItemGateway";

export class Preview {
  constructor(
    readonly couponRepository: CouponRepository,
    readonly getItemGateway: GetItemGateway,
    readonly calculateFreightGateway: CalculateFreightGateway
  ) {}

  async execute(input: Input): Promise<number> {
    const orderItems = [];
    const order = new Order(input.cpf, input.createdAt);
    for (const orderItem of input.orderItems) {
      const item = await this.getItemGateway.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
      orderItems.push({
        volume: item.getVolume(),
        density: item.getDensity(),
        quantity: orderItem.quantity,
      });
    }
    order.freight = await this.calculateFreightGateway.calculate(
      orderItems,
      input.from,
      input.to
    );
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon);
      order.addCoupon(coupon);
    }
    return order.getTotal();
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  coupon?: string;
  createdAt?: Date;
  from: string;
  to: string;
};
