const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const middleware = require('../utils/middleware')
const userExtractor = middleware.requireAuth
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { fromEnv } = require('@aws-sdk/credential-providers')

const storage = multer.memoryStorage()
console.log(storage)
const upload = multer({ storage: storage })

const s3Client = new S3Client({
  region: process.env.AWS_REGION, // Read from environment variable
  credentials: fromEnv(), // Load AWS access keys from environment variables
  endpoint: 'https://s3.eu-west-3.amazonaws.com',
})

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

usersRouter.get('/:id', userExtractor, async (request, response) => {
  let editable = false
  const user = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    link: 1,
  })
  if (user) {
    // console.log(request.user)
    const k = request.user
    const p = k._id
    /* console.log(
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   XXX XXX  XXXX',
      p.toString()
    )*/
    if (p.toString() === user._id.toString()) {
      editable = true
    }
    response.json({ user, editable })
  } else {
    response.status(404).end()
  }
})

usersRouter.put(
  '/:id/edit',
  upload.array('profilepic', 1),
  userExtractor,
  async (request, response) => {
    console.log('??????????????????????????????')
    reqUser = request.user
    const user = await User.findById(request.params.id)
    if (user._id.toString() !== reqUser._id.toString()) {
      return response.status(401).json({ message: 'Not the correct user' })
    }

    const file = request.files[0]
    // const k = request.body
    console.log('FILES : ', file)

    const randomString = uuidv4()
    const key = 'BAGPL' + randomString + Date.now() + '.jpg'
    const params = {
      Bucket: 'photobucket333',
      Key: key,
      Body: file.buffer,
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command)

    const s3ObjectUrl = `https://photobucket333.s3.eu-west-3.amazonaws.com/${key}`

    user.profilePicUrl = s3ObjectUrl
    const savedUser = await user.save()
    console.log(savedUser)
    response.status(201).json({ savedUser })
  }
)

/*
usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})*/

module.exports = usersRouter
