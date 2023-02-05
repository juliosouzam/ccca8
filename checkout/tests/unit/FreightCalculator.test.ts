import { Dimension } from "../../src/domain/entities/Dimension";
import { FreightCalculator } from "../../src/domain/entities/FreightCalculator";
import { Item } from "../../src/domain/entities/Item";

test("Deve calcular o frete", () => {
  const item = new Item(1, "Camiseta", 50, new Dimension(100, 30, 10, 3));
  const freight = FreightCalculator.calculate(item);
  expect(freight).toBe(30);
});

test("Deve calcular o frete mínimo", () => {
  const item = new Item(3, "Cabo", 30, new Dimension(1, 1, 1, 0.9));
  const freight = FreightCalculator.calculate(item);
  expect(freight).toBe(10);
});

test("Deve calcular o frete com a distância", () => {
  const item = new Item(1, "Camiseta", 50, new Dimension(100, 30, 10, 3));
  const distance = 748.2217780081631;
  const freight = FreightCalculator.calculate(item, distance);
  expect(freight).toBe(22.446653340244893);
});
