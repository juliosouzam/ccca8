export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export interface HttpServer {
  listen(port: number): Promise<void>;
  on(method: HttpMethod, url: string, callback: Function): void;
}
