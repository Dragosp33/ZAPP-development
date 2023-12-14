/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const signupRouter = require('express').Router()
const User = require('../models/users')
const { v4: uuidv4 } = require('uuid')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

signupRouter.post('/', async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Username, mail and password are required' })
  }
  if (username.length < 4 || username.length > 20) {
    return res
      .status(400)
      .json({ message: 'username must be between 4 and 20 characters' })
  }
  if (password.length < 4) {
    return res
      .status(400)
      .json({ message: 'password must be at least 4 characters' })
  }
  const query = User.where({ username: username })
  const foundUser = await query.findOne()
  if (foundUser) {
    return res.status(400).json({
      message: 'user already taken, login if that is you',
    })
  }
  const query2 = User.where({ email: email })
  const found2 = await query2.findOne()
  if (found2) {
    return res
      .status(400)
      .json({ message: 'mail already used, try another one, or log in.' })
  }
  const randomUrl = uuidv4()
  const host = req.hostname
  const link = `${req.protocol}://${host}/signup/verify/${randomUrl}`
  const msg = {
    to: email,
    from: 'dragos.polifronie@s.unibuc.ro',
    templateId: 'd-52996d4197c64d0fbc4ddf74bd15261b',
    dynamicTemplateData: {
      username: username,
      verify_link: link,
    },
  }

  sgMail
    .send(msg)
    .then((response) => {
      console.log('Email sent successfully')
      // console.log(response)
    })
    .catch((error) => {
      console.error('Error sending email: ', error)
      return res.status(400).json({ message: 'invalid email address' })
    })
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({
    username: username,
    email: email,
    passwordHash: passwordHash,
    verified: false,
    verifyURL: randomUrl,
  })
  try {
    const userSaved = await newUser.save()
    return res.status(200).json({ data: username })
  } catch {
    res.status(400).json({ message: 'error saving the user' })
  }
})

signupRouter.get('/verify/:verificationCode', async (req, res) => {
  const host = req.hostname

  console.log('HOST::::::::::::::::::::::::::::::', host)
  const verificationCode = req.params.verificationCode
  console.log(verificationCode)

  // Find the user by verification code
  const user = await User.findOne({ verifyURL: verificationCode })
  console.log('SIGNUP VERIFY::::::::::::::::::')
  if (!user) {
    console.log('no user?')
    return res.status(404).json({ error: 'Invalid verification code' })
  }

  // Update the user's verified status
  user.verified = true
  await user.save()
  console.log(user)

  return res.status(200).json({ message: 'Account verified successfully' })
})

module.exports = signupRouter
