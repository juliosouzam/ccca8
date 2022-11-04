import { Order } from "../domain/entities/Order";
import { RepositoryFactory } from "../domain/factory/RepositoryFactory";
import { CouponRepository } from "../domain/repositories/CouponRepository";
import { ItemRepository } from "../domain/repositories/ItemRepository";
import { OrderRepository } from "../domain/repositories/OrderRepository";

export class Checkout {
  private itemRepository: ItemRepository;
  private couponRepository: CouponRepository;
  private orderRepository: OrderRepository;

  constructor(private repositoryFactory: RepositoryFactory) {
    this.itemRepository = this.repositoryFactory.createItemRepository();
    this.couponRepository = this.repositoryFactory.createCouponRepository();
    this.orderRepository = this.repositoryFactory.createOrderRepository();
  }

  async execute(input: Input): Promise<void> {
    const nextSequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.createdAt, nextSequence);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon);
      order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  coupon?: string;
  createdAt?: Date;
};
