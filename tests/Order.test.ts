import { Coupon } from "../src/domain/entities/Coupon";
import { Item } from "../src/domain/entities/Item";
import { Order } from "../src/domain/entities/Order";

test("Não deve criar um pedido com cpf inválido", () => {
  expect(() => new Order("111.111.111-11")).toThrow(new Error("Invalid CPF"));
});

test("Deve criar um pedido sem itens", () => {
  const order = new Order("152.423.120-76");
  expect(order.getTotal()).toBe(0);
});

test("Deve criar um pedido com 3 itens", () => {
  const order = new Order("152.423.120-76");
  order.addItem(new Item(1, "Camiseta", 50), 1);
  order.addItem(new Item(2, "Caneca", 15), 3);
  order.addItem(new Item(3, "Poster", 30), 2);
  expect(order.getTotal()).toBe(155);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", () => {
  const order = new Order("152.423.120-76");
  order.addItem(new Item(1, "Camiseta", 50), 1);
  order.addItem(new Item(2, "Caneca", 15), 3);
  order.addItem(new Item(3, "Poster", 30), 2);
  order.addCoupon(new Coupon("VALE20", 20));
  expect(order.getTotal()).toBe(124);
});
