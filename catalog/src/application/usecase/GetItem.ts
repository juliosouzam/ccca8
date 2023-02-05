import { ItemRepository } from "../../domain/repositories/ItemRepository";

export class GetItem {
  constructor(readonly itemRepository: ItemRepository) {}

  async execute(input: Input): Promise<Output> {
    const item = await this.itemRepository.getItem(input.idItem);

    return {
      idItem: item.id,
      description: item.description,
      price: item.price,
      volume: item.getVolume(),
      density: item.getDensity(),
      width: item.dimension?.width,
      height: item.dimension?.height,
      length: item.dimension?.length,
      weight: item.dimension?.weight,
    };
  }
}

type Input = {
  idItem: number;
};

type Output = {
  idItem: number;
  description: string;
  price: number;
  volume: number;
  density: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
};
