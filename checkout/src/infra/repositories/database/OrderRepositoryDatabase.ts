import { Order } from "../../../domain/entities/Order";
import { OrderCoupon } from "../../../domain/entities/OrderCoupon";
import { OrderItem } from "../../../domain/entities/OrderItem";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { Connection } from "../../database/Connection";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      'insert into "orders" (code, cpf, issue_date, sequence, total, coupon_code, coupon_percentage, freight) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
      [
        order.getCode(),
        order.cpf.value,
        order.createdAt,
        order.sequence,
        order.getTotal(),
        order.coupon?.code,
        order.coupon?.percentage,
        order.freight,
      ]
    );
    for (const orderItem of order.orderItems) {
      await this.connection.query(
        'insert into "order_item" (id_item, id_order, price, quantity) values ($1, $2, $3, $4)',
        [
          orderItem.itemId,
          orderData.id_order,
          orderItem.price,
          orderItem.quantity,
        ]
      );
    }
  }

  async getByCpf(cpf: string): Promise<Order[]> {
    const ordersData = await this.connection.query(
      'SELECT * FROM "orders" WHERE cpf = $1',
      [cpf]
    );
    const orders: Order[] = [];
    for (const orderData of ordersData) {
      const order = new Order(
        orderData.cpf,
        orderData.issue_date,
        parseInt(orderData.sequence, 10)
      );
      const orderItemsData = await this.connection.query(
        `select * from "order_item" where id_order = $1`,
        [orderData.id_order]
      );
      for (const orderItemData of orderItemsData) {
        order.orderItems.push(
          new OrderItem(
            parseInt(orderItemData.id_item),
            parseFloat(orderItemData.price),
            parseInt(orderItemData.quantity, 10)
          )
        );
      }
      if (orderData.coupon_code) {
        order.coupon = new OrderCoupon(
          orderData.coupon_code,
          orderData.coupon_percentage
        );
      }
      order.freight = parseFloat(orderData.freight);
      orders.push(order);
    }
    return orders;
  }

  async count(): Promise<number> {
    const [count] = await this.connection.query<[{ count: number }]>(
      'SELECT COUNT(*)::integer as count FROM "orders"'
    );

    return count.count;
  }

  async clear(): Promise<void> {
    await this.connection.query('DELETE FROM "order_item"');
    await this.connection.query('DELETE FROM "orders"');
  }
}
