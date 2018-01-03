import React, { Component } from 'react';
import ProjectForm from './ProjectForm';
import { loadEditProject, updateProject } from '../api/ProjectRequestHandler';


class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    }
  }

  componentDidMount() {
    loadEditProject(this.props.session, this.props.projectId)
      .then((response) => {
        if (!response.error) {
          this.setState({project: response});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateProject(project) {
    const history = this.props.history;
    updateProject(this.props.session, project)
      .then((response) => {
        if (!response.error) {
          history.push('/project/' + project.id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const project = this.state.project;
    return (
      <div className='project-edit'>
        <div className='body-wrapper'>
          { project && 
            <ProjectForm project={this.state.project}
              buttonText='Update'
              session={this.props.session}
              save={this.updateProject.bind(this)} />
          }
        </div>
      </div>
    )
  }
}

export default ProjectEdit;