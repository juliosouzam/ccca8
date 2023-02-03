import { Coordenate } from "../../../domain/entities/Coordenate";
import { Zipcode } from "../../../domain/entities/Zipcode";
import { ZipcodeRepository } from "../../../domain/repositories/ZipcodeRepository";
import { Connection } from "../../database/Connection";

export class ZipcodeRepositoryDatabase implements ZipcodeRepository {
  constructor(private readonly connection: Connection) {}

  async save(zipcode: Zipcode): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getByCode(code: string): Promise<Zipcode> {
    const [zipcodeData] = await this.connection.query(
      'SELECT code, street, neiboordhood, lat, log FROM "zipcode" WHERE code = $1',
      [code]
    );

    return new Zipcode(
      zipcodeData.code,
      zipcodeData.street,
      zipcodeData.neiboordhood,
      new Coordenate(zipcodeData.lat, zipcodeData.log)
    );
  }
}
