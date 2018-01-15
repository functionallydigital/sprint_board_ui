import React, { Component } from 'react';
import SprintStoryColumn from './SprintStoryColumn';

class SprintStoryRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null
    }
  }

  componentWillMount() {
    this.setState({story: this.props.story})
  }

  updateStory(story) {
    this.setState({story: story});
  }

  render() {
    const story = this.state.story;
    return(
      <div className='story-row'>
        <div className='stages-list'>
          { story.status.map((step) =>
            <SprintStoryColumn key={step.id}
              step={step}
              story={story}
              session={this.props.session}
              updateStory={this.updateStory.bind(this)}
              updateCompletion={this.props.updateCompletion} />
          )}
        </div>
      </div>
    )
  }
}

export default SprintStoryRow
