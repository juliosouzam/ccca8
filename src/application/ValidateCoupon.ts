import { CouponRepository } from "../domain/repositories/CouponRepository";

export class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(input: Input): Promise<boolean> {
    const coupon = await this.couponRepository.getCoupon(input.code);
    return !coupon.isExpired(input.date);
  }
}

type Input = {
  date: Date;
  code: string;
};
