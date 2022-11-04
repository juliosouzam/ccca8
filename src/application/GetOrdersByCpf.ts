import { OrderRepository } from "../domain/repositories/OrderRepository";

export class GetOrdersByCpf {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<Output[]> {
    const output: Output[] = [];
    const orders = await this.orderRepository.getByCpf(input.cpf);
    for (const order of orders) {
      output.push({
        code: order.getCode(),
        total: order.getTotal(),
      });
    }
    return output;
  }
}

type Input = {
  cpf: string;
};

type Output = {
  code: string;
  total: number;
};
