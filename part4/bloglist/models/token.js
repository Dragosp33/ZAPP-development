/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const tokenSchema = new mongoose.Schema({
  refresh_token: String,
  old_refresh_token: String,
  valid: { type: Boolean, default: true },
})

tokenSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Tokens', tokenSchema)
