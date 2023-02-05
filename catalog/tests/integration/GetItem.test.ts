import { GetItem } from "../../src/application/usecase/GetItem";
import { Dimension } from "../../src/domain/entities/Dimension";
import { Item } from "../../src/domain/entities/Item";
import { ItemRepositoryMemory } from "../../src/infra/repositories/memory/ItemRepositoryMemory";

test("Deve obter o item", async () => {
  const itemRepository = new ItemRepositoryMemory();
  await itemRepository.save(
    new Item(1, "Camiseta", 50, new Dimension(100, 30, 10, 3))
  );
  const getItem = new GetItem(itemRepository);
  const item = await getItem.execute({ idItem: 1 });
  expect(item.description).toBe("Camiseta");
  expect(item.price).toBe(50);
});
