const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const User = require('../models/users')
const validUser = {
  name: 'Valid User',
  username: 'validuser',
  password: 'validpassword',
}

UserList = [{
  name: 'Valid User1',
  username: 'validuser1',
  password: 'validpassword',
},
{
  name: 'Valid User2',
  username: 'validuser2',
  password: 'validpassword',
},
{
  name: 'Valid User3',
  username: 'validuser3',
  password: 'validpassword',
},
]

beforeEach(async () => {
  await User.deleteMany({})
  console.log('cleared.')
  const userObjects = UserList
    .map( (user) => new User(user))
  const promiseArray = userObjects.map( (user) => user.save())
  await Promise.all(promiseArray)
})

test('account with no username or no password will respond 400', async () => {
  const invaliduser = {
    name: 'Invalid user',
  }
  const response = await api.post('/api/users').send(invaliduser)
  expect(response.headers['content-type']).toMatch(/application\/json/)
  expect(response.status).toEqual(400)
  expect(response.body.message)
    .toEqual('Insert username and password at least 3 chars long')
})

test('if username exists, respond 400', async () => {
  const invaliduser2 = {
    name: 'Valid User1',
    username: 'validuser1',
    password: 'validpassword',
  }
  const response = await api.post('/api/users').send(invaliduser2)
  expect(response.headers['content-type']).toMatch(/application\/json/)
  expect(response.status).toEqual(400)
  expect(response.body.message)
    .toEqual('Username validuser1 already exists.')
})

test('A valid user can be added', async () => {
  const response = await api.post('/api/users').send(validUser)
  expect(response.headers['content-type']).toMatch(/application\/json/)
  expect(response.status).toEqual(201)
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(UserList.length + 1)

  const usernames = usersAtEnd.map( (n) => n.username)
  expect(usernames).toContain(
    validUser.username)
})

afterAll(async () => {
  await mongoose.connection.close()
})
