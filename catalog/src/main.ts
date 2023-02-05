import { GetItem } from "./application/usecase/GetItem";
import { RestController } from "./infra/controllers/RestController";
import { PgPromiseAdapter } from "./infra/database/PgPromiseAdapter";
import { FastifyAdapter } from "./infra/http/FastifyAdapter";
import { ItemRepositoryDatabase } from "./infra/repositories/database/ItemRepositoryDatabase";

const connection = new PgPromiseAdapter(
  "ecommerce",
  "pOstgr3s@2023",
  5432,
  "localhost",
  "ecommerce"
);
const itemRepository = new ItemRepositoryDatabase(connection);
const getItem = new GetItem(itemRepository);
const httpServer = new FastifyAdapter();
new RestController(httpServer, getItem);
httpServer.listen(3003);
