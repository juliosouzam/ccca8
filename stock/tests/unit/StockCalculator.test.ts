import { StockCalculator } from "../../src/domain/entities/StockCalculator";
import { StockEntry } from "../../src/domain/entities/StockEntry";

test("Deve calcular o estoque de um item", () => {
  const stockEntries = [
    new StockEntry(1, "in", 10, new Date("2023-02-01")),
    new StockEntry(1, "in", 10, new Date("2023-02-01")),
    new StockEntry(1, "out", 5, new Date("2023-02-02")),
  ];
  const total = StockCalculator.calculate(stockEntries);
  expect(total).toBe(15);
});
