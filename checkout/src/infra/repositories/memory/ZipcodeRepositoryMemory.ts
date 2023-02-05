import { Zipcode } from "../../../domain/entities/Zipcode";
import { ZipcodeRepository } from "../../../domain/repositories/ZipcodeRepository";

export class ZipcodeRepositoryMemory implements ZipcodeRepository {
  private zipcodes: Zipcode[];

  constructor() {
    this.zipcodes = [];
  }

  async save(zipcode: Zipcode): Promise<void> {
    this.zipcodes.push(zipcode);
  }

  async getByCode(code: string): Promise<Zipcode> {
    const zipcode = this.zipcodes.find((zipcode) => zipcode.code === code);
    if (!zipcode) throw new Error("Zipcode not found");

    return zipcode;
  }
}
