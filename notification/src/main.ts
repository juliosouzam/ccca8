import { NotifyCustomer } from "./application/usecase/NotifyCustomer";
import { QueueController } from "./infra/controllers/QueueController";
import { RabbitMQAdapter } from "./infra/queue/RabbitMQAdapter";

(async () => {
  const notifyCustomer = new NotifyCustomer();
  const queue = new RabbitMQAdapter();
  await queue.connect();
  new QueueController(queue, notifyCustomer);
})();
