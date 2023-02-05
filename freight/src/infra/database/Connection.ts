export interface Connection {
  disconnect(): Promise<void>;
  query<T = any>(query: string, params?: unknown[]): Promise<T>;
}
