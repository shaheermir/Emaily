import { combineReducers } from 'redux'
import { reducer as ReduxForm } from 'redux-form'

import AuthReducer from './AuthReducer'
import SurveysReducer from './SurveysReducer'

export default combineReducers({
  auth: AuthReducer,
  form: ReduxForm,
  surveys: SurveysReducer
})
