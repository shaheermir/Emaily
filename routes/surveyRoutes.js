const { URL } = require('url')
const { Path } = require('path-parser')
const mongoose = require('mongoose')
const _ = require('lodash')

const Mailer = require('../services/Mailer')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyID/:choice')

    const events = _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname)

        if (match) {
          return { email, surveyID: match.surveyID, choice: match.choice }
        }
      })
      .compact()
      .uniqBy('email', 'surveyID')
      .value()

    res.send({})
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })

    try {
      const mailer = new Mailer(survey, surveyTemplate(survey))
      await mailer.send()
      await survey.save()
      req.user.credits -= 1
      const user = await req.user.save()

      res.send(user)
    } catch (err) {
      res.send(422).send(err)
    }
  })
}
