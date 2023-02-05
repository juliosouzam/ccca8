import { RepositoryFactory } from "../../domain/factory/RepositoryFactory";
import { CouponRepository } from "../../domain/repositories/CouponRepository";
import { ItemRepository } from "../../domain/repositories/ItemRepository";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Connection } from "../database/Connection";
import { CouponRepositoryDatabase } from "../repositories/database/CouponRepositoryDatabase";
import { ItemRepositoryDatabase } from "../repositories/database/ItemRepositoryDatabase";
import { OrderRepositoryDatabase } from "../repositories/database/OrderRepositoryDatabase";

export class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private readonly connection: Connection) {}

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.connection);
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection);
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection);
  }
}
