import { Coupon } from "../entities/Coupon";

export interface CouponRepository {
  save(coupon: Coupon): Promise<void>;
  getCoupon(code: string): Promise<Coupon>;
}
