import { DecrementStock } from "../../application/usecase/DecrementStock";
import { Queue } from "../queue/Queue";

export class QueueController {
  constructor(readonly queue: Queue, readonly decrementStock: DecrementStock) {
    queue.on(
      "orderPlaced",
      "orderPlaced.decrementStock",
      async (message: any) => {
        await decrementStock.execute(message);
      }
    );
  }
}
