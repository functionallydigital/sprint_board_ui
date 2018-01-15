import React, { Component } from 'react';
import EpicBacklogPostIt from '../epic/EpicBacklogPostIt';
import BacklogUserPostIt from '../user/BacklogUserPostIt';
import StoryUserAssigner from '../user/StoryUserAssigner';
import EditIcon from '../assets/images/edit-icon.png';

class StoryBacklogPostIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null,
      displayUserAssigner: false,
      hover: false,
      enterCounter: 0
    }
  }

  componentWillMount() {
    this.setState({story: this.props.story});
  }

  expandDetails(event) {
    const story = this.state.story;
    story.showDetails = !story.showDetails;
    this.setState({story: story});
  }

  openEdit() {
    const history = this.props.history
    history.push('/project/' + this.props.projectId + '/story/' + this.state.story.id )
  }

  toggleUserAssignerDisplay() {
    this.setState({displayUserAssigner: !this.state.displayUserAssigner})
  }

  updateUser(user) {
    const story = this.state.story;
    story.user = user;
    this.setState({story: story})
  }

  dragStart(event) {
    event.dataTransfer.effectAllowed = 'move';
    this.props.dragStart(this.state.story);
  }

  dragOver(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    this.props.drop(event, this.state.story);
    this.setState({hover: false});
  }

  dragEnter(event) {
    event.preventDefault();
    const enterCounter = this.state.enterCounter + 1;
    this.setState({hover: true,
                    enterCounter: enterCounter});
  }

  dragLeave(event) {
    event.preventDefault();
    const enterCounter = this.state.enterCounter - 1;
    if (enterCounter === 0) {
      this.setState({hover: false,
                      enterCounter: enterCounter});
    } else {
      this.setState({enterCounter: enterCounter});
    }
  }

  render() {
    const story = this.state.story;
    const id = 'post-it-' + story.id;
    let showDetails = story && story.showDetails;
    let showUserAssigner = this.state.displayUserAssigner;
    return (
      <div className={`post-it-wrapper${this.state.hover ? ' over' : ''}`}>
        { showUserAssigner && 
          <StoryUserAssigner story={story}
            session={this.props.session}
            projectId={this.props.projectId}
            updateUser={this.updateUser.bind(this)}
            closeUserAssigner={this.toggleUserAssignerDisplay.bind(this)} />
        }
        <div id={id} className='post-it story' draggable='true' onDragStart={this.dragStart.bind(this)} onDragOver={this.dragOver} onDrop={this.drop.bind(this)}
           onDragEnter={this.dragEnter.bind(this)} onDragLeave={this.dragLeave.bind(this)}>
          <div className='row'>
            <div className='col-md-3 col-sm-4'>
              <EpicBacklogPostIt
                name={story.epic_name}
                priority={story.epic_priority} />

              <BacklogUserPostIt
                user={story.user}
                openUserAssigner={this.toggleUserAssignerDisplay.bind(this)} />
            </div>

            <div className='col-md-9 col-sm-8'>
              <div className='row'>
                <div className='col-xs-11 clickable' onClick={this.expandDetails.bind(this)}>
                  <h3>{story.title}</h3>
                </div>

                <div className='col-xs-1'>
                  <img src={EditIcon} alt="Edit icon" className='edit-icon clickable' onClick={this.openEdit.bind(this)} />
                </div>
              </div>

              <p className='story-description'><strong>Description:</strong> {story.description}</p>

              <div className='row'>
                <div className='col-xs-4'>
                  Priority: {story.priority}
                </div>

                <div className='col-xs-4'>
                  Estimate: {story.estimate}
                </div>

                <div className='col-xs-4'>
                  Task count: {story.tasks.length}
                </div>
              </div>
            </div>
          </div>

          {showDetails &&
            <div className='story-details'>
              <p><strong>Acceptance Criteria:</strong></p>
              <div className='row'>
              </div>

              <p><strong>Tasks:</strong></p>
              <div className='row'>
              </div>              
            </div>
          }
        </div>
      </div>
    )
  }
}

export default StoryBacklogPostIt;