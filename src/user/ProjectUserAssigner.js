import React, { Component } from 'react';
import { loadUserSelectorList } from '../api/UserRequestHandler';
import { addUserToProject } from '../api/ProjectRequestHandler';
import Select from 'react-select';

class ProjectUserAssigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {
        user: '',
        role: ''
      },
      users: [],
      roles: []
    }
  }

  componentWillMount() {
    loadUserSelectorList(this.props.session)
      .then((response) => {
        if (!response.error) {
          this.setState({users: response.users});
          this.setState({roles: response.roles});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleUserChange (selectedUser) {
    let selectedOption = this.state.selectedOption;
    selectedOption.user = selectedUser;
    this.setState({selectedOption: selectedOption });
  }

  handleRoleChange (selectedRole) {
    let selectedOption = this.state.selectedOption;
    selectedOption.role = selectedRole;
    this.setState({selectedOption: selectedOption });
  }

  assignUser() {
    let that = this;
    addUserToProject(this.props.session, this.props.projectId, this.state.selectedOption)
      .then((response) => {
        if (!response.error) {
          that.props.updateUserList(response)
          that.props.closeUserAssigner();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const userList = this.state.users;
    const rolesList = this.state.roles;
    return (
      <div className='user-assigner pop-up--cover'>
        <div className='col-sm-5 col-xs-10 pop-up--wrapper'>
          <div className='post-it user'>
            <h3>Add user to project</h3>

            <div className='row form-row'>
              <div className='col-sm-8'>
                <label>User:</label>
                <Select
                  name="user"
                  value={this.state.selectedOption.user.value}
                  onChange={this.handleUserChange.bind(this)}
                  options={userList}
                />
              </div>
            </div>

            <div className='row form-row'>
              <div className='col-sm-8'>
                <label>Role:</label>
                <Select
                  name="role"
                  value={this.state.selectedOption.role.value}
                  onChange={this.handleRoleChange.bind(this)}
                  options={rolesList}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-xs-12'>
                <div className='post-it button fitted clickable' onClick={this.assignUser.bind(this)}>
                  Assign
                </div>

                <div className='post-it button fitted clickable right' onClick={this.props.closeUserAssigner}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectUserAssigner;
