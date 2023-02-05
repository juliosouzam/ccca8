import { DistanceCalculator } from "../../domain/entities/DistanceCalculator";
import { FreightCalculator } from "../../domain/entities/FreightCalculator";
import { ZipcodeRepository } from "../../domain/repositories/ZipcodeRepository";

export class CalculateFreight {
  constructor(readonly zipcodeRepository: ZipcodeRepository) {}

  async execute(input: Input): Promise<number> {
    let freight = 0;
    let distance;
    if (input.from && input.to) {
      const from = await this.zipcodeRepository.getByCode(input.from);
      const to = await this.zipcodeRepository.getByCode(input.to);
      distance = DistanceCalculator.calculate(from.coordinate, to.coordinate);
    }
    for (const orderItem of input.orderItems) {
      freight +=
        FreightCalculator.calculate(
          orderItem.volume,
          orderItem.density,
          distance
        ) * orderItem.quantity;
    }
    return freight;
  }
}

type Input = {
  orderItems: { volume: number; density: number; quantity: number }[];
  from?: string;
  to?: string;
};
