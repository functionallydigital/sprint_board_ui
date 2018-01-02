import React, { Component } from 'react';

class Navbar extends Component {
  logOut() {
    this.props.setUser(null, null)
  }

  loggedInNav() {
    const user = this.props.user;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Sprintboard</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href='/'>Projects</a></li>
            </ul>
            
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown clickable">
                <a className="dropdown-toggle" data-toggle="dropdown">{user.first_name} {user.last_name}
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href='/user/manage-account'>Mannage Account</a></li>
                  <li><a href='user/change-password'>Change Password</a></li>
                  <li><a onClick={this.logOut.bind(this)}>Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }

  loggedOutNav() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Sprintboard</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
            </ul>
            
            <ul className="nav navbar-nav navbar-right">
              <li><a href='/register'>Register</a></li>
              <li><a href='/login'>Sign in</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }

  render() {
    const user = this.props.user;
    if (user) {
      return this.loggedInNav();
    } else {
      return this.loggedOutNav();
    }
  }
}

export default Navbar;