import React, { Component } from 'react';
import BacklogUserPostIt from '../user/BacklogUserPostIt';
import TaskEditer from '../task/TaskEditer';
import DeleteConfirmation from '../layout/DeleteConfirmation';
import { deleteTask } from '../api/TaskRequestHandler';
import DeleteIcon from '../assets/images/delete-icon.png';
import TaskUserAssigner from '../user/TaskUserAssigner';

class TaskOverviewPostIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      showEditTask: false,
      showDeleteConfirmation: false,
      displayUserAssigner: false
    }
  }

  componentWillMount() {
    this.setState({task: this.props.task})
  }

  updateUser(user) {
    const task = this.state.task;
    task.user = user;
    this.setState({task: task})
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

  toggleAssignUser() {
    this.setState({displayUserAssigner: !this.state.displayUserAssigner})
  }

  toggleShowEditTask() {
    this.setState({showEditTask: !this.state.showEditTask});
  }

  toggleDeleteConfirmation() {
    this.setState({showDeleteConfirmation: !this.state.showDeleteConfirmation});
  }

  loadPopUps() {
    const task = this.props.task;
    const showDeleteConfirmation = this.state.showDeleteConfirmation;
    const showEditTask = this.state.showEditTask;
    const showUserAssigner = this.state.displayUserAssigner;
    return (
      <div id='pop-ups'>
        { showDeleteConfirmation &&
          <DeleteConfirmation delete={this.deleteTask.bind(this)}
            cancel={this.toggleDeleteConfirmation.bind(this)}
            message='this task' />
        }
        { showEditTask &&
          <TaskEditer task={task}
            session={this.props.session}
            cancel={this.toggleShowEditTask.bind(this)}
            updateTaskList={this.props.updateTaskList.bind(this)} />
        }
        { showUserAssigner && 
          <TaskUserAssigner task={task}
            session={this.props.session}
            projectId={this.props.projectId}
            updateUser={this.updateUser.bind(this)}
            closeUserAssigner={this.toggleAssignUser.bind(this)} />
        }
      </div>
    )
  }

  render() {
    const task = this.state.task;
    console.log(task)
    return (
      <div className='post-it-wrapper'>
        { task &&
          this.loadPopUps()
        }
        <div id={task.id} className='post-it task' draggable='true'>
          <div className='row'>
            <div className='col-md-6 col-sm-6'>
              <BacklogUserPostIt user={task.user}
                openUserAssigner={this.toggleAssignUser.bind(this)} />
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