import React, { Component } from 'react';
import UserForm from './UserForm';
import { registerUser } from '../api/UserRequestHandler'

class RegisterUser extends Component {
  register(user) {
    const history = this.props.history;
    registerUser(user)
      .then((response) => {
        if (!response.error) {
          history.push('/login');
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    return (
      <div className='register-user'>
        <h2 className='heading'>
          Register for an account
        </h2>

        <div className='body-wrapper'>
          <UserForm showPasswordForm={true}
            buttonText='Register'
            submit={this.register.bind(this)} />
        </div>
      </div>
    )
  }
}

export default RegisterUser;