import React from 'react'
import { connect } from 'react-redux'

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
            <a href="">Logout</a>
          </li>
        )
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Emaily</a>

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
