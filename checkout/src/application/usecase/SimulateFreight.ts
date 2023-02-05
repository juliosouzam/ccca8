import { DistanceCalculator } from "../../domain/entities/DistanceCalculator";
import { FreightCalculator } from "../../domain/entities/FreightCalculator";
import { ItemRepository } from "../../domain/repositories/ItemRepository";
import { ZipcodeRepository } from "../../domain/repositories/ZipcodeRepository";

export class SimulateFreight {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly zipcodeRepository: ZipcodeRepository
  ) {}

  async execute(input: Input): Promise<number> {
    let freight = 0;
    let distance;
    if (input.from && input.to) {
      const from = await this.zipcodeRepository.getByCode(input.from);
      const to = await this.zipcodeRepository.getByCode(input.to);
      distance = DistanceCalculator.calculate(from.coordinate, to.coordinate);
    }
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      freight +=
        FreightCalculator.calculate(item, distance) * orderItem.quantity;
    }
    return freight;
  }
}

type Input = {
  orderItems: { idItem: number; quantity: number }[];
  from?: string;
  to?: string;
};
