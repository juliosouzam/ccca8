import { Checkout } from "../../application/usecase/Checkout";
import { GetOrdersByCpf } from "../../application/usecase/GetOrdersByCpf";
import { Preview } from "../../application/usecase/Preview";
import { SimulateFreight } from "../../application/usecase/SimulateFreight";
import { HttpServer } from "../http/HttpServer";

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly preview: Preview,
    readonly checkout: Checkout,
    readonly getOrdersByCpf: GetOrdersByCpf,
    readonly simulateFreight: SimulateFreight
  ) {
    httpServer.register(
      "post",
      "/preview",
      async (_query: any, _params: any, body: any) => {
        const total = await preview.execute(body);
        return { total };
      }
    );
    httpServer.register(
      "post",
      "/checkout",
      async (_query: any, _params: any, body: any) => {
        await checkout.execute(body);
      }
    );
    httpServer.register(
      "post",
      "/simulateFreight",
      async (_query: any, _params: any, body: any) => {
        const output = await simulateFreight.execute(body);
        return output;
      }
    );
    httpServer.register(
      "get",
      "/orders",
      async (query: any, _params: any, _body: any) => {
        const orders = await getOrdersByCpf.execute(query as { cpf: string });
        return orders;
      }
    );
  }
}
