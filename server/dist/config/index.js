'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config;
    break;
  case 'prod':
  case 'production':
    envConfig = require('./prod').config;
    break;
}

exports.default = envConfig;

/// base
// const baseConfig = {
//   env,
//   isDev: env === "development",
//   isProd: env === "production",
//   isTest: env === "testing"
// };