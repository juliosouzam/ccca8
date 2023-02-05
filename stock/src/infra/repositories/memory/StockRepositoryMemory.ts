import { StockEntry } from "../../../domain/entities/StockEntry";
import { StockRepository } from "../../../domain/repositories/StockRepository";

export class StockRepositoryMemory implements StockRepository {
  private stockEntries: StockEntry[];
  constructor() {
    this.stockEntries = [];
  }

  async getStockEntries(itemId: number): Promise<StockEntry[]> {
    return this.stockEntries.filter(
      (stockEntry) => stockEntry.itemId === itemId
    );
  }

  async save(stockEntry: StockEntry): Promise<void> {
    this.stockEntries.push(stockEntry);
  }

  async clear(): Promise<void> {
    this.stockEntries = [];
  }
}
