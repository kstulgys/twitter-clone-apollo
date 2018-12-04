module.exports.paginateResults = (allMovies, offset, limit) => {
  let movies
  // const skip = pageSize * (pageNum - 1)

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
