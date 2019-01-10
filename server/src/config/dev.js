require('dotenv').config()

export const config = {
  port: 4000,
  jwt: 'helloworld',
  jwtExp: '100d',
  dbUrl:
    'mongodb://twitter:twitter123@ds139934.mlab.com:39934/twitter-clone-apollo'
}
