import pgp from "pg-promise";

import { Connection } from "./Connection";

export class PgPromiseAdapter implements Connection {
  private pgp: any;
  constructor() {
    this.pgp = pgp()("postgres://postgres:postgres@localhost:5432/ecommerce");
  }

  async query<T>(statment: string, params: unknown[] | undefined): Promise<T> {
    return this.pgp.query(statment, params) as T;
  }

  async disconnect(): Promise<void> {
    this.pgp.$pool.end();
  }
}
