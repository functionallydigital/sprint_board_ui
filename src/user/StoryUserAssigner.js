import React, { Component } from 'react';
import { loadProjectUsers } from '../api/ProjectRequestHandler';
import { updateAssignedUser } from '../api/StoryRequestHandler';
import Select from 'react-select';

class StoryUserAssigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {},
      selectedOption: '',
      projectUsers: []
    }
  }

  componentWillMount() {
    this.setState({story: this.props.story});
    if (this.props.story.user) {
      const user = this.props.story.user;
      this.setState({selectedOption: {value: user.id, label: user.name}});
    }
    loadProjectUsers(this.props.session, this.props.projectId)
      .then((response) => {
        if (!response.error) {
          this.setState({projectUsers: response});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleChange (selectedUser) {
    if (selectedUser) {
      this.setState({selectedOption: selectedUser });
    }
  }

  assignUser() {
    let that = this;
    updateAssignedUser(this.props.session, this.state.story.id, this.state.selectedOption)
      .then((response) => {
        if (!response.error) {
          that.props.updateUser({id: this.state.selectedOption.value, name: this.state.selectedOption.label})
          that.props.closeUserAssigner();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const story = this.state.story;
    const userList = this.state.projectUsers
    return (
      <div className='user-assigner pop-up--cover'>
        <div className='col-sm-5 col-xs-10 pop-up--wrapper'>
          <div className='post-it user'>
            <h3>Assign user to <span className='italics'>{story.title}</span></h3>

            <div className='row'>
              <div className='col-sm-8'>
                <Select
                  name="user"
                  value={this.state.selectedOption.value}
                  onChange={this.handleChange.bind(this)}
                  options={userList}
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

export default StoryUserAssigner;
