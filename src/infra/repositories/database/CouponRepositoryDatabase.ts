import { Coupon } from "../../../domain/entities/Coupon";
import { CouponRepository } from "../../../domain/repositories/CouponRepository";
import { Connection } from "../../database/Connection";

export class CouponRepositoryDatabase implements CouponRepository {
  constructor(private readonly connection: Connection) {}

  async save(coupon: Coupon): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getCoupon(code: string): Promise<Coupon> {
    const [couponData] = await this.connection.query(
      'SELECT code, percentage FROM "coupon" WHERE code = $1',
      [code]
    );

    return new Coupon(couponData.code, couponData.percentage);
  }
}
