export class Coupon {
  constructor(readonly code: string, readonly percent: number) {}

  calculateDiscount(total: number) {
    return (total * this.percent) / 100;
  }
}
