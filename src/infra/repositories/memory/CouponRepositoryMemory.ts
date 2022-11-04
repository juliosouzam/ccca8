import { Coupon } from "../../../domain/entities/Coupon";
import { CouponRepository } from "../../../domain/repositories/CouponRepository";

export class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  async save(coupon: Coupon): Promise<void> {
    this.coupons.push(coupon);
  }

  async getCoupon(code: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupon) => coupon.code === code);
    if (!coupon) throw new Error("Coupon not found");

    return coupon;
  }
}
