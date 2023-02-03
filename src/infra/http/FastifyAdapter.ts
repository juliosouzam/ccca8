import fastify, { FastifyInstance } from "fastify";
import { HttpMethod, HttpServer } from "./HttpServer";

export class FastifyAdapter implements HttpServer {
  private app: FastifyInstance;
  constructor() {
    this.app = fastify({ logger: true });
  }

  register(method: HttpMethod, url: string, callback: Function): void {
    this.app[method](url, async (request) => {
      const output = await callback(
        request.query,
        request.params,
        request.body
      );
      return output;
    });
  }

  async listen(port: number): Promise<void> {
    try {
      await this.app.listen({ port });
      this.app.log.info(`Server listening on ${port}`);
    } catch (err) {
      await this.app.close();
      this.app.log.error(err);
      process.exit(1);
    }
  }
}
