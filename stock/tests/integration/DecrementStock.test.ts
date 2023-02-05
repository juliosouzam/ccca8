import { DecrementStock } from "../../src/application/usecase/DecrementStock";
import { GetStock } from "../../src/application/usecase/GetStock";
import { StockEntry } from "../../src/domain/entities/StockEntry";
import { StockRepositoryMemory } from "../../src/infra/repositories/memory/StockRepositoryMemory";

test("Deve decrementar o estoque", async () => {
  const stockRepository = new StockRepositoryMemory();
  stockRepository.save(new StockEntry(1, "in", 20, new Date("2023-01-30")));
  const decrementStock = new DecrementStock(stockRepository);
  const input = {
    idItem: 1,
    quantity: 10,
  };
  await decrementStock.execute(input);
  const getStock = new GetStock(stockRepository);
  const output = await getStock.execute(input.idItem);
  expect(output.total).toBe(10);
});
