import React from 'react'
import Link from 'next/link'
import cookie from 'cookie'
import { gql, graphql, withApollo, compose } from 'react-apollo'
import withData from 'lib/with-data'
import checkLoggedIn from 'lib/check-logged-in'
import redirect from 'lib/redirect'

class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  signout = (event) => {
    console.log(event)
    event.preventDefault();
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    this.props.client.resetStore().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/signin')
    })
  }

  render () {

    function AuthActions(props) {
      if (props.loggedInUser) {
        return <a onClick={props.signout} href="/logout">Logout</a>
      } 
      else {
        return (
          <span>
            <Link href='/signin'><a>Signin</a></Link> |
            <Link href='/create-account'><a>Register</a></Link>
          </span>
        )
      }
    }

    return (
      <header>
        <nav>
          <Link href='/'><a>Home</a></Link> |
          <AuthActions 
            loggedInUser={this.props.loggedInUser}
            signout={this.signout} />
        </nav>
      </header>
    )
  }
};

export default compose(
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Header)
