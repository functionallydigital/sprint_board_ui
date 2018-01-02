import React, { Component } from 'react';
import ProjectIndexPostIt from './ProjectIndexPostIt';
import AddPostIt from '../layout/AddPostIt';
import { Redirect } from 'react-router-dom'

class ProjectList extends Component {
  openProject(id) {
    const history = this.props.history;
    history.push('/project/' + id);
  }

  startProject() {
    const history = this.props.history;
    history.push('project/new');
  }

  render() {
    const user = this.props.user;
    const projects = this.props.projects;
    if (user) {
      return (
        <div className='project-list'>
          <h1 className='heading'>
            Welcome to the sprint board {user.name}.
          </h1>

          <div className='row'>
            {projects && projects.map((project) =>
              <ProjectIndexPostIt
                key={project.id}
                project={project}
                openProject={this.openProject.bind(this)}
                />
            )}

            <AddPostIt width='3'
              type='meta'
              title='Start new project'
              openAdd={this.startProject.bind(this)} />
          </div>
        </div>
      )
    } else {
      return (
        <Redirect to='/login'/>
      )
    }
  }
}

export default ProjectList;