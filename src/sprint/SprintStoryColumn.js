import React, { Component } from 'react';
import StorySprintPostIt from '../story/StorySprintPostIt';
import TaskSprintPostIt from '../task/TaskSprintPostIt';
import { updateStoryStage } from '../api/StoryRequestHandler';
import { updateTaskStage } from '../api/TaskRequestHandler';

class SprintStoryColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: null,
      story: null
    }
  }

  componentWillMount() {
    this.setState({step: this.props.step,
                  story: this.props.story});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.story !== nextProps.story) {
      this.setState({story: nextProps.story});
    }
    if (this.props.step !== nextProps.step) {
      this.setState({step: nextProps.step});
    }
  }

  dragOver(event) {
    event.preventDefault();
  }

  progressPostIt(event) {
    event.preventDefault();
    let that = this;
    const postIt = JSON.parse(event.dataTransfer.getData('post-it'));
    const type = event.dataTransfer.getData('type');
    let story = this.props.story;
    const step = this.state.step;
    if (type === 'story' && story.id === postIt.id) {
      updateStoryStage(this.props.session, postIt.id, {newStep: step.id})
        .then((response) => {
          if (!response.error) {
            story.status_id = step.id
            that.props.updateStory(story);
            that.props.updateCompletion(response.completion)
          }
        })
        .catch((error) => {
          console.error(error);
        })
    } else if (type === 'task' && story.id === postIt.story_id) {
      updateTaskStage(this.props.session, postIt.id, {newStep: step.id})
        .then((response) => {
          if (!response.error) {
            that.props.updateStory(response.story);
            that.props.updateCompletion(response.completion)
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  removeTaskFromStep(stepOrder, taskId) {
    let tasks = this.props.story.status[stepOrder].tasks;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        tasks.splice(i, 1);
        return tasks;
      }
    }
  }

  render() {
    const story = this.state.story;
    const step = this.state.step;
    const storyInStep = story.status_id === step.id;
    return(
      <div className='stage' onDragOver={this.dragOver} onDrop={this.progressPostIt.bind(this)}>
        { storyInStep &&
          <StorySprintPostIt story={story}
            session={this.props.session} />
        }
        { step.tasks.map((task) =>
          <TaskSprintPostIt key={task.id}
            task={task}
            session={this.props.session}
            projectId={story.project_id} />
        )}
      </div>
    )
  }
}

export default SprintStoryColumn;
