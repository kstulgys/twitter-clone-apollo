import Tweet from '../models/tweet/tweet.model'
import User from '../models/user/user.model'

import faker from 'faker'

export default async () => {
  try {
    await Tweet.deleteMany()
    await User.deleteMany()

    await Array.from({ length: 5 }).forEach(async (_, i) => {
      const user = await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: `https://randomuser.me/api/portraits/med/men/${i}.jpg`
      })
      await Array.from({ length: 5 }).forEach(async () => {
        await Tweet.create({ text: faker.lorem.paragraphs(1), user: user._id })
      })
    })
  } catch (error) {
    throw error
  }
}
