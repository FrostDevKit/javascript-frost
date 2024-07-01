const { Client } = require('pg')
const { Helper } = require('./helper')

if (process.env.NODE_ENV === 'test') {
  const { DB_URL } = process.env
  const { DB_NAME } = process.env
  const { DB_USER } = process.env
  const { DB_PASS } = process.env
  const { DB_PORT } = process.env

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '<PASSWORD>',
  port: 5432,
})

client.connect()

module.exports =  client = new Client {
    /**
     * The PostgreSQL database user to connect as.
     */
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '<PASSWORD>',
    port: 5432,
  }
