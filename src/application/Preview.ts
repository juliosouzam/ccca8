import { Order } from "../domain/entities/Order";
import { CouponRepository } from "../domain/repositories/CouponRepository";
import { ItemRepository } from "../domain/repositories/ItemRepository";

export class Preview {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository
  ) {}

  async execute(input: Input): Promise<number> {
    const order = new Order(input.cpf, input.createdAt);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
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
};
