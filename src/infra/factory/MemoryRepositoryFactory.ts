import { RepositoryFactory } from "../../domain/factory/RepositoryFactory";
import { CouponRepository } from "../../domain/repositories/CouponRepository";
import { ItemRepository } from "../../domain/repositories/ItemRepository";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { CouponRepositoryMemory } from "../repositories/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../repositories/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../repositories/memory/OrderRepositoryMemory";

export class MemoryRepositoryFactory implements RepositoryFactory {
  itemRepository?: ItemRepository;
  couponRepository?: CouponRepository;
  orderRepository?: OrderRepository;

  createItemRepository(): ItemRepository {
    if (!this.itemRepository) {
      this.itemRepository = new ItemRepositoryMemory();
    }
    return this.itemRepository;
  }

  createCouponRepository(): CouponRepository {
    if (!this.couponRepository) {
      this.couponRepository = new CouponRepositoryMemory();
    }
    return this.couponRepository;
  }

  createOrderRepository(): OrderRepository {
    if (!this.orderRepository) {
      this.orderRepository = new OrderRepositoryMemory();
    }
    return this.orderRepository;
  }
}
