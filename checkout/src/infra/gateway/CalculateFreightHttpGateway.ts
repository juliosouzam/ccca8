import axios from "axios";
import { CalculateFreightGateway } from "../../application/gateway/CalculateFreightGateway";

export class CalculateFreightHttpGateway implements CalculateFreightGateway {
  async calculate(
    orderItems: { volume: number; density: number; quantity: number }[],
    from: string,
    to: string
  ): Promise<number> {
    const response = await axios.post(
      "http://localhost:3001/calculateFreight",
      { orderItems, from, to }
    );
    const freight = response.data;
    return freight;
  }
}
