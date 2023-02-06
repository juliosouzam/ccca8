import axios from "axios";
import { DecrementStockGateway } from "../../application/gateway/DecrementStockGateway";

export class DecrementStockHttpGateway implements DecrementStockGateway {
  async execute(
    orderItems: { idItem: number; quantity: number }[]
  ): Promise<void> {
    await axios.post("http://localhost:3004/decrementStock", orderItems);
  }
}
