import React, { Component } from 'react';
import LoginPage from './login/LoginPage';
import RegisterUser from './user/RegisterUser'
import ProjectList from './project/ProjectList';
import Project from './project/Project';
import User from './user/User';
import Navbar from './layout/Navbar';
import './assets/stylesheets/App.css';
import 'react-select/dist/react-select.css';
import { loadProjects } from './api/ProjectRequestHandler';
import { loadPrioritiesList } from './api/PrioritiesRequestHandler'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      user: null,
      session: null,
      priorities: null
    };
  }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const session = JSON.parse(sessionStorage.getItem('session'));
    if (user && session) {
      this.setUser(user, session)
    }
    loadPrioritiesList()
      .then((response) => {
        this.setState({priorities: response});
      })
      .catch((error) => {
        console.error(error);
      })
  }

  setUser(user, session) {
    this.setState({user: user, session: session}, () => {
      this.loadProjects();
    })
    sessionStorage.setItem('session', JSON.stringify(session));
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  loadProjects() {
    loadProjects(this.state.session)
    .then((response) => {
        if (!response.error) {
          this.setState({projects: response});
        }
      })
      .catch((error) => {
      console.error(error);
    });
  }

  removeProject(projectId) {
    let index;
    let projects = this.state.projects;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === projectId) {
        index = i;
      }
    }
    if (index) {
      projects.splice(index, 1);
      this.setState({projects: projects});
    }
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.user}
          setUser={this.setUser.bind(this)} />
        <div className="container">
          <Router>
              <Switch>
                <Route exact path='/login'
                  component={(props) => 
                    <LoginPage
                      setUser={this.setUser.bind(this)}
                      user={this.state.user}
                      {...props} />
                  }/>
                <Route exact path='/register'
                  component={(props) => 
                    <RegisterUser
                      {...props} />
                  }/>
                <Route path='/user'
                  component={(props) =>
                    <User
                      session={this.state.session}
                      user={this.state.user}
                      setUser={this.setUser.bind(this)}
                      {...props} />
                  }/>
                <Route path='/project'
                  component={(props) => 
                    <Project
                      session={this.state.session}
                      user={this.state.user}
                      priorities={this.state.priorities}
                      removeProject={this.removeProject.bind(this)}
                      {...props} />
                  }/>
                <Route path='/'
                  component={(props) =>
                      <ProjectList
                        projects={this.state.projects}
                        user={this.state.user}
                        {...props} />
                  }/>
                <Redirect to='/'/>
              </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
