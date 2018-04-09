import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return null
      case false:
        return <a href="/auth/google">Login With Google</a>
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
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
