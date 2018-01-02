import React, { Component } from 'react';
import BacklogUserPostIt from '../user/BacklogUserPostIt';
import TaskEditer from '../task/TaskEditer';
import DeleteConfirmation from '../layout/DeleteConfirmation';
import { deleteTask } from '../api/TaskRequestHandler';
import DeleteIcon from '../assets/images/delete-icon.png';

class TaskOverviewPostIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditTask: false,
      showDeleteConfirmation: false
    }
  }

  deleteTask() {
    const taskId = this.props.task.id;
    const that = this;
    deleteTask(this.props.session, taskId)
      .then((response) => {
        if (!response.error) {
          that.props.removeFromTaskList(taskId);
          that.toggleDeleteConfirmation();
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  toggleShowEditTask() {
    this.setState({showEditTask: !this.state.showEditTask});
  }

  toggleDeleteConfirmation() {
    this.setState({showDeleteConfirmation: !this.state.showDeleteConfirmation});
  }

  loadPopUps() {
    const showDeleteConfirmation = this.state.showDeleteConfirmation;
    const showEditTask = this.state.showEditTask;
    return (
      <div id='pop-ups'>
        { showDeleteConfirmation &&
          <DeleteConfirmation delete={this.deleteTask.bind(this)}
            cancel={this.toggleDeleteConfirmation.bind(this)}
            message='this task' />
        }
        { showEditTask &&
          <TaskEditer task={this.props.task}
            session={this.props.session}
            cancel={this.toggleShowEditTask.bind(this)}
            updateTaskList={this.props.updateTaskList.bind(this)} />
        }
      </div>
    )
  }

  render() {
    const task = this.props.task;
    return (
      <div className='post-it-wrapper'>
        { task &&
          this.loadPopUps()
        }
        <div id={task.id} className='post-it task' draggable='true'>
          <div className='row'>
            <div className='col-md-6 col-sm-6'>
              <BacklogUserPostIt
                user={task.user}
                 />
            </div>

            <div className='col-md-6 col-sm-6'>
              <div className='row'>
                <div className='col-xs-10 clickable' onClick={this.toggleShowEditTask.bind(this)}>
                  <h3>{task.title}</h3>

                  <p className='task-description'><strong>Description:</strong> {task.description}</p>
                </div>

                <div className='col-xs-2'>
                  <img className='delete-icon clickable' onClick={this.toggleDeleteConfirmation.bind(this)} src={DeleteIcon} alt='Delete icon' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskOverviewPostIt;