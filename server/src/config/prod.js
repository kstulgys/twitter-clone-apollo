export const config = {
  port: process.env.PORT,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d',
    dbUrl: process.env.MONGO_DB,
  },
}
