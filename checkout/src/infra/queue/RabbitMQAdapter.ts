import amqplib from "amqplib";

import { Queue } from "./Queue";

export class RabbitMQAdapter implements Queue {
  private connection!: amqplib.Connection;

  async connect(): Promise<void> {
    this.connection = await amqplib.connect("amqp://user:password@localhost");
  }

  async close(): Promise<void> {
    await this.connection.close();
  }

  async on(
    exchangeName: string,
    queueName: string,
    callback: Function
  ): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, "");
    await channel.consume(queueName, async (msg) => {
      if (msg) {
        await callback(JSON.parse(msg.content.toString()));
        channel.ack(msg);
      }
    });
    await channel.close();
  }

  async publish(exchangeName: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertExchange(exchangeName, "direct", { durable: true });
    channel.publish(exchangeName, "", Buffer.from(JSON.stringify(data)));
    await channel.close();
  }
}
