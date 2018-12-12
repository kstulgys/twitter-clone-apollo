require('dotenv').config()

export const config = {
  port: 4000,
  jwt: 'helloworld',
  jwtExp: '100d',
  dbUrl: process.env.MONGO_DB_DEV,
}
