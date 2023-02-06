import { CalculateFreight } from "../../application/usecase/CalculateFreight";
import { HttpServer } from "../http/HttpServer";

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly calculateFreight: CalculateFreight
  ) {
    httpServer.register(
      "post",
      "/calculateFreight",
      async (query: any, params: any, body: any) => {
        const output = await calculateFreight.execute(body);
        return output;
      }
    );
  }
}
