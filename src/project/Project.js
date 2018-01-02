import React, { Component } from 'react';
import ProjectDashboard from './ProjectDashboard';
import ProjectEdit from './ProjectEdit';
import ProjectCreate from './ProjectCreate';
import ProjectBacklog from './ProjectBacklog';
import Epic from '../epic/Epic';
import Story from '../story/Story';
import { Redirect, Switch, Route } from 'react-router-dom';

class Project extends Component {
  loadProjectCreate(props) {
    return (
      <ProjectCreate session={this.props.session}
        {...props} />
    )
  }

  loadDashboard(props) {
    return (
      <ProjectDashboard projectId={props.match.params.projectId}
        session={this.props.session}
        priorities={this.props.priorities}
        removeProject={this.props.removeProject}
        {...props} />
    )
  }

  loadProjectEdit(props) {
    return (
      <ProjectEdit projectId={props.match.params.projectId}
        session={this.props.session}
        {...props} />
    )
  }

  loadProjectBacklog(props) {
    return (
      <ProjectBacklog projectId={props.match.params.projectId}
        session={this.props.session}
        {...props} />
    )
  }

  loadStory(props) {
    return (
      <Story projectId={props.match.params.projectId}
        session={this.props.session}
        priorities={this.props.priorities}
        {...props} />
    )
  }

  loadEpic(props) {
    return (
      <Epic projectId={props.match.params.projectId}
        session={this.props.session}
        priorities={this.props.priorities}
        {...props} />
    )
  }

  render() {
    const user = this.props.user;
    const newProjectUrl = `${this.props.match.url}/new`;
    const dashboardUrl = `${this.props.match.url}/:projectId`;
    const editProjectUrl = `${this.props.match.url}/:projectId/config`;
    const projectBacklogUrl = `${this.props.match.url}/:projectId/backlog`;
    const storyUrl = `${this.props.match.url}/:projectId/story`;
    const epicUrl = `${this.props.match.url}/:projectId/epic`;
    if (user) {
      return (
        <Switch>
          <Route path={newProjectUrl}
            render={(props) => {return this.loadProjectCreate(props)}
          }/>
          <Route path={epicUrl}
            render={(props) => {return this.loadEpic(props)}
          }/>
          <Route path={storyUrl}
            render={(props) => {return this.loadStory(props)}
          }/>
          <Route path={editProjectUrl}
            render={(props) => {return this.loadProjectEdit(props)}
          }/>
          <Route path={projectBacklogUrl}
            render={(props) => {return this.loadProjectBacklog(props)}
          }/>
          <Route path={dashboardUrl}
            render={(props) => {return this.loadDashboard(props)}
          }/>
        </Switch>
      )
    } else {
      return (
        <Redirect to='/login'/>
      )
    }
  }
}

export default Project;