import pgp, { IDatabase } from "pg-promise";

import { Connection } from "./Connection";

export class PgPromiseAdapter implements Connection {
  private pgp: IDatabase<any>;
  constructor(
    private username: string,
    private password: string,
    private port: number,
    private host: string,
    private database: string
  ) {
    this.pgp = pgp()(
      `postgres://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`
    );
  }

  async query<T>(statment: string, params: unknown[] | undefined): Promise<T> {
    return this.pgp.query(statment, params) as T;
  }

  async disconnect(): Promise<void> {
    this.pgp.$pool.end();
  }
}
