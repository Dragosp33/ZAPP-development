/* eslint-disable require-jsdoc */
const config = require('./utils/config')
const path = require('path')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const notesRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const signupRouter = require('./controllers/signup')
const cookieParser = require('cookie-parser') // Import cookie-parser

// Add cookie-parser middleware
app.use(cookieParser())

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error(`error connecting to MongoDB:, ${error.message}, 
    ${config.MONGODB_URI}`)
  })

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())
app.use(middleware.requestLogger)

// app.use(middleware.requireAuth)

// app.use(middleware.tokenExtractor)

/*
// Define a route to serve the React application's HTML file
const { auth } = require('express-openid-connect')
const { requiresAuth } = require('express-openid-connect')

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3003',
  clientID: 'rZxWtUT9pvsw0fPs40A4gFOAqWmbPBK4',
  issuerBaseURL: 'https://dev-1zkcl8gybf25ic2i.eu.auth0.com',
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig))

// req.isAuthenticated is provided from the auth router
/*
Auth0 Login / Signup
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/profile', requiresAuth(), (req, res) => {
  console.log('user: ', JSON.stringify(req.oidc.user))
  res.send(JSON.stringify(req.oidc.user))
})
*/
app.use('/api/login', loginRouter)
app.use('/api/signup', signupRouter)

app.use('/api/users', usersRouter)

// req.isAuthenticated is provided from the auth router
app.use(middleware.requireAuth)
app.use('/api/blogs', notesRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app
