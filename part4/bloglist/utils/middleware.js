const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const Tokens = require('../models/token')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: `Forbidden: ${error.message} ` })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  next(error)
}

/* No longer needed.
const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.cookies.access_token
  // console.log(authorization)
  // pt test maine 26/07:
  /* if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  request.token = authorization

  next()
}
*/

const requireAuth = async (req, res, next) => {
  let token = req.cookies.access_token
  console.log('token in require auth: ', token)
  const refresh = req.cookies.refresh_token
  console.log('refresh in require auth: ', refresh)
  if (!refresh) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!token) {
    console.log('no token here')
    const tokens = await checkToken(refresh)
    console.log('tokens returned: ', tokens)
    if (!tokens) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    token = tokens.access
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 60 * 10 * 1000, // 10minutes in milliseconds
    })
    res.cookie('refresh_token', tokens.refresh, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 * 1000, // 10minutes in milliseconds
    })
  }

  try {
    console.log('what happens in try?')
    // Verify the JWT token here (use your secret key)
    const decoded = jwt.verify(token, process.env.SECRET)
    console.log('token in try: ', token)
    // console.log(decoded, jwt.decode(token, process.env.SECRET))
    req.user = await User.findById(decoded.id)
    // Store user information in the request object
    next()
    // User is authenticated, proceed to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

const invalidateTokens = async (token) => {
  let k = token
  while (k) {
    console.log('invalidate token: ', k)
    k.valid = false
    await k.save()
    k = await Tokens.findOne({ old_refresh_token: k.refresh_token })
  }
}

const checkToken = async (refreshToken) => {
  // const refreshToken = req.cookies.refresh_token
  console.log('refresh token in check token: ', refreshToken)
  const found = await Tokens.findOne({ refresh_token: refreshToken })
  console.log('found in check token: ', found)
  if (!found) {
    // if it's not valid, return 401
    return null
  }

  const reused = await Tokens.findOne({ old_refresh_token: refreshToken })
  if (reused || found.valid !== true) {
    console.log('invalidate tokens: ')
    found.valid = false
    await found.save
    invalidateTokens(reused)
    return null
  }
  console.log('reused in checktoken: ', reused)

  const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
  const userForToken = {
    user: decodedRefresh.username,
    id: decodedRefresh.id,
  }

  const newRefresh = jwt.sign(userForToken, process.env.REFRESH_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  })
  const newAccess = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 10,
  })

  const dbToken = new Tokens({
    refresh_token: newRefresh,
    old_refresh_token: refreshToken,
  })
  const k = await dbToken.save()
  console.log('dbtoken.save: ', k)
  found.valid = false
  const k2 = await found.save()
  console.log('found.save: ', k2)
  return { access: newAccess, refresh: newRefresh }
  /*
  const check = await Tokens.findOne({ old_refresh_token: refreshToken })
  if (check) {
    console.log(check)
  }*/
}

/*
const userExtractor = async (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization')
  console.log('authorization header in userExtractor: ', authorization)
  // pt test maine 26/07:
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  if (jwt.verify(request.token, process.env.SECRET) === 'invalid signature') {
    console.log('???')
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('Decoded token in userExtractor', decodedToken)
  request.user = await User.findById(decodedToken.id)

  next()
}
*/
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  // tokenExtractor,
  // userExtractor,
  requireAuth,
}
