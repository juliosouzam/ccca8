import { ClearStock } from "./application/usecase/ClearStock";
import { DecrementStock } from "./application/usecase/DecrementStock";
import { GetStock } from "./application/usecase/GetStock";
import { QueueController } from "./infra/controllers/QueueController";
import { RestController } from "./infra/controllers/RestController";
import { PgPromiseAdapter } from "./infra/database/PgPromiseAdapter";
import { FastifyAdapter } from "./infra/http/FastifyAdapter";
import { RabbitMQAdapter } from "./infra/queue/RabbitMQAdapter";
import { StockRepositoryDatabase } from "./infra/repositories/database/StockRepositoryDatabase";

(async () => {
  const connection = new PgPromiseAdapter(
    "ecommerce",
    "pOstgr3s@2023",
    5432,
    "localhost",
    "ecommerce"
  );
  const httpServer = new FastifyAdapter();
  const stockRepository = new StockRepositoryDatabase(connection);
  const decrementStock = new DecrementStock(stockRepository);
  const getStock = new GetStock(stockRepository);
  const clearStock = new ClearStock(stockRepository);
  new RestController(httpServer, decrementStock, getStock, clearStock);
  const queue = new RabbitMQAdapter();
  await queue.connect();
  new QueueController(queue, decrementStock);
  httpServer.listen(3004);
})();
