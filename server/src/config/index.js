require('dotenv').config()
import { merge } from 'lodash'
const env = process.env.NODE_ENV || 'development'

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config
    break
  case 'prod':
  case 'production':
    envConfig = require('./prod').config
    break
}

export default envConfig

/// base
// const baseConfig = {
//   env,
//   isDev: env === "development",
//   isProd: env === "production",
//   isTest: env === "testing"
// };
