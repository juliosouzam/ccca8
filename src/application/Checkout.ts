import { Order } from "../domain/entities/Order";
import { ItemRepository } from "../domain/repositories/ItemRepository";
import { OrderRepository } from "../domain/repositories/OrderRepository";

export class Checkout {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const order = new Order(input.cpf);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    await this.orderRepository.save(order);
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
};
