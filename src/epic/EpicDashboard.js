import React, { Component } from 'react';
import EpicForm from './EpicForm';
import StoryOverviewPostIt from '../story/StoryOverviewPostIt';
import StoryAdder from '../story/StoryAdder';
import ProgressPostIt from '../layout/ProgressPostIt';
import AddPostIt from '../layout/AddPostIt';
import { loadEpic, updateEpic } from '../api/EpicRequestHandler';

class EpicDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      epic: null,
      showAddStory: false
    }
  }

  componentWillMount() {
    let that = this;
    loadEpic(this.props.session, this.props.epicId)
      .then((response) => {
        if (!response.error) {
          that.setState({epic: response});
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  loadProjectDashboard() {
    const history = this.props.history;
    history.push('/project/' + this.props.projectId);
  }

  updateEpic(epic) {
    let that = this;
    updateEpic(this.props.session, epic)
      .then((response) => {
        if (!response.error) {
          that.setState({epic: response});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addToStoryList(story) {
    let epic = this.state.epic;
    epic.stories.push(story);
    this.setState({epic: epic});
  }

  removeStoryFromList(storyId) {
    let epic = this.state.epic;
    let index;
    for (let i = 0; i < epic.stories.length; i++) {
      if (epic.stories[i].id === storyId) {
        index = i;
      }
    }
    epic.stories.splice(index, 1);
    this.setState({epic: epic});
  }

  toggleShowAddStory() {
    this.setState({showAddStory: !this.state.showAddStory});
  }

  loadPopups() {
    const showAddStory = this.state.showAddStory;
    return (
      <div id='pop-ups'>
        { showAddStory &&
          <StoryAdder epicId={this.state.epic.id}
            session={this.props.session}
            priorities={this.props.priorities}
            cancel={this.toggleShowAddStory.bind(this)}
            updateStoryList={this.addToStoryList.bind(this)} />
        }
      </div>
    )
  }

  render() {
    const epic = this.state.epic
    return (
      <div className='row epic-dashboard'>
        { epic && this.loadPopups(epic)}

        <div className='col-sm-6 epic-details'>
          <div className='post-it-wrapper'>
            <div className='post-it epic'>
              { epic && 
                <EpicForm epic={this.state.epic}
                  priorities={this.props.priorities}
                  cancel={this.loadProjectDashboard.bind(this)}
                  cancelButton='Return to project dashboard'
                  save={this.updateEpic.bind(this)}
                  submitButton='Update' />
              }
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-6'>
              { epic && 
                <ProgressPostIt type='epic'
                  partSingular='story'
                  partPlural='stories'
                  progress={epic.progress} />
              }
            </div>

            <AddPostIt width='4 col-sm-offset-1'
              type='story'
              title='Add new story'
              openAdd={this.toggleShowAddStory.bind(this)} />
          </div>
        </div>

        <div className='col-sm-6 epic-stories'>
          {epic && this.state.epic.stories.map((story) =>
            <StoryOverviewPostIt key={story.id}
              projectId={this.props.projectId}
              story={story}
              session={this.props.session}
              history={this.props.history}
              updateStoryList={this.removeStoryFromList.bind(this)} />
          )}
        </div>
      </div>
    )
  }
}

export default EpicDashboard;