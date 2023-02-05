export class Coupon {
  constructor(
    readonly code: string,
    readonly percent: number,
    readonly expiredDate?: Date
  ) {}

  calculateDiscount(total: number, now: Date = new Date()) {
    if (this.isExpired(now)) {
      return 0;
    }

    return (total * this.percent) / 100;
  }

  isExpired(now: Date = new Date()) {
    return !!this.expiredDate && this.expiredDate.getTime() < now.getTime();
  }
}
