import React, { Component } from 'react';
import TaskForm from './TaskForm';
import { createTask } from '../api/TaskRequestHandler';

class TaskAdder extends Component {
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
    let task = this.state.task;
    task.storyId = this.props.storyId;
    this.setState({task: task});
  }

  createTask(newTask) {
    let that = this;
    createTask(this.props.session, newTask)
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
            <h3>Create new task</h3>

            { task &&
              <TaskForm task={this.state.task}
                cancel={this.props.cancel}
                cancelButton='Cancel'
                save={this.createTask.bind(this)}
                submitButton='Create task' />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default TaskAdder;
