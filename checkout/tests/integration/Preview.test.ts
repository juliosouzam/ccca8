import { CalculateFreightGateway } from "../../src/application/gateway/CalculateFreightGateway";
import { GetItemGateway } from "../../src/application/gateway/GetItemGateway";
import { Preview } from "../../src/application/usecase/Preview";
import { Coordenate } from "../../src/domain/entities/Coordenate";
import { Coupon } from "../../src/domain/entities/Coupon";
import { Dimension } from "../../src/domain/entities/Dimension";
import { Item } from "../../src/domain/entities/Item";
import { Zipcode } from "../../src/domain/entities/Zipcode";
import { CouponRepositoryMemory } from "../../src/infra/repositories/memory/CouponRepositoryMemory";
import { ZipcodeRepositoryMemory } from "../../src/infra/repositories/memory/ZipcodeRepositoryMemory";

let preview: Preview;

beforeEach(() => {
  const couponRepository = new CouponRepositoryMemory();
  couponRepository.save(new Coupon("VALE20", 20));
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
  const getItemGateway: GetItemGateway = {
    async getItem(idItem: number): Promise<Item> {
      return new Item(1, "Camiseta", 50, new Dimension(30, 30, 30, 30));
    },
  };
  const calculateFreightGateway: CalculateFreightGateway = {
    async calculate(
      orderItems: { volume: number; density: number; quantity: number }[],
      from: string,
      to: string
    ): Promise<number> {
      return 10;
    },
  };
  preview = new Preview(
    couponRepository,
    getItemGateway,
    calculateFreightGateway
  );
});

test("Deve simular um pedido", async () => {
  const input = {
    cpf: "152.423.120-76",
    orderItems: [
      {
        idItem: 1,
        quantity: 3,
      },
    ],
    from: "88015600",
    to: "22060030",
    createdAt: new Date("2021-10-10T10:00:00"),
  };
  const total = await preview.execute(input);
  expect(total).toBe(160);
});

test("Deve simular um pedido com desconto", async () => {
  const input = {
    cpf: "152.423.120-76",
    orderItems: [
      {
        idItem: 1,
        quantity: 3,
      },
    ],
    from: "88015600",
    to: "22060030",
    coupon: "VALE20",
  };
  const total = await preview.execute(input);
  expect(total).toBe(130);
});

test("Deve simular um pedido com distância", async () => {
  const input = {
    cpf: "152.423.120-76",
    orderItems: [
      {
        idItem: 1,
        quantity: 3,
      },
    ],
    createdAt: new Date("2021-10-10T10:00:00"),
    from: "88015600",
    to: "22060030",
  };
  const total = await preview.execute(input);
  expect(total).toBe(160);
});
