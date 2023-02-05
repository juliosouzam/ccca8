import axios from "axios";
import { GetItemGateway } from "../../application/gateway/GetItemGateway";
import { Dimension } from "../../domain/entities/Dimension";
import { Item } from "../../domain/entities/Item";

export class GetItemHttpGateway implements GetItemGateway {
  async getItem(idItem: number): Promise<Item> {
    const response = await axios.get(`http://localhost:3003/items/${idItem}`);
    const item = response.data;
    return new Item(
      item.idItem,
      item.description,
      item.price,
      new Dimension(item.width, item.height, item.length, item.weight)
    );
  }
}
