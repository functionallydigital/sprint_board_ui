import React, { Component } from 'react';
import StoryForm from './StoryForm';
import { loadStoryEdit, updateStory } from '../api/StoryRequestHandler';

class StoryEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null
    }
  }

  componentWillMount() {
    loadStoryEdit(this.props.session, this.props.match.params.storyId)
      .then((response) => {
        if (!response.error) {
          this.setState({story: response});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateStory(story) {
    const projectId = this.props.projectId;
    const history = this.props.history;
    updateStory(this.props.session, story)
      .then((response) => {
        if (!response.error) {
          history.push('/project/' + projectId);
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    const story = this.state.story;
    return (
      <div className='story-edit'>
        <h2>Edit Story</h2>

        { story && 
          <StoryForm story={story}
            buttonText='Update'
            save={this.updateStory.bind(this)} />
        }
      </div>
    )
  }
}

export default StoryEdit;