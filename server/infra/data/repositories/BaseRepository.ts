import { injectable } from 'inversify'
import connection from '../database/connection'
import { Knex } from 'knex'

@injectable()
export class BaseRepository {
  protected connection: Knex

  constructor() {
    this.connection = connection()
  }
}
