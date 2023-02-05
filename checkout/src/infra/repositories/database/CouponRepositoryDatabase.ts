import { Coupon } from "../../../domain/entities/Coupon";
import { CouponRepository } from "../../../domain/repositories/CouponRepository";
import { Connection } from "../../database/Connection";

export class CouponRepositoryDatabase implements CouponRepository {
  constructor(private readonly connection: Connection) {}

  async save(coupon: Coupon): Promise<void> {
    await this.connection.query(
      'insert into "coupon" (code, percentage, expire_date) values ($1, $2, $3)',
      [coupon.code, coupon.percent, coupon.expiredDate]
    );
  }

  async getCoupon(code: string): Promise<Coupon> {
    const [couponData] = await this.connection.query(
      'SELECT code, percentage, expire_date FROM "coupon" WHERE code = $1',
      [code]
    );

    return new Coupon(
      couponData.code,
      couponData.percentage,
      couponData.expire_date
    );
  }
}
