import React, { Component } from 'react';
import SprintBoard from './SprintBoard';
import { Switch, Route } from 'react-router-dom';

class Sprint extends Component {
  loadSprintBoard(props) {
    return (
      <SprintBoard projectId={this.props.projectId}
        sprintId={props.match.params.sprintId}
        session={this.props.session}
        {...props} />
    )
  }

  render() {
    const sprintBoardUrl = `${this.props.match.url}/:sprintId`;
    return (
      <Switch>
        <Route path={sprintBoardUrl}
          render={(props) => {return this.loadSprintBoard(props)}
        }/>
      </Switch>
    )
  }
}

export default Sprint;