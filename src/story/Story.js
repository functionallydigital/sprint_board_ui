import React, { Component } from 'react';
import StoryEdit from './StoryEdit'
import StoryDashboard from './StoryDashboard'
import { Switch, Route } from 'react-router-dom';

class Story extends Component {
  loadStoryEdit(props) {
    return (
      <StoryEdit projectId={this.props.projectId}
        storyId={props.match.params.storyId}
        session={this.props.session}
        {...props} />
    )
  }

  loadStoryDashboard(props) {
    return (
      <StoryDashboard projectId={this.props.projectId}
        storyId={props.match.params.storyId}
        session={this.props.session}
        priorities={this.props.priorities}
        {...props} />
    )
  }

  render() {
    const editStoryUrl = `${this.props.match.url}/:storyId/edit`;
    const storyDashboardUrl = `${this.props.match.url}/:storyId`;
    return (
      <Switch>
        <Route path={editStoryUrl}
          render={(props) => {return this.loadStoryEdit(props)}
        }/>

        <Route path={storyDashboardUrl}
          render={(props) => {return this.loadStoryDashboard(props)}
        }/>
      </Switch>
    )
  }
}

export default Story;