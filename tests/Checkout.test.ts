import { Checkout } from "../src/application/Checkout";
import { GetOrdersByCpf } from "../src/application/GetOrdersByCpf";
import { Preview } from "../src/application/Preview";
import { Item } from "../src/domain/entities/Item";
import { ItemRepositoryMemory } from "../src/infra/repositories/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../src/infra/repositories/memory/OrderRepositoryMemory";

test("Deve fazer um pedido", async () => {
  const itemRepository = new ItemRepositoryMemory();
  await itemRepository.save(new Item(1, "Camiseta", 50));
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  const orderRepository = new OrderRepositoryMemory();
  const checkout = new Checkout(itemRepository, orderRepository);
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
