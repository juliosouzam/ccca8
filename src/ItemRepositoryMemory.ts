import { Item } from './domain/Item';
import { ItemRepository } from './ItemRepository';

export class ItemRepositoryMemory implements ItemRepository {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  async getItem(idItem: number): Promise<Item> {
    const item = this.items.find((item) => item.id === idItem);
    if (!item) throw new Error('Item não encontrado');
    return item;
  }

  async save(item: Item): Promise<void> {
    this.items.push(item);
  }
}
