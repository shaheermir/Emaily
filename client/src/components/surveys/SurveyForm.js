import React from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import validateEmails from '../../utils/validateEmails'

import SurveyField from './SurveyField'

const FIELDS = [
  { name: 'title', label: 'Survey Title', noValueError: 'You must provide a title.' },
  { name: 'subject', label: 'Subject Line', noValueError: 'You must provide a subject.' },
  { name: 'body', label: 'Email Body', noValueError: 'You must provide a body.' },
  {
    name: 'emails',
    label: 'Recipient List',
    noValueError: 'You must provide a list of recipients.'
  }
]

class SurveyForm extends React.Component {
  renderFields = () => {
    return FIELDS.map(field => {
      return (
        <Field
          component={SurveyField}
          type="text"
          name={field.name}
          label={field.label}
          key={field.name}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}

          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>

          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}

  errors.emails = validateEmails(values.emails || '')

  FIELDS.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError
    }
  })

  return errors
}

export default reduxForm({
  form: 'surveyForm',
  validate
})(SurveyForm)
