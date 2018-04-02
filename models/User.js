const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleID: String
})

mongoose.model('users', UserSchema)
