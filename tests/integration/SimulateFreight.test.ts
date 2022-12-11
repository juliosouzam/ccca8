import { SimulateFreight } from "../../src/application/SimulateFreight";
import { Coordenate } from "../../src/domain/entities/Coordenate";
import { Dimension } from "../../src/domain/entities/Dimension";
import { Item } from "../../src/domain/entities/Item";
import { Zipcode } from "../../src/domain/entities/Zipcode";
import { ItemRepositoryMemory } from "../../src/infra/repositories/memory/ItemRepositoryMemory";
import { ZipcodeRepositoryMemory } from "../../src/infra/repositories/memory/ZipcodeRepositoryMemory";

test("Deve simular o frete", async () => {
  const itemRepository = new ItemRepositoryMemory();
  await itemRepository.save(
    new Item(1, "Camiseta", 50, new Dimension(100, 30, 10, 3))
  );
  const zipcodeRepository = new ZipcodeRepositoryMemory();
  zipcodeRepository.save(
    new Zipcode(
      "88015600",
      "Rua",
      "Bairro",
      new Coordenate(-27.5935, -48.55854)
    )
  );
  zipcodeRepository.save(
    new Zipcode("22060030", "Rua", "Bairro", new Coordenate(-22.9068, -43.1729))
  );
  const simulateFreight = new SimulateFreight(
    itemRepository,
    zipcodeRepository
  );
  const input = {
    orderItems: [{ idItem: 1, quantity: 1 }],
  };
  const freigh = await simulateFreight.execute(input);
  expect(freigh).toBe(30);
});

test("Deve simular o frete calculando a distância", async () => {
  const itemRepository = new ItemRepositoryMemory();
  await itemRepository.save(
    new Item(1, "Camiseta", 50, new Dimension(100, 30, 10, 3))
  );
  const zipcodeRepository = new ZipcodeRepositoryMemory();
  zipcodeRepository.save(
    new Zipcode(
      "88015600",
      "Rua",
      "Bairro",
      new Coordenate(-27.5935, -48.55854)
    )
  );
  zipcodeRepository.save(
    new Zipcode("22060030", "Rua", "Bairro", new Coordenate(-22.9068, -43.1729))
  );
  const simulateFreight = new SimulateFreight(
    itemRepository,
    zipcodeRepository
  );
  const input = {
    orderItems: [{ idItem: 1, quantity: 1 }],
    from: "88015600",
    to: "22060030",
  };
  const freigh = await simulateFreight.execute(input);
  expect(freigh).toBe(22.541737102233252);
});
