import { CalculateFreight } from "./application/usecase/CalculateFreight";
import { Controller } from "./infra/controllers/Controller";
import { PgPromiseAdapter } from "./infra/database/PgPromiseAdapter";
import { FastifyAdapter } from "./infra/http/FastifyAdapter";
import { ZipcodeRepositoryDatabase } from "./infra/repositories/database/ZipcodeRepositoryDatabase";
const connection = new PgPromiseAdapter(
  "ecommerce",
  "pOstgr3s@2023",
  5432,
  "localhost",
  "ecommerce"
);
const zipcodeRepository = new ZipcodeRepositoryDatabase(connection);
const calculateFreight = new CalculateFreight(zipcodeRepository);
const httpServer = new FastifyAdapter();
new Controller(httpServer, calculateFreight);
httpServer.listen(3001);
