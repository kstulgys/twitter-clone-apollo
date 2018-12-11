import mongoose from 'mongoose'
// import options from './config'

export const connect = url => {
  return mongoose.connect(
    url,
    { useNewUrlParser: true },
  )
}
