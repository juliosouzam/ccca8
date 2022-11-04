import { Preview } from "../src/application/Preview";
import { Coupon } from "../src/domain/entities/Coupon";
import { Item } from "../src/domain/entities/Item";
import { CouponRepositoryMemory } from "../src/infra/repositories/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../src/infra/repositories/memory/ItemRepositoryMemory";

test("Deve simular um pedido", async () => {
  const itemRepository = new ItemRepositoryMemory();
  await itemRepository.save(new Item(1, "Camiseta", 50));
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  const couponRepository = new CouponRepositoryMemory();
  const preview = new Preview(itemRepository, couponRepository);
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
  const itemRepository = new ItemRepositoryMemory();
  await itemRepository.save(new Item(1, "Camiseta", 50));
  await itemRepository.save(new Item(2, "Caneca", 15));
  await itemRepository.save(new Item(3, "Poster", 30));
  const couponRepository = new CouponRepositoryMemory();
  await couponRepository.save(new Coupon("VALE20", 20));
  const preview = new Preview(itemRepository, couponRepository);
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
