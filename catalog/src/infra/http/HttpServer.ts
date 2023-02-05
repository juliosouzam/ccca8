export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export interface HttpServer {
  listen(port: number): Promise<void>;
  register(method: HttpMethod, url: string, callback: Function): void;
}
