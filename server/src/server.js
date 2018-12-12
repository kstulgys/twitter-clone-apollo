require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import { connect } from "./db";
import config from "./config";
import { authenticate } from "./utils/auth";
import userSchema from "./models/user/user.schema";
import userResolvers from "./models/user/user.resolvers";

// import typeDefs from './schema'
// import resolvers from './resolvers'
// import MovieAPI from './datasources/movie'
// import UserAPI from './datasources/user'
// const store = createStore()
// set up any dataSources our resolvers need
// const dataSources = () => ({
//   movieAPI: new MovieAPI(),
//   userAPI: new UserAPI(),
// })

export const start = async () => {
  // const rootSchema = `
  //   schema {
  //     query: Query
  //     mutation: Mutation
  //   }
  // `
  const rootSchema = gql`
    type Query {
      _: Boolean
    }
    type Mutation {
      _: Boolean
    }
    type Subscription {
      _: Boolean
    }
  `;
  const server = new ApolloServer({
    typeDefs: [rootSchema, userSchema],
    resolvers: userResolvers,
    // dataSources,
    async context({ req }) {
      const user = await authenticate(req);
      return { user };
    },
    introspection: true
  });

  await connect(config.dbUrl);
  const { url } = await server.listen({ port: config.port });

  console.log(`GQL server ready at ${url}`);
};
