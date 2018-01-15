import React, { Component } from 'react';
import ProjectHeadingPostIt from './ProjectHeadingPostIt';
import StoryBacklogPostIt from '../story/StoryBacklogPostIt';
import AddPostIt from '../layout/AddPostIt';
import SprintForm from '../sprint/SprintForm';
import { loadProjectBacklog } from '../api/ProjectRequestHandler';
import { updateStoryPosition } from '../api/StoryRequestHandler';

class ProjectBacklog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      movingStory: null,
      showSprintAdder: true
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

  dragStart(story) {
    this.setState({movingStory: story});
  }

  drop(event, story) {
    if (this.state.movingStory.id !== story) {
      updateStoryPosition(this.props.session, this.state.movingStory.id, {newPosition: story.position})
        .then((response) => {
          if (!response.error) {
            this.setState({project: response});
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  toggleshowSprintAdder() {
    this.setState({showSprintAdder: !this.state.showSprintAdder});
  }

  createSprint(sprint) {
    console.log('saving sprint')
  }

  cancelNewSprint() {
    this.toggleshowSprintAdder();    
  }

  render() {
    const project = this.state.project;
    const showSprintAdder = this.state.showSprintAdder;
    return (
      <div className='project-backlog'>
        <div className='heading'>
          <div className='row'>
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
        </div>

        <div className='body-wrapper'>
          <div className='backlog-list'>

            { project && project.sprints.map((sprint) =>
              <div className='backlog-sprint'>
                <div className='row'>
                  <div className='col-sm-8'>
                    { sprint.stories.map((story) =>
                      <StoryBacklogPostIt 
                        key={story.id}
                        projectId={project.id}
                        story={story}
                        session={this.props.session}
                        history={this.props.history}
                        dragStart={this.dragStart.bind(this)}
                        drop={this.drop.bind(this)} />
                    )}
                  </div>

                  <div className='col-sm-4'>
                    <SprintForm sprint={sprint}
                      save={this.createSprint.bind(this)}
                      submitButton={`${sprint.id ? 'Update' : 'Create'} Sprint`}
                      cancel={this.cancelNewSprint.bind(this)}
                      cancelButton='Cancel' />
                  </div>
                </div>
              </div>
            )}

            <div className='row'>
              <div className='col-sm-8'>
                {project && project.stories.map((story) =>
                  <StoryBacklogPostIt 
                    key={story.id}
                    projectId={project.id}
                    story={story}
                    session={this.props.session}
                    history={this.props.history}
                    dragStart={this.dragStart.bind(this)}
                    drop={this.drop.bind(this)} />
                )}
              </div>

              { showSprintAdder &&
                <AddPostIt width='2 col-sm-offset-1'
                  type='meta'
                  title='Create new sprint'
                  openAdd={this.toggleshowSprintAdder.bind(this)} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectBacklog;