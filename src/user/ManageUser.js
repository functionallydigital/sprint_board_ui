import React, { Component } from 'react';
import UserForm from './UserForm';
import { updateUser } from '../api/UserRequestHandler';

class ManageUser extends Component {
  updateDetails(user) {
    const history = this.props.history;
    const setUser = this.props.setUser;
    const session = this.props.session;
    updateUser(session, {first_name: user.first_name, last_name: user.last_name, email: user.email}, user.id)
      .then((response) => {
        if (!response.error) {
          setUser(user, session);
          history.push('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const user = this.props.user;
    return (
      <div className='manage-user'>
        <h2 className='heading'>
          Manage your account details
        </h2>

        <div className='body-wrapper'>
          <UserForm showPasswordForm={false}
            user={user}
            buttonText='Update'
            submit={this.updateDetails.bind(this)} />
        </div>
      </div>
    )
  }
}

export default ManageUser;