import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import * as actions from '../actions'
import Header from './Header'

const Landing = () => <h2>Landing</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>ServeyNew</h2>

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route path="/" component={Landing} exact />
          <Route path="/surveys" component={Dashboard} exact />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App)
