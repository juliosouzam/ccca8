import { Coordenate } from "../../../domain/entities/Coordenate";
import { Zipcode } from "../../../domain/entities/Zipcode";
import { ZipcodeRepository } from "../../../domain/repositories/ZipcodeRepository";
import { Connection } from "../../database/Connection";

export class ZipcodeRepositoryDatabase implements ZipcodeRepository {
  constructor(private readonly connection: Connection) {}

  async save(zipcode: Zipcode): Promise<void> {
    await this.connection.query(
      'insert into "zipcode" (code, street, neiboordhood, lat, log) values ($1, $2, $3, $4, $5)',
      [
        zipcode.code,
        zipcode.street,
        zipcode.neiboordhood,
        zipcode.coordinate.latitude,
        zipcode.coordinate.longitude,
      ]
    );
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
