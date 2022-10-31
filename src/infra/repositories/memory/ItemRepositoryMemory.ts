import { Item } from "../../../domain/entities/Item";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";

export class ItemRepositoryMemory implements ItemRepository {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  async getItem(idItem: number): Promise<Item> {
    const item = this.items.find((item) => item.id === idItem);
    if (!item) throw new Error("Item não encontrado");
    return item;
  }

  async save(item: Item): Promise<void> {
    this.items.push(item);
  }
}
