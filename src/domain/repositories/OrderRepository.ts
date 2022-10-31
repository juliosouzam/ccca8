import { Order } from "../entities/Order";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  getByCpf(cpf: string): Promise<Order[]>;
}
