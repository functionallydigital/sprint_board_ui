import React, { Component } from 'react';
import StoryForm from './StoryForm';
import { createStory } from '../api/StoryRequestHandler';

class StoryAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {
        epicId: '',
        title: '',
        description: '',
        priority: '',
        estimate: '',
        acceptance_criteria: ''
      }
    }
  }

  componentWillMount() {
    let story = this.state.story;
    story.epicId = this.props.epicId;
    this.setState({story: story});
  }

  createStory(newStory) {
    let that = this;
    newStory.priority = newStory.priority.value;
    createStory(this.props.session, newStory)
      .then((response) => {
        if (!response.error) {
          that.props.updateStoryList(response);
          that.props.cancel();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const prioritiesList = this.props.priorities;
    return (
      <div className='story-create pop-up--cover'>
        <div className='col-sm-5 col-xs-10 pop-up--wrapper'>
          <div className='post-it story'>
            <h3>Create new story</h3>

            <StoryForm story={this.state.story}
              priorities={prioritiesList}
              cancel={this.props.cancel}
              cancelButton='Cancel'
              save={this.createStory.bind(this)}
              submitButton='Create story' />
          </div>
        </div>
      </div>
    )
  }
}

export default StoryAdder;
