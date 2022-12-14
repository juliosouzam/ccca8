import { Checkout } from "../../application/Checkout";
import { GetOrdersByCpf } from "../../application/GetOrdersByCpf";
import { Preview } from "../../application/Preview";
import { SimulateFreight } from "../../application/SimulateFreight";
import { HttpServer } from "../http/HttpServer";

export class OrderController {
  constructor(
    readonly httpServer: HttpServer,
    readonly preview: Preview,
    readonly checkout: Checkout,
    readonly getOrdersByCpf: GetOrdersByCpf,
    readonly simulateFreight: SimulateFreight
  ) {
    httpServer.on(
      "post",
      "/preview",
      async (query: any, params: any, body: any) => {
        const total = await preview.execute(body);
        return { total };
      }
    );
    httpServer.on(
      "post",
      "/checkout",
      async (query: any, params: any, body: any) => {
        await checkout.execute(body);
      }
    );
    httpServer.on(
      "post",
      "/simulateFreight",
      async (query: any, params: any, body: any) => {
        const output = await simulateFreight.execute(body);
        return output;
      }
    );
    httpServer.on(
      "get",
      "/orders",
      async (query: any, params: any, body: any) => {
        const orders = await getOrdersByCpf.execute(query as { cpf: string });
        return orders;
      }
    );
  }
}
