import { Item } from "../../domain/entities/Item";

export interface GetItemGateway {
  getItem(idItem: number): Promise<Item>;
}
