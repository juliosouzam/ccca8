import { CalculateFreight } from "../../src/application/usecase/CalculateFreight";
import { Coordenate } from "../../src/domain/entities/Coordenate";
import { Zipcode } from "../../src/domain/entities/Zipcode";
import { ZipcodeRepositoryMemory } from "../../src/infra/repositories/memory/ZipcodeRepositoryMemory";

test("Deve simular o frete", async () => {
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
  const calculateFreight = new CalculateFreight(zipcodeRepository);
  const input = {
    orderItems: [{ volume: 0.03, density: 100, quantity: 1 }],
  };
  const freigh = await calculateFreight.execute(input);
  expect(freigh).toBe(30);
});

test("Deve simular o frete calculando a distância", async () => {
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
  const calculateFreight = new CalculateFreight(zipcodeRepository);
  const input = {
    orderItems: [{ volume: 0.03, density: 100, quantity: 1 }],
    from: "88015600",
    to: "22060030",
  };
  const freigh = await calculateFreight.execute(input);
  expect(freigh).toBe(22.541737102233252);
});
