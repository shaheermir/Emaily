const mongoose = require('mongoose')

const SurveySchema = new mongoose.Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String]
})

mongoose.model('surveys', SurveySchema)
