import { SimulateFreight } from "../src/application/SimulateFreight";
import { Dimension } from "../src/domain/entities/Dimension";
import { Item } from "../src/domain/entities/Item";
import { ItemRepositoryMemory } from "../src/infra/repositories/memory/ItemRepositoryMemory";

test("Deve simular o frete", async () => {
  const itemRepository = new ItemRepositoryMemory();
  await itemRepository.save(
    new Item(1, "Camiseta", 50, new Dimension(100, 30, 10, 3))
  );
  const simulateFreight = new SimulateFreight(itemRepository);
  const input = {
    orderItems: [{ idItem: 1, quantity: 1 }],
  };
  const freigh = await simulateFreight.execute(input);
  expect(freigh).toBe(30);
});
