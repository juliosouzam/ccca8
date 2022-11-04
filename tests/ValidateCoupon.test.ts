import { ValidateCoupon } from "../src/application/ValidateCoupon";
import { Coupon } from "../src/domain/entities/Coupon";
import { CouponRepositoryMemory } from "../src/infra/repositories/memory/CouponRepositoryMemory";

test("Deve validar um cupom de desconto", async () => {
  const couponRepository = new CouponRepositoryMemory();
  couponRepository.save(
    new Coupon("VALE20", 20, new Date("2022-12-01T10:00:00"))
  );
  const validateCoupon = new ValidateCoupon(couponRepository);
  const input = {
    date: new Date("2022-10-10T10:00:00"),
    code: "VALE20",
  };
  const isValid = await validateCoupon.execute(input);
  expect(isValid).toBeTruthy();
});
