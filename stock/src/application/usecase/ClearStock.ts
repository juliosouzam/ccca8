import { StockRepository } from "../../domain/repositories/StockRepository";

export class ClearStock {
  constructor(readonly stockRepository: StockRepository) {}

  async execute(): Promise<void> {
    await this.stockRepository.clear();
  }
}
