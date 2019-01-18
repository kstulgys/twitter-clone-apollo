import Tweet from '../models/tweet/tweet.model'
import User from '../models/user/user.model'
import FavoriteTweet from '../models/tweet/favoriteTweet.model'

import faker from 'faker'

export default async () => {
  await Tweet.deleteMany()
  await User.deleteMany()
  await FavoriteTweet.deleteMany()

  await Array(10)
    .fill(null)
    .forEach(async i => {
      const user = await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: faker.internet.avatar()
      })
      await FavoriteTweet.create({ userId: user._id })
      await Array(10)
        .fill(null)
        .forEach(async () => {
          await Tweet.create({
            text: faker.lorem.paragraphs(1),
            user: user._id,
            favoriteCount: faker.random.number()
          })
        })
    })
}
