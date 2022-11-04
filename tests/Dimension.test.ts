import { Dimension } from "../src/domain/entities/Dimension";

test("Deve calcular o volume", () => {
  const dimension = new Dimension(100, 30, 10, 3);
  expect(dimension.getVolume()).toBe(0.03);
});

test("Não deve criar dimensão inválida", () => {
  expect(() => new Dimension(-100, -30, -10, -3)).toThrow(
    new Error("Invalid dimension")
  );
});
