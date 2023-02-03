import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { FreightCalculator } from "./FreightCalculator";
import { Item } from "./Item";
import { OrderCode } from "./OrderCode";
import { OrderItem } from "./OrderItem";

export class Order {
  cpf: Cpf;
  freight = 0;
  private orderItems: OrderItem[];
  private coupon?: Coupon;
  private code: OrderCode;

  constructor(
    cpf: string,
    readonly createdAt: Date = new Date(),
    readonly sequence: number = 1
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.code = new OrderCode(createdAt, sequence);
  }

  addItem(item: Item, quantity: number) {
    if (this.orderItems.some((orderItem) => orderItem.itemId === item.id)) {
      // TODO: add quantity
      throw new Error("Duplicated item");
    }
    this.orderItems.push(new OrderItem(item.id, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getTotal() {
    let total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal();
      return total;
    }, 0);
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.createdAt);
    }
    total += this.freight;
    return total;
  }

  getCode() {
    return this.code.getCode();
  }
}
