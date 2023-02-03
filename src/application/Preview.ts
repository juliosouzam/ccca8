import { DistanceCalculator } from "../domain/entities/DistanceCalculator";
import { FreightCalculator } from "../domain/entities/FreightCalculator";
import { Order } from "../domain/entities/Order";
import { CouponRepository } from "../domain/repositories/CouponRepository";
import { ItemRepository } from "../domain/repositories/ItemRepository";
import { ZipcodeRepository } from "../domain/repositories/ZipcodeRepository";

export class Preview {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository,
    readonly zipcodeRepository: ZipcodeRepository
  ) {}

  async execute(input: Input): Promise<number> {
    let distance;
    if (input.from && input.to) {
      const from = await this.zipcodeRepository.getByCode(input.from);
      const to = await this.zipcodeRepository.getByCode(input.to);
      distance = DistanceCalculator.calculate(from.coordinate, to.coordinate);
    }
    const order = new Order(input.cpf, input.createdAt);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
      order.freight +=
        FreightCalculator.calculate(item, distance) * orderItem.quantity;
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
  from?: string;
  to?: string;
};
