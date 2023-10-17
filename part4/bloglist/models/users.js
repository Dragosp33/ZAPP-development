const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  verified: { type: Boolean, default: false },
  verifyURL: String,
  passwordHash: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.username = returnedObject.username.toString()
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User
