import { StockEntry } from "../../../domain/entities/StockEntry";
import { StockRepository } from "../../../domain/repositories/StockRepository";
import { Connection } from "../../database/Connection";

export class StockRepositoryDatabase implements StockRepository {
  constructor(private readonly connection: Connection) {}

  async getStockEntries(itemId: number): Promise<StockEntry[]> {
    const stockEntriesData = await this.connection.query(
      'SELECT * FROM "stock_entry" WHERE "id_item" = $1',
      [itemId]
    );
    const stockEntries: StockEntry[] = [];
    for (const stockEntryData of stockEntriesData) {
      stockEntries.push(
        new StockEntry(
          stockEntryData.id_item,
          stockEntryData.operation,
          stockEntryData.quantity,
          new Date(stockEntryData.date)
        )
      );
    }
    return stockEntries;
  }

  async save(stockEntry: StockEntry): Promise<void> {
    await this.connection.query(
      'INSERT INTO "stock_entry" ("id_item", "operation", "quantity", "date") VALUES ($1, $2, $3, $4)',
      [
        stockEntry.itemId,
        stockEntry.operation,
        stockEntry.quantity,
        stockEntry.date,
      ]
    );
  }

  async clear(): Promise<void> {
    await this.connection.query('DELETE FROM "stock_entry"');
  }
}
