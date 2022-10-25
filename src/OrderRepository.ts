import { Order } from "./domain/Order";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  getByCpf(cpf: string): Promise<Order[]>;
}
