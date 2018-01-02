import React, { Component } from 'react';
import ManageUser from './ManageUser';
import { Switch, Route, Redirect } from 'react-router-dom';

class User extends Component {
  loadManageAccount(props) {
    return (
      <ManageUser user={this.props.user}
        session={this.props.session}
        setUser={this.props.setUser}
        {...props} />
    )
  }

  loadChangePassword(props) {
    return (
      <p>Change Password</p>
    )
  }

  render() {
    const user = this.props.user;
    const manageAccountUrl = `${this.props.match.url}/manage-account`;
    const changePasswordUrl = `${this.props.match.url}/change-password`;
    if (user) {
      return (
        <Switch>
          <Route path={manageAccountUrl}
            render={(props) => {return this.loadManageAccount(props)}
          }/>
          <Route path={changePasswordUrl}
            render={(props) => {return this.loadChangePassword(props)}
          }/>
        </Switch>
      )
    } else {
      return (
        <Redirect to='/login'/>
      )
    }
  }
}

export default User;