export class Dimension {
  constructor(
    readonly width: number,
    readonly height: number,
    readonly length: number,
    readonly weight: number
  ) {
    if (!width || !height || !length || !weight)
      throw new Error("Invalid dimension");
    if (width <= 0 || height <= 0 || length <= 0 || weight <= 0)
      throw new Error("Invalid dimension");
  }

  getVolume(): number {
    return (this.width / 100) * (this.height / 100) * (this.length / 100);
  }

  getDensity(): number {
    return this.weight / this.getVolume();
  }
}
