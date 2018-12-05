module.exports.paginateResults = (allMovies, offset, limit) => {
  let movies

  if (offset === 0) {
    movies = allMovies.slice(0, limit)
  } else {
    movies = allMovies.slice(offset, limit + offset)
  }
  const hasMore = allMovies.length > limit + offset
  return {
    movies,
    hasMore,
  }
}
