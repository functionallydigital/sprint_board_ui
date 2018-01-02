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
        <h2 className='heading'>Start New Project</h2>

        <ProjectForm buttonText='Create'
            save={this.createProject.bind(this)} />
      </div>
    )
  }
}

export default Story;