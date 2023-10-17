const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
  const Users = await User.find({}).populate('blogs')
  // console.log(Users)
  response.json(Users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  console.log(username, name, password)
  // const Users = await User.find({ username: { username } })
  const query = User.where({ username: username })
  const foundUser = await query.findOne()
  console.log(!foundUser)
  if (!username || !password || password.length < 3 || username.length < 3) {
    response.status(400).send({
      message: 'Insert username and password at least 3 chars long',
    })
  } else if (foundUser) {
    response.status(400).send({
      message: `Username ${username} already exists.`,
    })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })
    console.log('User la final dupa toate ifurile: ', user)
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    link: 1,
  })
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter
