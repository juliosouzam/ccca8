import { Coordenate } from "./Coordenate";

export class Zipcode {
  constructor(
    readonly code: string,
    readonly street: string,
    readonly neighborhood: string,
    readonly coordinate: Coordenate
  ) {}
}
