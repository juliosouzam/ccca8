import { Order } from './Order';

export interface OrderRepository {
  save(order: Order): Promise<void>;
}
