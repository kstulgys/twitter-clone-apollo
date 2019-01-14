import React, { useState } from 'react'
import { Mutation, ApolloConsumer, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const GET_ME = gql`
  query me {
    me {
      username
      email
    }
  }
`
// function useUserData({ client }) {
// const { me } = client.readQuery({
//   query: gql`
//     query me {
//       me {
//         username
//         email
//       }
//     }
//   `
// })
//   return client
// }

// export default withApollo(useUserData)

// This function takes a component...
function withUserData(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    // componentDidMount() {
    //   // ... that takes care of the subscription...
    //   DataSource.addChangeListener(this.handleChange);
    // }

    // componentWillUnmount() {
    //   DataSource.removeChangeListener(this.handleChange);
    // }

    // handleChange() {
    //   this.setState({
    //     data: selectData(DataSource, this.props)
    //   });
    // }

    render() {
      const { me } = this.props.client.readQuery({
        query: gql`
          query me {
            me {
              username
              email
            }
          }
        `
      })
      console.log(me)
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent userData={'me || null'} {...this.props} />
    }
  }
}

export default withApollo(withUserData)
