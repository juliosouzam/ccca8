import { StockCalculator } from "../../domain/entities/StockCalculator";
import { StockEntry } from "../../domain/entities/StockEntry";
import { StockRepository } from "../../domain/repositories/StockRepository";

export class DecrementStock {
  constructor(readonly stockRepository: StockRepository) {}

  async execute(input: Input[]): Promise<void> {
    input.forEach(async (item) => {
      await this.stockRepository.save(
        new StockEntry(item.idItem, "out", item.quantity, new Date())
      );
    });
  }
}

type Input = {
  idItem: number;
  quantity: number;
};
