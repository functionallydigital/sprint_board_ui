import React, { Component } from 'react';
import EpicForm from './EpicForm';
import { createEpic } from '../api/EpicRequestHandler';

class EpicAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      epic: {
        name: '',
        priority: '',
        projectId: ''
      }
    }
  }

  componentWillMount() {
    let epic = this.state.epic;
    epic.projectId = this.props.projectId
    this.setState({epic: epic});
  }

  createEpic(newEpic) {
    let that = this;
    const epic = {name: newEpic.name, project_id: newEpic.projectId, priority: newEpic.priority.value}
    createEpic(this.props.session, epic)
      .then((response) => {
        if (!response.error) {
          that.props.updateEpicList(response);
          that.props.cancel();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const prioritiesList = this.props.priorities;
    return (
      <div className='user-assigner pop-up--cover'>
        <div className='col-sm-5 col-xs-10 pop-up--wrapper'>
          <div className='post-it epic'>
            <h3>Create new epic</h3>

            <EpicForm epic={this.state.epic}
              priorities={prioritiesList}
              cancel={this.props.cancel}
              cancelButton='Cancel'
              save={this.createEpic.bind(this)}
              submitButton='Create epic' />
          </div>
        </div>
      </div>
    )
  }
}

export default EpicAdder;
