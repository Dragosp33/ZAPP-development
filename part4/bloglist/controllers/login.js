const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/users')
const Tokens = require('../models/token')
const middleware = require('../utils/middleware')
const userExtractor = middleware.requireAuth

loginRouter.post('/', async (request, response) => {
  console.log('????')
  const { username, password } = request.body

  const user = await User.findOne({ username })
  console.log(user)
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const accessToken = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 10,
  })
  // console.log(token)
  const refreshToken = jwt.sign(userForToken, process.env.REFRESH_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  })
  const oldRefreshToken = jwt.sign(userForToken, process.env.LOGIN_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  })

  const token = new Tokens({
    refresh_token: refreshToken,
    old_refresh_token: oldRefreshToken,
  })
  await token.save()

  response.cookie('access_token', accessToken, {
    httpOnly: true,
    maxAge: 60 * 10 * 1000, // 10minutes in milliseconds
  })

  response.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000 * 24 * 7, // 1 week
  })

  return response.status(200).json({ data: user })
})

loginRouter.post('/verify_token', userExtractor, async (req, res) => {
  console.log(' LOGS FROM VERIFY_TOKEN: ')
  /* const token = req.cookies.access_token
  console.log('token in require auth: ', token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  
  try {
    // Verify the JWT token here (use your secret key)
    const decoded = jwt.verify(token, process.env.SECRET)
    const tokenUser = await User.findById(decoded.id)
    // Store user information in the request object
    return res.status(200).json({ data: tokenUser })
    // User is authenticated, proceed to the next middleware/route handler
  } */
  try {
    const user = req.user
    return res.status(200).json({ data: user })
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
})

module.exports = loginRouter
