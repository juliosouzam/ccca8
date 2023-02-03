import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { Connection } from "../../database/Connection";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getByCpf(cpf: string): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

  async count(): Promise<number> {
    const [count] = await this.connection.query(
      'SELECT COUNT(*) as count FROM "order"'
    );

    return parseInt(count.count, 10);
  }
}
