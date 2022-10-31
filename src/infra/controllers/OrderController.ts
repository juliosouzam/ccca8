import { Checkout } from "../../application/Checkout";
import { GetOrdersByCpf } from "../../application/GetOrdersByCpf";
import { Preview } from "../../application/Preview";
import { HttpServer } from "../http/HttpServer";

export class OrderController {
  constructor(
    readonly httpServer: HttpServer,
    readonly preview: Preview,
    readonly checkout: Checkout,
    readonly getOrdersByCpf: GetOrdersByCpf
  ) {
    httpServer.on(
      "post",
      "/preview",
      async (query: any, params: any, body: any) => {
        const total = await preview.execute(body);
        console.log(total);
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
      "get",
      "/orders",
      async (query: any, params: any, body: any) => {
        const orders = await getOrdersByCpf.execute(query as { cpf: string });
        return orders;
      }
    );
  }
}
