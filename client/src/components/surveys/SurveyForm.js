import React from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

import SurveyField from './SurveyField'

const FIELDS = [
  { name: 'title', label: 'Survey Title' },
  { name: 'subject', label: 'Subject Line' },
  { name: 'body', label: 'Email Body' },
  { name: 'emails', label: 'Recipient List' }
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

  if (!values.title) {
    errors.title = 'You  must provide a title.'
  }

  return errors
}

export default reduxForm({
  form: 'surveyForm',
  validate
})(SurveyForm)
