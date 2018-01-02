import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      showPasswordForm: false
    }
  }

  componentWillMount() {
    if (this.props.user) {
      this.setState({user: this.props.user});
    }
    this.setState({showPasswordForm: this.props.showPasswordForm});
  }

  handleChange(event) {
    let field = event.target;
    let fieldName = field.name;
    const user = this.state.user
    user[fieldName] = field.value;
    this.setState({user: user})
  }

  submit() {
    this.props.submit(this.state.user)
  }

  render() {
    return (
      <div className='user-form'>
        <div className='row'>
          <div className='col-sm-6 post-it-wrapper'>
            <div className='post-it user'>
              <div className='row form-row'>
                <div className='col-sm-6'>
                  <label>
                    First name
                  </label>
                </div>

                <div className='col-sm-6'>
                  <input type='text' value={this.state.user.first_name}
                       name='first_name' onChange={this.handleChange.bind(this)} />
                </div>
              </div>

              <div className='row form-row'>
                <div className='col-sm-6'>
                  <label>
                    Last name
                  </label>
                </div>

                <div className='col-sm-6'>
                  <input type='text' value={this.state.user.last_name}
                       name='last_name' onChange={this.handleChange.bind(this)} />
                </div>
              </div>

              <div className='row form-row'>
                <div className='col-sm-6'>
                  <label>
                    Email address
                  </label>
                </div>

                <div className='col-sm-6'>
                  <input type='text' value={this.state.user.email}
                       name='email' onChange={this.handleChange.bind(this)} />
                </div>
              </div>

              { !this.props.showPasswordForm && 
                <div className='row'>
                  <div className='col-xs-12'>
                    <button onClick={this.submit.bind(this)} className='post-it button clickable right'>{this.props.buttonText}</button>
                  </div>
                </div>
              }
            </div>
          </div>

          { this.props.showPasswordForm &&
            <div className='col-sm-6 post-it-wrapper'>
              <div className='post-it user'>
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
                  <div className='col-sm-6'>
                    <label>
                      Password confirmation
                    </label>
                  </div>

                  <div className='col-sm-6'>
                    <input type='password' value={this.state.user.password_confirmation}
                         name='password_confirmation' onChange={this.handleChange.bind(this)} />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-xs-12'>
                    <button onClick={this.submit.bind(this)} className='post-it button clickable right'>{this.props.buttonText}</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default UserForm;
