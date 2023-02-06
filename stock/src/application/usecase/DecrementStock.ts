import { inspect } from "util";
import { StockEntry } from "../../domain/entities/StockEntry";
import { StockRepository } from "../../domain/repositories/StockRepository";

export class DecrementStock {
  constructor(readonly stockRepository: StockRepository) {}

  async execute({ order }: Input): Promise<void> {
    order.orderItems.forEach(async (item) => {
      console.log("DecrementStock.execute", inspect(item, false, 5, true));
      await this.stockRepository.save(
        new StockEntry(item.itemId, "out", item.quantity, new Date())
      );
    });
  }
}

type Input = {
  order: {
    orderItems: { itemId: number; quantity: number }[];
  };
};
