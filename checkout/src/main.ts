import { Checkout } from "./application/usecase/Checkout";
import { GetOrdersByCpf } from "./application/usecase/GetOrdersByCpf";
import { Preview } from "./application/usecase/Preview";
import { SimulateFreight } from "./application/usecase/SimulateFreight";
import { RestController } from "./infra/controllers/RestController";
import { PgPromiseAdapter } from "./infra/database/PgPromiseAdapter";
import { MemoryRepositoryFactory } from "./infra/factory/MemoryRepositoryFactory";
import { CalculateFreightHttpGateway } from "./infra/gateway/CalculateFreightHttpGateway";
import { DecrementStockHttpGateway } from "./infra/gateway/DecrementStockHttpGateway";
import { GetItemHttpGateway } from "./infra/gateway/GetItemHttpGateway";
import { FastifyAdapter } from "./infra/http/FastifyAdapter";
import { RabbitMQAdapter } from "./infra/queue/RabbitMQAdapter";
import { CouponRepositoryDatabase } from "./infra/repositories/database/CouponRepositoryDatabase";
import { ItemRepositoryDatabase } from "./infra/repositories/database/ItemRepositoryDatabase";
import { OrderRepositoryDatabase } from "./infra/repositories/database/OrderRepositoryDatabase";
import { ZipcodeRepositoryDatabase } from "./infra/repositories/database/ZipcodeRepositoryDatabase";

(async () => {
  const connection = new PgPromiseAdapter(
    "ecommerce",
    "pOstgr3s@2023",
    5432,
    "localhost",
    "ecommerce"
  );
  const itemRepository = new ItemRepositoryDatabase(connection);
  const orderRepository = new OrderRepositoryDatabase(connection);
  const couponRepository = new CouponRepositoryDatabase(connection);
  const zipcodeRepository = new ZipcodeRepositoryDatabase(connection);
  const repositoryFactory = new MemoryRepositoryFactory();
  const calculateFreightGateway = new CalculateFreightHttpGateway();
  const getItemGateway = new GetItemHttpGateway();
  const preview = new Preview(
    couponRepository,
    getItemGateway,
    calculateFreightGateway
  );
  const decrementStockGateway = new DecrementStockHttpGateway();
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const checkout = new Checkout(
    repositoryFactory,
    getItemGateway,
    calculateFreightGateway,
    decrementStockGateway,
    queue
  );
  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
  const simulateFreight = new SimulateFreight(
    itemRepository,
    zipcodeRepository
  );
  const httpServer = new FastifyAdapter();
  new RestController(
    httpServer,
    preview,
    checkout,
    getOrdersByCpf,
    simulateFreight
  );
  httpServer.listen(3002);
})();
