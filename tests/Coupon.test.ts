import { Coupon } from "../src/domain/entities/Coupon";

test("Deve criar cupom de desconto sem expiração", () => {
  const coupon = new Coupon("VALE20", 20);
  const discount = coupon.calculateDiscount(1000);
  expect(discount).toBe(200);
});

test("Deve criar cupom de desconto não expirado", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2022-12-31"));
  const discount = coupon.calculateDiscount(1000, new Date("2022-11-03"));
  expect(discount).toBe(200);
});

test("Deve criar cupom de desconto expirado", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2022-10-01T10:00:00"));
  const discount = coupon.calculateDiscount(
    1000,
    new Date("2022-11-03T10:00:00")
  );
  expect(discount).toBe(0);
});
