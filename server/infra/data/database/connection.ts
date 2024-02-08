import dotenv from 'dotenv'
import knex from 'knex'
dotenv.config()

const connection = () => {
  return knex({
    client: 'mysql2',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      database: process.env.DATABASE
    }
  })
}

export default connection
