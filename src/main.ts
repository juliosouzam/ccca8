import { Checkout } from "./application/Checkout";
import { GetOrdersByCpf } from "./application/GetOrdersByCpf";
import { Preview } from "./application/Preview";
import { SimulateFreight } from "./application/SimulateFreight";
import { Coordenate } from "./domain/entities/Coordenate";
import { Coupon } from "./domain/entities/Coupon";
import { Dimension } from "./domain/entities/Dimension";
import { Item } from "./domain/entities/Item";
import { Zipcode } from "./domain/entities/Zipcode";
import { OrderController } from "./infra/controllers/OrderController";
import { MemoryRepositoryFactory } from "./infra/factory/MemoryRepositoryFactory";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { CouponRepositoryMemory } from "./infra/repositories/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "./infra/repositories/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "./infra/repositories/memory/OrderRepositoryMemory";
import { ZipcodeRepositoryMemory } from "./infra/repositories/memory/ZipcodeRepositoryMemory";

const itemRepository = new ItemRepositoryMemory();
itemRepository.save(
  new Item(1, "Camiseta", 50, new Dimension(30, 30, 30, 0.5))
);
itemRepository.save(new Item(2, "Caneca", 15));
itemRepository.save(new Item(3, "Poster", 30));
const orderRepository = new OrderRepositoryMemory();
const couponRepository = new CouponRepositoryMemory();
const zipcodeRepository = new ZipcodeRepositoryMemory();
zipcodeRepository.save(
  new Zipcode("88015600", "Rua", "Bairro", new Coordenate(-27.5935, -48.55854))
);
zipcodeRepository.save(
  new Zipcode("22060030", "Rua", "Bairro", new Coordenate(-22.9068, -43.1729))
);
couponRepository.save(new Coupon("VALE20", 20));
const repositoryFactory = new MemoryRepositoryFactory();
const preview = new Preview(itemRepository, couponRepository);
const checkout = new Checkout(repositoryFactory);
const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
const simulateFreight = new SimulateFreight(itemRepository, zipcodeRepository);
const httpServer = new ExpressAdapter();
new OrderController(
  httpServer,
  preview,
  checkout,
  getOrdersByCpf,
  simulateFreight
);
httpServer.listen(3333);
