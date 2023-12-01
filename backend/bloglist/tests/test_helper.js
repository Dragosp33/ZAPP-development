const Blog = require('../models/blog')
const User = require('../models/users')

const initialBlogs = [
  {
    'title': 'simple blog',
    'author': 'valid user1',
    'url': 'no-link',
    'likes': 222,
    'user': {
      'name': 'Valid User1',
      'username': 'validuser1',
      '_id': '64bfd869b4e5a4287793b706',
    },
    '_id': '64bfe08f5e8a0b598a48d3ed',
  },
  {
    'title': '1st blog for user reference test',
    'author': 'Valid User3',
    'url': 'no-link',
    'likes': 100,
    'user': {
      'name': 'Valid User3',
      'username': 'validuser3',
      '_id': '64bfd869b4e5a4287793b708',
    },
    '_id': '64bfe0d6cb5370be503c1b07',
  },
  {
    'title': 'second test for login with token, using token extractor',
    'author': 'Valid User2',
    'url': 'no-link',
    'likes': 1234,
    'user': {
      'name': 'Valid User2',
      'username': 'validuser2',
      '_id': '64bfd869b4e5a4287793b707',
    },
    '_id': '64c0053a6d13f0c94969283b',
  },
]

/*
const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog.__id.toString()
}
*/
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}


module.exports = {
  initialBlogs, blogsInDb, usersInDb,
}
