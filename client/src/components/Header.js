import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Payments from './Payments'

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return null
      case false:
        return <a href="/auth/google">Login With Google</a>
      default:
        return (
          <React.Fragment>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0 10px' }}>Credits: {this.props.auth.credits}</li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </React.Fragment>
        )
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Header)
