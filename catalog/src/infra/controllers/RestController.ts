import { GetItem } from "../../application/usecase/GetItem";
import { HttpServer } from "../http/HttpServer";

export class RestController {
  constructor(readonly httpServer: HttpServer, readonly getItem: GetItem) {
    httpServer.register(
      "get",
      "/items/:idItem",
      async (_query: any, params: any, _body: any) => {
        const item = await getItem.execute({ idItem: params.idItem });
        return item;
      }
    );
  }
}
