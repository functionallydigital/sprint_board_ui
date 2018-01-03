import React, { Component } from 'react';
import ProjectOverviewPostIt from './ProjectOverviewPostIt';
import { loadProject } from '../api/ProjectRequestHandler';

class ProjectRoadmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    }
  }

  componentDidMount() {
    loadProject(this.props.session, this.props.projectId)
      .then((response) => {
        if (!response.error) {
          this.setState({project: response});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  editProject() {
    const history = this.props.history;
    history.push('/project/' + this.props.projectId + '/config');
  }

  render() {
    const project = this.state.project;
    return (
      <div className='project-roadmap'>
        <div className='row roadmap-heading'>
          <div className='col-sm-4 post-it-wrapper'>
            <div className='post-it meta'>
              <h1>Project Roadmap</h1>
            </div>
          </div>

          <div className='col-sm-4'>
            {project && 
              <ProjectOverviewPostIt name={project.name}
                description={project.description}
                startDate={project.start_date}
                endDate={project.end_date}
                editProject={this.editProject.bind(this)} />
            }
          </div>
        </div>


      </div>
    )
  }
}

export default ProjectRoadmap;
