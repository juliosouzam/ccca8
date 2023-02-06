import { ClearStock } from "../../application/usecase/ClearStock";
import { DecrementStock } from "../../application/usecase/DecrementStock";
import { GetStock } from "../../application/usecase/GetStock";
import { HttpServer } from "../http/HttpServer";

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly decrementStock: DecrementStock,
    readonly getStock: GetStock,
    readonly clearStock: ClearStock
  ) {
    httpServer.register(
      "post",
      "/decrementStock",
      async (_query: any, _params: any, body: any) => {
        await decrementStock.execute(body);
      }
    );
    httpServer.register(
      "get",
      "/stocks/:idItem/total",
      async (_query: any, params: any, _body: any) => {
        const output = await getStock.execute(params.idItem);
        return output;
      }
    );
    httpServer.register(
      "delete",
      "/clearStocks",
      async (_query: any, _params: any, _body: any) => {
        await clearStock.execute();
      }
    );
  }
}
