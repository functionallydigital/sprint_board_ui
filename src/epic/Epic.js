import React, { Component } from 'react';
import EpicDashboard from './EpicDashboard'
import { Switch, Route } from 'react-router-dom';

class Epic extends Component {
  loadEpicDashboard(props) {
    return (
      <EpicDashboard projectId={this.props.projectId}
        epicId={props.match.params.epicId}
        session={this.props.session}
        priorities={this.props.priorities}
        {...props} />
    )
  }

  render() {
    const epicDashboardUrl = `${this.props.match.url}/:epicId`;
    return (
      <Switch>
        <Route path={epicDashboardUrl}
          render={(props) => {return this.loadEpicDashboard(props)}
        }/>
      </Switch>
    )
  }
}

export default Epic;