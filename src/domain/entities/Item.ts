import { Dimension } from "./Dimension";

export class Item {
  constructor(
    readonly id: number,
    readonly decription: string,
    readonly price: number,
    readonly dimension?: Dimension
  ) {}

  getVolume() {
    if (!this.dimension) return 0;
    return this.dimension.getVolume();
  }

  getDensity() {
    if (!this.dimension) return 0;
    return this.dimension.getDensity();
  }
}
