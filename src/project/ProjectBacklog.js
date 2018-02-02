import React, { Component } from 'react';
import ProjectHeadingPostIt from './ProjectHeadingPostIt';
import StoryBacklogPostIt from '../story/StoryBacklogPostIt';
import AddPostIt from '../layout/AddPostIt';
import SprintForm from '../sprint/SprintForm';
import { loadProjectBacklog } from '../api/ProjectRequestHandler';
import { updateStoryPosition } from '../api/StoryRequestHandler';
import { createSprint } from '../api/SprintRequestHandler';

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
    console.log(10)
    this.setState({movingStory: story});
  }

  drop(event, story) {
    console.log(50)
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

  addNewSprint() {
    const project = this.state.project;
    project.sprints.push({});
    this.setState({project: project});
    this.toggleshowSprintAdder();
  }

  toggleshowSprintAdder() {
    this.setState({showSprintAdder: !this.state.showSprintAdder});
  }

  createSprint(sprint) {
    let that = this;
    const project = this.state.project;
    sprint.project_id = project.id;
    createSprint(this.props.session, sprint)
      .then((response) => {
        if (!response.error) {
          that.setState({project: response});
          this.toggleshowSprintAdder();
        }
      })
      .catch((error) => {
        console.error(error);
      })
    console.log('saving sprint')
  }

  cancelNewSprint() {
    const project = this.state.project;
    const lastPosition = project.sprints.length - 1
    project.sprints.splice(lastPosition, 1);
    this.setState({project: project});
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

            { project && project.sprints.map((sprint, index) =>
              <div className='backlog-sprint' key={index}>
                <div className='row'>
                  <div className='col-sm-8'>
                    { sprint.stories && sprint.stories.map((story) =>
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
                  openAdd={this.addNewSprint.bind(this)} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectBacklog;