import express, { Application } from "express";
import { HttpMethod, HttpServer } from "./HttpServer";

export class ExpressAdapter implements HttpServer {
  private app: Application;
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: HttpMethod, url: string, callback: Function): void {
    this.app[method](url, async (request, response) => {
      const output = await callback(
        request.query,
        request.params,
        request.body
      );
      return response.json(output);
    });
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port);
  }
}
