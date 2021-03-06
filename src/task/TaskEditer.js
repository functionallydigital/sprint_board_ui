import React, { Component } from 'react';
import TaskForm from './TaskForm';
import { updateTask } from '../api/TaskRequestHandler';

class TaskEditer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        storyId: '',
        title: '',
        description: '',
      }
    }
  }

  componentWillMount() {
    this.setState({task: this.props.task});
  }

  updateTask(task) {
    let that = this;
    updateTask(this.props.session, task)
      .then((response) => {
        if (!response.error) {
          that.props.updateTaskList(response);
          that.props.cancel();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const task = this.state.task;
    return (
      <div className='task-create pop-up--cover'>
        <div className='col-sm-5 col-xs-10 pop-up--wrapper'>
          <div className='post-it task'>
            <h3>Update task</h3>

            { task &&
              <TaskForm task={this.state.task}
                cancel={this.props.cancel}
                cancelButton='Cancel'
                save={this.updateTask.bind(this)}
                submitButton='Update task' />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default TaskEditer;
