import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import NavBar from './components/navbar'
import TweetCard from './components/card'

import debounce from 'lodash.debounce'
// import logo from './logo.svg'
import Navigation from './components/navigation'
import MoviesList from './components/movie'

const GET_TWEETS = gql`
  query getTweets {
    getTweets {
      text
      _id
      user {
        username
        avatar
      }
    }
  }
`

class App extends Component {
  // isBottom = (fetchMore, data) => {
  //   window.onscroll = () => {
  //     if (
  //       data &&
  //       data.infiniteScrollMovies &&
  //       data.infiniteScrollMovies.hasMore &&
  //       window.innerHeight + document.documentElement.scrollTop ===
  //         document.documentElement.offsetHeight
  //     ) {
  //       console.log('YES!')
  //       this.fetchMoreData(fetchMore, data)
  //     }
  //   }
  // }

  // fetchMoreData = (fetchMore, data) => {
  //   fetchMore({
  //     variables: {
  //       offset: data.infiniteScrollMovies.newOffset
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev

  //       return {
  //         ...fetchMoreResult,
  //         infiniteScrollMovies: {
  //           ...fetchMoreResult.infiniteScrollMovies,
  //           movies: [
  //             ...prev.infiniteScrollMovies.movies,
  //             ...fetchMoreResult.infiniteScrollMovies.movies
  //           ]
  //         }
  //       }
  //     }
  //   })
  // }

  render() {
    return (
      <Query
        query={GET_TWEETS}
        // notifyOnNetworkStatusChange={true}
        // fetchPolicy='network-only'
      >
        {({ data, loading, error, fetchMore }) => {
          if (error) return <h1>{error.message}</h1>
          if (loading) return <h1 className='red text-center'>Loading...</h1>

          return (
            <Fragment>
              <NavBar />
              <div className='flex justify-center'>
                <div className='dn-m w-20-l bg-warning'>
                  <h1 className='text-default'>Left Sidebar</h1>
                </div>
                <div className='flex items-center flex-column w-30-l w-90-m'>
                  {data &&
                    data.getTweets &&
                    data.getTweets.map(t => (
                      <TweetCard
                        key={t._id}
                        text={t.text}
                        avatar={t.user.avatar}
                        username={t.user.username}
                      />
                    ))}
                </div>
                <div className='dn-m w-20-l bg-warning'>
                  <h1 className='text-default'>Right Sidebar</h1>
                </div>
              </div>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}
// <Navigation />

export default App

// <MoviesList movies={movies} />
