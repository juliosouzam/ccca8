import { Item } from "../../../domain/entities/Item";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";
import { Connection } from "../../database/Connection";

export class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  async getItem(idItem: number): Promise<Item> {
    const itemData = await this.connection.query(
      'SELECT * FROM "item" WHERE id = $1',
      [idItem]
    );
    return new Item(
      itemData.id,
      itemData.description,
      parseFloat(itemData.price)
    );
  }

  save(item: Item): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
