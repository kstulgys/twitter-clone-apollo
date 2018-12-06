import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
// import logo from './logo.svg'
import Navigation from './components/navigation'
import MoviesList from './components/movie'

export const ALL_MOVIES = gql`
  query infiniteScrollMovies($offset: Int) {
    infiniteScrollMovies(offset: $offset, limit: 16) {
      movies {
        image_url
        title
        id
      }
      hasMore
    }
  }
`

class App extends Component {
  // state = {
  //   offset: 16,
  // }

  fetchMoreData = (fetchMore, offset) => {
    // let offset = 0
    // offset += 16
    // console.log(offset)
    // this.setState(prev => ({ offset: prev.offset + 16 }))
    fetchMore({
      variables: {
        offset: offset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        return {
          ...fetchMoreResult,
          infiniteScrollMovies: {
            ...fetchMoreResult.infiniteScrollMovies,
            movies: [...prev.infiniteScrollMovies.movies, ...fetchMoreResult.infiniteScrollMovies.movies],
          },
        }
      },
    })
  }

  render() {
    return (
      <div className="flex flex-column">
        <Query query={ALL_MOVIES} notifyOnNetworkStatusChange={true} fetchPolicy="network-only">
          {({ data, loading, error, fetchMore }) => {
            if (error) return <h1>{error.message}</h1>

            window.onscroll = () => {
              const hasMore = data && data.infiniteScrollMovies && data.infiniteScrollMovies.hasMore
              const offset = data && data.infiniteScrollMovies && data.infiniteScrollMovies.after

              if (
                hasMore &&
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
              ) {
                console.log('YES!')
                this.fetchMoreData(fetchMore, offset)
              }
            }

            return (
              <div>
                {data &&
                  data.infiniteScrollMovies &&
                  data.infiniteScrollMovies.movies.map(m => (
                    <article key={m.id}>
                      <a
                        href="https://geo.itunes.apple.com/us/movie/primer/id536457427?at=1l3vqFJ&ct=1l3vqFJ&mt=6"
                        className="fl w-25 w-25-l link overflow-hidden">
                        <div
                          role="img"
                          aria-label="Primer movie"
                          className="grow aspect-ratio--4x6 "
                          style={{
                            background: `url(${m.image_url}) no-repeat center center`,
                            backgroundSize: 'cover',
                          }}
                        />
                      </a>
                    </article>
                  ))}
                <div>{loading && <h1 className="red text-center">Loading...</h1>}</div>
              </div>
            )
          }}
        </Query>

        <Navigation />
      </div>
    )
  }
}

export default App

// <MoviesList movies={movies} />
