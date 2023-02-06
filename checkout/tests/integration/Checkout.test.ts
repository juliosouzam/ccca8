import { Checkout } from "../../src/application/usecase/Checkout";
import { Item } from "../../src/domain/entities/Item";
import { ItemRepository } from "../../src/domain/repositories/ItemRepository";
import { OrderRepository } from "../../src/domain/repositories/OrderRepository";
import { Connection } from "../../src/infra/database/Connection";
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";
import { MemoryRepositoryFactory } from "../../src/infra/factory/MemoryRepositoryFactory";
import { GetItemGateway } from "../../src/application/gateway/GetItemGateway";
import { CalculateFreightGateway } from "../../src/application/gateway/CalculateFreightGateway";
import { DecrementStockGateway } from "../../src/application/gateway/DecrementStockGateway";
import { GetItemHttpGateway } from "../../src/infra/gateway/GetItemHttpGateway";
import { CalculateFreightHttpGateway } from "../../src/infra/gateway/CalculateFreightHttpGateway";
import { DecrementStockHttpGateway } from "../../src/infra/gateway/DecrementStockHttpGateway";
import { GetOrdersByCpf } from "../../src/application/usecase/GetOrdersByCpf";
import { Queue } from "../../src/infra/queue/Queue";
import { RabbitMQAdapter } from "../../src/infra/queue/RabbitMQAdapter";

let repositoryFactory: MemoryRepositoryFactory;
let itemRepository: ItemRepository;
let orderRepository: OrderRepository;
let getItemGateway: GetItemGateway;
let calculateFreightGateway: CalculateFreightGateway;
let decrementStockGateway: DecrementStockGateway;
let queue: Queue;

let connection: Connection;
beforeEach(async () => {
  connection = new PgPromiseAdapter(
    "ecommerce",
    "pOstgr3s@2023",
    5432,
    "localhost",
    "ecommerce"
  );
  repositoryFactory = new DatabaseRepositoryFactory(connection);
  itemRepository = repositoryFactory.createItemRepository();
  orderRepository = repositoryFactory.createOrderRepository();
  getItemGateway = new GetItemHttpGateway();
  calculateFreightGateway = new CalculateFreightHttpGateway();
  decrementStockGateway = new DecrementStockHttpGateway();
  queue = new RabbitMQAdapter();
  await queue.connect();
});

afterEach(async () => {
  await orderRepository.clear();
  await connection.disconnect();
});

test("Deve fazer um pedido", async () => {
  const checkout = new Checkout(
    repositoryFactory,
    getItemGateway,
    calculateFreightGateway,
    decrementStockGateway,
    queue
  );
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
        quantity: 1,
      },
      {
        idItem: 3,
        quantity: 3,
      },
    ],
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(6350);
});

test("Deve fazer um pedido com desconto", async () => {
  const checkout = new Checkout(
    repositoryFactory,
    getItemGateway,
    calculateFreightGateway,
    decrementStockGateway,
    queue
  );
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
        quantity: 1,
      },
      {
        idItem: 3,
        quantity: 3,
      },
    ],
    coupon: "VALE20",
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(5132);
});

test("Deve fazer um pedido com desconto expirado", async () => {
  const checkout = new Checkout(
    repositoryFactory,
    getItemGateway,
    calculateFreightGateway,
    decrementStockGateway,
    queue
  );
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
        quantity: 1,
      },
      {
        idItem: 3,
        quantity: 3,
      },
    ],
    coupon: "VALE30",
    createdAt: new Date("2023-02-05T10:00:00"),
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(6350);
});

test("Deve fazer um pedido com desconto não expirado", async () => {
  const checkout = new Checkout(
    repositoryFactory,
    getItemGateway,
    calculateFreightGateway,
    decrementStockGateway,
    queue
  );
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
        quantity: 1,
      },
      {
        idItem: 3,
        quantity: 3,
      },
    ],
    coupon: "VALE20",
    createdAt: new Date("2022-11-01T10:00:00"),
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(5132);
});

test("Deve fazer um pedido com frete", async () => {
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  const checkout = new Checkout(
    repositoryFactory,
    getItemGateway,
    calculateFreightGateway,
    decrementStockGateway,
    queue
  );
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
        quantity: 1,
      },
      {
        idItem: 3,
        quantity: 3,
      },
    ],
  };
  await checkout.execute(input);
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const orders = await getOrdersByCpf.execute({ cpf });
  expect(orders.length).toBe(1);
  expect(orders[0].total).toBe(6350);
});

test("Deve fazer um pedido com código", async () => {
  await itemRepository.save(new Item(1, "Camiseta", 50));
  const checkout = new Checkout(
    repositoryFactory,
    getItemGateway,
    calculateFreightGateway,
    decrementStockGateway,
    queue
  );
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
