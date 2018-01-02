import React, { Component } from 'react';
import ProjectHeadingPostIt from './ProjectHeadingPostIt';
import StoryBacklogPostIt from '../story/StoryBacklogPostIt';
import { loadProjectBacklog } from '../api/ProjectRequestHandler';


class ProjectBacklog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    }
  }

  componentWillMount() {
    loadProjectBacklog(this.props.session, this.props.projectId)
      .then((response) => {
        if (!response.error) {
          this.setState({project: response});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  openDashboard() {
    const history = this.props.history;
    history.push('/project/' + this.state.project.id)
  }

  render() {
    const project = this.state.project;
    return (
      <div className='project-backlog'>
        <div className='row backlog-lead'>
          <div className='col-sm-4'>
            {project && 
              <ProjectHeadingPostIt heading={project.name + ' Backlog'} />
            }
          </div>

          <div className='col-sm-8'>
            <div className='post-it button fitted clickable right' onClick={this.openDashboard.bind(this)}>
              View Dashboard
            </div>
          </div>
        </div>

        <div className='backlog-list'>
          <div className='row'>
            <div className='col-sm-8'>
              {project && project.stories.map((story) =>
                <StoryBacklogPostIt 
                  key={story.id}
                  projectId={project.id}
                  story={story}
                  session={this.props.session}
                  history={this.props.history} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectBacklog;