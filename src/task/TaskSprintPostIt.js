import React, { Component } from 'react';
import BacklogUserPostIt from '../user/BacklogUserPostIt';
import TaskUserAssigner from '../user/TaskUserAssigner';

class TaskSprintPostIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      displayUserAssigner: false
    }
  }

  componentWillMount() {
    this.setState({task: this.props.task})
  }

  toggleAssignUser() {
    this.setState({displayUserAssigner: !this.state.displayUserAssigner})
  }

  updateUser(user) {
    const task = this.state.task;
    task.user = user;
    this.setState({task: task})
  }

  drag(event) {
    event.dataTransfer.setData('post-it', JSON.stringify(this.state.task));
    event.dataTransfer.setData('type', 'task');
  }

  loadPopUps() {
    const task = this.state.task;
    const showUserAssigner = this.state.displayUserAssigner;
    return(
      <div className='pop-ups'>
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
    return(
      <div>
        { task && 
          this.loadPopUps()
        }

        {task && 
          <div className='post-it-wrapper'>
            <div className='post-it task sprint' draggable='true' onDragStart={this.drag.bind(this)}>
              <h3>{task.title}</h3>

              <BacklogUserPostIt user={task.user}
                openUserAssigner={this.toggleAssignUser.bind(this)} />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default TaskSprintPostIt;
