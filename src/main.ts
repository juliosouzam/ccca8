import { Checkout } from "./application/Checkout";
import { GetOrdersByCpf } from "./application/GetOrdersByCpf";
import { Preview } from "./application/Preview";
import { SimulateFreight } from "./application/SimulateFreight";
import { Coupon } from "./domain/entities/Coupon";
import { Dimension } from "./domain/entities/Dimension";
import { Item } from "./domain/entities/Item";
import { OrderController } from "./infra/controllers/OrderController";
import { MemoryRepositoryFactory } from "./infra/factory/MemoryRepositoryFactory";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { CouponRepositoryMemory } from "./infra/repositories/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "./infra/repositories/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "./infra/repositories/memory/OrderRepositoryMemory";

const itemRepository = new ItemRepositoryMemory();
itemRepository.save(
  new Item(1, "Camiseta", 50, new Dimension(30, 30, 30, 0.5))
);
itemRepository.save(new Item(2, "Caneca", 15));
itemRepository.save(new Item(3, "Poster", 30));
const orderRepository = new OrderRepositoryMemory();
const couponRepository = new CouponRepositoryMemory();
couponRepository.save(new Coupon("VALE20", 20));
const repositoryFactory = new MemoryRepositoryFactory();
const preview = new Preview(itemRepository, couponRepository);
const checkout = new Checkout(repositoryFactory);
const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
const simulateFreight = new SimulateFreight(itemRepository);
const httpServer = new ExpressAdapter();
new OrderController(
  httpServer,
  preview,
  checkout,
  getOrdersByCpf,
  simulateFreight
);
httpServer.listen(3333);
