import { Coordenate } from "./Coordenate";

export class Zipcode {
  constructor(
    readonly code: string,
    readonly street: string,
    readonly neiboordhood: string,
    readonly coordinate: Coordenate
  ) {}
}
