import React, { Component } from 'react';
import { logUserIn } from '../api/UserRequestHandler';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      }
    };
  }

  componentWillMount() {
    const history = this.props.history;
    if (this.props.user) {
      history.push('/');
    }
  }

  handleChange(event) {
    let field = event.target;
    let fieldName = field.name;
    const user = this.state.user
    user[fieldName] = field.value;
    this.setState({user: user})
  }

  logIn() {
    const history = this.props.history;
    logUserIn(this.state.user)
      .then((response) => {
        if (!response.error) {
          this.props.setUser(response.user, response.session);
          history.push('/');
        }
      })
      .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className='login-page'>
        <h1 className='heading'>
          Please login to use the sprint board.
        </h1>

        <div className='row'>
          <div className='col-sm-6 col-sm-offset-2  login-form post-it meta'>
            <div className='row form-row'>
              <div className='col-sm-6'>
                <label>
                  Email Address
                </label>
              </div>

              <div className='col-sm-6'>
                <input type='text' value={this.state.user.email}
                     name='email' onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className='row form-row'>
              <div className='col-sm-6'>
                <label>
                  Password
                </label>
              </div>

              <div className='col-sm-6'>
                <input type='password' value={this.state.user.password}
                     name='password' onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className='row form-row'>
              <div className='col-sm-6 col-sm-offset-6'>
                <div className='post-it button clickable right' onClick={this.logIn.bind(this)}>
                  Login
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage;
