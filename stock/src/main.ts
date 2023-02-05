import { ClearStock } from "./application/usecase/ClearStock";
import { DecrementStock } from "./application/usecase/DecrementStock";
import { GetStock } from "./application/usecase/GetStock";
import { Controller } from "./infra/controllers/Controller";
import { PgPromiseAdapter } from "./infra/database/PgPromiseAdapter";
import { FastifyAdapter } from "./infra/http/FastifyAdapter";
import { StockRepositoryDatabase } from "./infra/repositories/database/StockRepositoryDatabase";
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
new Controller(httpServer, decrementStock, getStock, clearStock);
httpServer.listen(3004);
