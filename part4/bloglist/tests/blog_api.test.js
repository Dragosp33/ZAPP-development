const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const user = {
  name: 'Valid User3',
  username: 'validuser3',
  password: 'validpassword',
  blogs: [],
  _id: '64bfd869b4e5a4287793b708',
}

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared.')
  const blogObjects = helper.initialBlogs
    .map( (blog) => new Blog(blog))
  const promiseArray = blogObjects.map( (blog) => blog.save())
  await Promise.all(promiseArray)
})

/*
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a blog has id property', async () => {
  const blogs = await helper.blogsInDb()
  blogs.forEach( (blog) => expect(blog.id).toBeDefined())
})


*/
describe('Post test with/without tokens:', () => {
  userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET,
    { expiresIn: 60*60 },
  )
  const newBlog = {
    title: 'new blog',
    author: 'Valid User3',
    url: 'no-url',
    likes: 1,
  }
  console.log('TOKEN IN TEST: ', token)

  test('a valid blog without a token cant be posted', async () => {
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.status).toEqual(401)
    expect(response.body.error).toEqual('Forbidden: jwt must be provided ')
  })

  test('a blog with likes undefined will get 0 likes', async () => {
    const newBlog1 = {
      title: 'no likes blog',
      author: 'Valid User3',
      url: 'no-url',
    }
    const response = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`).send(newBlog1)
    console.log('response :', response.headers)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.status).toEqual(201)
    expect(response.body.likes).toEqual(0)
  })

  test('a blog with no title or no url will respond 400', async () => {
    const noTitle = {
      author: 'Valid User3',
      url: 'no-url',
    }
    const response = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`).send(noTitle)
    console.log('response :', response.headers)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Blog should have a title and url')
  })

  test('a valid blog with valid token can be posted', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map( (n) => n.title)
    expect(contents).toContain(
      'new blog')
  }, 10000)
})
afterAll(async () => {
  await mongoose.connection.close()
})
