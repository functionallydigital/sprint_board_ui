import React, { Component } from 'react';

class ProjectIndexPostIt extends Component {
  handleClick() {
    this.props.openProject(this.props.project.id)
  }

  render() {
    const project = this.props.project
    return (
      <div className='post-it-wrapper col-sm-3'>
        <div onClick={this.handleClick.bind(this)} className='post-it meta clickable'>
          <h2>{project.name}</h2>
          
          <p>{project.description}</p>
          
          <p><strong>Current Sprint</strong></p>

          { project.sprint_start && 
            <div>
              <p>{project.sprint_start}</p>

              <p>{project.sprint_end}</p>

              <p>{project.sprint_completion}</p>
            </div>
          }

          { !project.sprint_start && 
            <p>There is currently no active sprint on this project</p>
          }
        </div>
      </div>
    )
  }
}

export default ProjectIndexPostIt;