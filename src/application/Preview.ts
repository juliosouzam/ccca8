import { Order } from '../domain/Order';
import { ItemRepository } from '../ItemRepository';

export class Preview {
  constructor(readonly itemRepository: ItemRepository) {}

  async execute(input: Input): Promise<number> {
    const order = new Order(input.cpf);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }

    return order.getTotal();
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
};
