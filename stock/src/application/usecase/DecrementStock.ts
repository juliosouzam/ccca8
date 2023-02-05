import { StockCalculator } from "../../domain/entities/StockCalculator";
import { StockEntry } from "../../domain/entities/StockEntry";
import { StockRepository } from "../../domain/repositories/StockRepository";

export class DecrementStock {
  constructor(readonly stockRepository: StockRepository) {}

  async execute(input: Input): Promise<void> {
    await this.stockRepository.save(
      new StockEntry(input.idItem, "out", input.quantity, new Date())
    );
  }
}

type Input = {
  idItem: number;
  quantity: number;
};
