import { Preview } from "../../src/application/Preview";
import { Coordenate } from "../../src/domain/entities/Coordenate";
import { Coupon } from "../../src/domain/entities/Coupon";
import { Dimension } from "../../src/domain/entities/Dimension";
import { Item } from "../../src/domain/entities/Item";
import { Zipcode } from "../../src/domain/entities/Zipcode";
import { CouponRepositoryMemory } from "../../src/infra/repositories/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../../src/infra/repositories/memory/ItemRepositoryMemory";
import { ZipcodeRepositoryMemory } from "../../src/infra/repositories/memory/ZipcodeRepositoryMemory";

let preview: Preview;

beforeEach(() => {
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(new Item(1, "Camiseta", 50));
  itemRepository.save(new Item(2, "Caneca", 15));
  itemRepository.save(new Item(3, "Poster", 30));
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
  preview = new Preview(itemRepository, couponRepository, zipcodeRepository);
});

test("Deve simular um pedido", async () => {
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
    createdAt: new Date("2021-10-10T10:00:00"),
  };
  const total = await preview.execute(input);
  expect(total).toBe(155);
});

test("Deve simular um pedido com desconto", async () => {
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
    coupon: "VALE20",
  };
  const total = await preview.execute(input);
  expect(total).toBe(124);
});

test("Deve simular um pedido", async () => {
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Camiseta", 50, new Dimension(30, 30, 30, 0.5))
  );
  itemRepository.save(new Item(2, "Caneca", 15));
  itemRepository.save(new Item(3, "Poster", 30));
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
  preview = new Preview(itemRepository, couponRepository, zipcodeRepository);
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
    createdAt: new Date("2021-10-10T10:00:00"),
    from: "88015600",
    to: "22060030",
  };
  const total = await preview.execute(input);
  expect(total).toBe(165);
});
