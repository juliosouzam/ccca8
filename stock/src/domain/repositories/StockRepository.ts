import { StockEntry } from "../entities/StockEntry";

export interface StockRepository {
  getStockEntries(itemId: number): Promise<StockEntry[]>;
  save(stockEntry: StockEntry): Promise<void>;
  clear(): Promise<void>;
}
