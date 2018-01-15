import React, { Component } from 'react';
import BacklogUserPostIt from '../user/BacklogUserPostIt';
import StoryUserAssigner from '../user/StoryUserAssigner';

class StorySprintPostIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null,
      displayUserAssigner: false
    }
  }

  componentWillMount() {
    this.setState({story: this.props.story})
  }

  toggleAssignUser() {
    this.setState({displayUserAssigner: !this.state.displayUserAssigner})
  }

  updateUser(user) {
    const story = this.state.story;
    story.user = user;
    this.setState({story: story})
  }

  drag(event) {
    event.dataTransfer.setData('post-it', JSON.stringify(this.state.story));
    event.dataTransfer.setData('type', 'story');
  }

  loadPopUps() {
    const story = this.state.story;
    const showUserAssigner = this.state.displayUserAssigner;
    return(
      <div className='pop-ups'>
        { showUserAssigner && 
          <StoryUserAssigner story={story}
            session={this.props.session}
            projectId={story.project_id}
            updateUser={this.updateUser.bind(this)}
            closeUserAssigner={this.toggleAssignUser.bind(this)} />
        }
      </div>
    )
  }

  render() {
    const story = this.state.story;
    return(
      <div>
        { story && 
          this.loadPopUps()
        }

        {story && 
          <div className='post-it-wrapper'>
            <div className='post-it story sprint' draggable={`${story.draggable}`} onDragStart={this.drag.bind(this)}>
              <h3>{story.title}</h3>
              
              <p><strong>Estimate:</strong> {story.estimate}</p>
              
              <BacklogUserPostIt user={story.user}
                openUserAssigner={this.toggleAssignUser.bind(this)} />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default StorySprintPostIt;
