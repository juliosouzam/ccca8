import { Dimension } from "../../../domain/entities/Dimension";
import { Item } from "../../../domain/entities/Item";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";
import { Connection } from "../../database/Connection";

export class ItemRepositoryDatabase implements ItemRepository {
  constructor(private readonly connection: Connection) {}

  async getItem(idItem: number): Promise<Item> {
    const [itemData] = await this.connection.query(
      'SELECT * FROM "item" WHERE id_item = $1',
      [idItem]
    );
    return new Item(
      itemData.id_item,
      itemData.description,
      parseFloat(itemData.price),
      new Dimension(
        itemData.width,
        itemData.height,
        itemData.length,
        itemData.weight
      )
    );
  }

  async save(item: Item): Promise<void> {
    await this.connection.query(
      'insert into "item" (description, price, width, height, length, weight) values ($1, $2, $3, $4, $5, $6)',
      [
        item.description,
        item.price,
        item.dimension?.width,
        item.dimension?.height,
        item.dimension?.length,
        item.dimension?.weight,
      ]
    );
  }
}
