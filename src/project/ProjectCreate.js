import React, { Component } from 'react';
import ProjectForm from './ProjectForm';
import { createProject } from '../api/ProjectRequestHandler';

class Story extends Component {
  createProject(project) {
    const history = this.props.history;
    console.log(project);
    createProject(this.props.session, project)
      .then((response) => {
        if (!response.error) {
          history.push('/project/' + response.projectId);
        } else {
          console.error(response.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='project-create'>
        <div className='heading'>
          <h2>Start New Project</h2>
        </div>

        <div className='body-wrapper'>
          <ProjectForm buttonText='Create'
              save={this.createProject.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Story;