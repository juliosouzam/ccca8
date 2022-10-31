import { Preview } from "../src/application/Preview";
import { Item } from "../src/domain/entities/Item";
import { ItemRepositoryMemory } from "../src/infra/repositories/memory/ItemRepositoryMemory";

test("Deve simular um pedido", async () => {
  const itemRepository = new ItemRepositoryMemory();
  await itemRepository.save(new Item(1, "Camiseta", 50));
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  const preview = new Preview(itemRepository);
  const input = {
    cpf: "152.423.120-76",
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
  const total = await preview.execute(input);
  expect(total).toBe(155);
});
