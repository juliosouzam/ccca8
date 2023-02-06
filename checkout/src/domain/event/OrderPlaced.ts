import { Order } from "../entities/Order";
import { DomainEvent } from "./DomainEvent";

export class OrderPlaced implements DomainEvent {
  name = "OrderPlaced";
  constructor(readonly order: Order) {}
}
