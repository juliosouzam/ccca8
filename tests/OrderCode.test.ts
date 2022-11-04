import { OrderCode } from "../src/domain/entities/OrderCode";

test("Deve criar o código", () => {
  const orderCode = new OrderCode(new Date("2022-11-03T10:00:00"), 1);
  expect(orderCode.getCode()).toBe("202200000001");
});
