export interface DecrementStockGateway {
  execute(orderItems: { idItem: number; quantity: number }[]): Promise<void>;
}
