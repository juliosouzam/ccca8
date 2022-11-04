import { Checkout } from "../src/application/Checkout";
import { GetOrdersByCpf } from "../src/application/GetOrdersByCpf";
import { Coupon } from "../src/domain/entities/Coupon";
import { Dimension } from "../src/domain/entities/Dimension";
import { Item } from "../src/domain/entities/Item";
import { CouponRepository } from "../src/domain/repositories/CouponRepository";
import { ItemRepository } from "../src/domain/repositories/ItemRepository";
import { OrderRepository } from "../src/domain/repositories/OrderRepository";
import { MemoryRepositoryFactory } from "../src/infra/factory/MemoryRepositoryFactory";

let repositoryFactory: MemoryRepositoryFactory;
let itemRepository: ItemRepository;
let orderRepository: OrderRepository;
let couponRepository: CouponRepository;

beforeEach(() => {
  repositoryFactory = new MemoryRepositoryFactory();
  itemRepository = repositoryFactory.createItemRepository();
  orderRepository = repositoryFactory.createOrderRepository();
  couponRepository = repositoryFactory.createCouponRepository();
});

test("Deve fazer um pedido", async () => {
  await itemRepository.save(new Item(1, "Camiseta", 50));
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  const checkout = new Checkout(repositoryFactory);
  const cpf = "152.423.120-76";
  const input = {
    cpf,
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 3,
      },
      {
        idItem: 3,
        quantity: 2,
      },
    ],
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(155);
});

test("Deve fazer um pedido com desconto", async () => {
  await itemRepository.save(new Item(1, "Camiseta", 50));
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  await couponRepository.save(new Coupon("VALE20", 20));
  const checkout = new Checkout(repositoryFactory);
  const cpf = "152.423.120-76";
  const input = {
    cpf,
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 3,
      },
      {
        idItem: 3,
        quantity: 2,
      },
    ],
    coupon: "VALE20",
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(124);
});

test("Deve fazer um pedido com desconto expirado", async () => {
  await itemRepository.save(new Item(1, "Camiseta", 50));
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  await couponRepository.save(
    new Coupon("VALE20", 20, new Date("2022-10-01T10:00:00"))
  );
  const checkout = new Checkout(repositoryFactory);
  const cpf = "152.423.120-76";
  const input = {
    cpf,
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 3,
      },
      {
        idItem: 3,
        quantity: 2,
      },
    ],
    coupon: "VALE20",
    createdAt: new Date("2022-11-03T10:00:00"),
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(155);
});

test("Deve fazer um pedido com desconto não expirado", async () => {
  await itemRepository.save(new Item(1, "Camiseta", 50));
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  await couponRepository.save(
    new Coupon("VALE20", 20, new Date("2022-11-03T10:00:00"))
  );
  const checkout = new Checkout(repositoryFactory);
  const cpf = "152.423.120-76";
  const input = {
    cpf,
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 3,
      },
      {
        idItem: 3,
        quantity: 2,
      },
    ],
    coupon: "VALE20",
    createdAt: new Date("2022-11-01T10:00:00"),
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(124);
});

test("Deve fazer um pedido com frete", async () => {
  await itemRepository.save(
    new Item(1, "Camiseta", 50, new Dimension(10, 10, 10, 3))
  );
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  const checkout = new Checkout(repositoryFactory);
  const cpf = "152.423.120-76";
  const input = {
    cpf,
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
      {
        idItem: 2,
        quantity: 3,
      },
      {
        idItem: 3,
        quantity: 2,
      },
    ],
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(185);
});

test("Deve fazer um pedido com código", async () => {
  await itemRepository.save(new Item(1, "Camiseta", 50));
  const checkout = new Checkout(repositoryFactory);
  const cpf = "152.423.120-76";
  const input = {
    cpf,
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
    createdAt: new Date("2022-11-03T10:00:00"),
  };
  await checkout.execute(input);
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(2);
  expect(orders[0].code).toBe("202200000001");
  expect(orders[1].code).toBe("202200000002");
});
