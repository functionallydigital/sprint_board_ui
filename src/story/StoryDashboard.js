import React, { Component } from 'react';
import StoryForm from './StoryForm';
import TaskOverviewPostIt from '../task/TaskOverviewPostIt';
import TaskAdder from '../task/TaskAdder';
import ProgressPostIt from '../layout/ProgressPostIt';
import AddPostIt from '../layout/AddPostIt';
import { loadStory, updateStory } from '../api/StoryRequestHandler';

class StoryDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null,
      showAddTask: false,
    };
  }

  componentWillMount() {
    loadStory(this.props.session, this.props.storyId)
      .then((response) => {
        if (!response.error) {
          this.setState({story: response});
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  toggleShowAddTask() {
    this.setState({showAddTask: !this.state.showAddTask});
  }

  updateStory(story) {
    const that = this;
    story.priority = story.priority.value;
    updateStory(this.props.session, story)
      .then((response) => {
        if (!response.error) {
          that.setState({story: response});
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  addToTaskList(task) {
    let story = this.state.story;
    story.tasks.push(task);
    this.setState({story: story});
  }

  removeTaskFromList(taskId) {
    let story = this.state.story;
    let index;
    for (let i = 0; i < story.tasks.length; i++) {
      if (story.tasks[i].id === taskId) {
        index = i;
      }
    }
    story.tasks.splice(index, 1);
    this.setState({story: story});
  }

  updateTaskList(task) {
    let story = this.state.story;
    for (let i = 0; i < story.tasks.length; i++) {
      if (story.tasks[i].id === task.id) {
        story.tasks[i].id = task;
      }
    }
    this.setState({story: story});
  }

  loadPopUps() {
    const showAddTask = this.state.showAddTask;
    return (
      <div id='pop-ups'>
        { showAddTask &&
          <TaskAdder storyId={this.state.story.id}
            session={this.props.session}
            cancel={this.toggleShowAddTask.bind(this)}
            updateTaskList={this.addToTaskList.bind(this)} />
        }
      </div>
    )
  }

  render() {
    const story = this.state.story;
    return(
      <div className='story-dashboard'>
        { story &&
          this.loadPopUps()
        }
        <div className='row'>
          <div className='col-sm-8 story-overview'>
            <div className='post-it-wrapper'>
              <div className='post-it story'>
                { story && 
                  <StoryForm story={this.state.story}
                    priorities={this.props.priorities}
                    submitButton='Update'
                    save={this.updateStory.bind(this)} />
                }
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-6'>
                { story && 
                  <ProgressPostIt type='story'
                    partSingular='task'
                    partPlural='tasks'
                    progress={story.progress} />
                }
              </div>

              <AddPostIt width='4 col-sm-offset-1'
                type='task'
                title='Add new task'
                openAdd={this.toggleShowAddTask.bind(this)} />
            </div>
          </div>

          <div className='col-sm-4'>
            {story && this.state.story.tasks.map((task) =>
              <TaskOverviewPostIt key={task.id}
                projectId={this.props.projectId}
                task={task}
                session={this.props.session}
                history={this.props.history}
                removeFromTaskList={this.removeTaskFromList.bind(this)}
                updateTaskList={this.updateTaskList.bind(this)} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default StoryDashboard;
