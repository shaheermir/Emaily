import React from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

import validateEmails from '../../utils/validateEmails'
import SurveyField from './SurveyField'
import FIELDS from './formFields'

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
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
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

  errors.recipients = validateEmails(values.recipients || '')

  FIELDS.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError
    }
  })

  return errors
}

export default reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: false,
  validate
})(SurveyForm)
