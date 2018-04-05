const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const keys = require('./config/keys')

require('./models/User')
require('./services/passport')

mongoose.connect(keys.MONGODB_URI)

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

const PORT = keys.port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
