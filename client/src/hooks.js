import React, { useState } from 'react'
import { Mutation, ApolloConsumer, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

// const GET_ME = gql`
//   query me {
//     me {
//       username
//       email
//     }
//   }
// `
function useUserData({ client }) {
  //   const { me } = client.readQuery({
  //     query: gql`
  //       query me {
  //         me {
  //           username
  //           email
  //         }
  //       }
  //     `
  //   })
  return client
}

export default withApollo(useUserData)
