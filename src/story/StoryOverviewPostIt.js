import React, { Component } from 'react';
import BacklogUserPostIt from '../user/BacklogUserPostIt';
import DeleteConfirmation from '../layout/DeleteConfirmation';
import { deleteStory } from '../api/StoryRequestHandler';
import DeleteIcon from '../assets/images/delete-icon.png';

class StoryOverviewPostIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteConfirmation: false
    }
  }

  openStory() {
    const history = this.props.history;
    history.push('/project/' + this.props.projectId + '/story/' + this.props.story.id);
  }

  deleteStory() {
    const storyId = this.props.story.id;
    const that = this;
    deleteStory(this.props.session, storyId)
      .then((response) => {
        if (!response.error) {
          that.props.updateStoryList(storyId);
          that.toggleDeleteConfirmation();
        }
      })
      .catch((error) => {
        console.error(error);
      })
    console.log('delete story')
  }

  toggleDeleteConfirmation() {
    this.setState({showDeleteConfirmation: !this.state.showDeleteConfirmation});
  }

  loadPopUps(story) {
    const showDeleteConfirmation = this.state.showDeleteConfirmation;
    return (
      <div id='pop-ups'>
        { showDeleteConfirmation &&
          <DeleteConfirmation delete={this.deleteStory.bind(this)}
            cancel={this.toggleDeleteConfirmation.bind(this)}
            message='this story' />
        }
      </div>
    )
  }

  render() {
    const story = this.props.story
    return (
      <div className='post-it-wrapper'>
        { story &&
          this.loadPopUps(story)
        }
        <div id={story.id} className='post-it story' draggable='true'>
          <div className='row'>
            <div className='col-md-4 col-sm-5'>
              <BacklogUserPostIt
                user={story.user}
                 />
            </div>

            <div className='col-md-8 col-sm-7'>
              <div className='row'>
                <div className='col-xs-10 clickable' onClick={this.openStory.bind(this)}>
                  <h3>{story.title}</h3>

                  <p className='story-description'><strong>Description:</strong> {story.description}</p>
                </div>

                <div className='col-xs-2'>
                  <img className='delete-icon clickable' onClick={this.toggleDeleteConfirmation.bind(this)} src={DeleteIcon} alt='Delete icon' />
                </div>
              </div>

              <div className='row'>
                <div className='col-xs-4'>
                  Priority: {story.priority}
                </div>

                <div className='col-xs-4'>
                  Estimate: {story.estimate}
                </div>

                <div className='col-xs-4'>
                  Task count: 0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StoryOverviewPostIt;