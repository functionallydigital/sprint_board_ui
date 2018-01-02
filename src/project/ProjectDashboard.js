import React, { Component } from 'react';
import { loadProject, deleteProject } from '../api/ProjectRequestHandler';
import ProjectOverviewPostIt from './ProjectOverviewPostIt';
import SprintOverviewPostIt from '../sprint/SprintOverviewPostIt';
import EpicOverviewPostIt from '../epic/EpicOverviewPostIt';
import ProjectUserPostIt from '../user/ProjectUserPostIt';
import ProjectUserAssigner from '../user/ProjectUserAssigner';
import AddPostIt from '../layout/AddPostIt';
import EpicAdder from '../epic/EpicAdder';
import DeleteConfirmation from '../layout/DeleteConfirmation';

class ProjectDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      showDeleteConfirmation: false,
      showAddUser: false,
      showEpicAdder: false
    }
  }

  componentDidMount() {
    loadProject(this.props.session, this.props.projectId)
      .then((response) => {
        if (!response.error) {
          this.setState({project: response});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  openBacklog() {
    const history = this.props.history;
    history.push(this.props.match.url + '/backlog');
  }

  openEpic(epicId) {
    const history = this.props.history;
    history.push(this.props.match.url + '/epic/' + epicId)
  }

  openRoadmap() {
    console.log('open roadmap');
  }

  editProject() {
    const history = this.props.history;
    history.push(this.props.match.url + '/config');
  }

  deleteProject() {
    const history = this.props.history;
    const projectId = this.state.project.id;
    const removeProject = this.props.removeProject;
    deleteProject(this.props.session, projectId)
      .then((response) => {
        if (!response.error) {
          removeProject(projectId);
          history.push('/');
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  updateUserList(user) {
    let project = this.state.project;
    project.users.push(user);
    this.setState({project: project});
  }

  updateEpicList(epic) {
    let project = this.state.project;
    project.epics.push(epic);
    this.setState({project: project});
  }

  toggleDeleteConfirmation() {
    this.setState({showDeleteConfirmation: !this.state.showDeleteConfirmation})
  }

  toggleShowUserAssigner() {
    this.setState({showAddUser: !this.state.showAddUser});
  }

  toggleShowEpicAdder() {
    this.setState({showEpicAdder: !this.state.showEpicAdder});
  }

  loadPopUps(project) {
    const showDeleteConfirmation = this.state.showDeleteConfirmation;
    const showAddUserPopUp = this.state.showAddUser;
    const showEpicAdder = this.state.showEpicAdder;
    return (
      <div id='pop-ups'>
        { showEpicAdder &&
          <EpicAdder projectId={this.state.project.id}
            session={this.props.session}
            priorities={this.props.priorities}
            updateEpicList={this.updateEpicList.bind(this)}
            cancel={this.toggleShowEpicAdder.bind(this)} />
        }
        { showAddUserPopUp && 
          <ProjectUserAssigner session={this.props.session}
            projectId={project.id}
            updateUserList={this.updateUserList.bind(this)}
            closeUserAssigner={this.toggleShowUserAssigner.bind(this)} />
        }
        { showDeleteConfirmation &&
          <DeleteConfirmation delete={this.deleteProject.bind(this)}
            cancel={this.toggleDeleteConfirmation.bind(this)}
            message='this project' />
        }
      </div>
    )
  }

  render() {
    const project = this.state.project;
    return (
      <div className='project-dashboard'>
        { this.loadPopUps(project) }
        <div className='row dashboard-lead'>
          <div className='col-sm-4'>
            {project && 
              <ProjectOverviewPostIt name={project.name}
                description={project.description}
                startDate={project.start_date}
                endDate={project.end_date}
                editProject={this.editProject.bind(this)} />
            }
          </div>

          <div className='col-sm-6'>
            {project && 
              <SprintOverviewPostIt sprint_start={project.sprint_start}
                sprint_end={project.sprint_end}
                sprint_completion={project.sprint_completion} />
            }
          </div>

          <div className='col-sm-2'>
            <div className='post-it button fitted clickable right' onClick={this.toggleDeleteConfirmation.bind(this)}>
              Delete Project
            </div>

            <div className='post-it button fitted clickable right' onClick={this.openRoadmap.bind(this)}>
              Project Roadmap
            </div>
          </div>
        </div>

        <div className='row dashboard-main'>
          <div className='col-sm-7 epic-list'>
            <div className='post-it meta fitted'>
              <h3>Epics</h3>
            </div>

            <div className='post-it button fitted clickable right' onClick={this.openBacklog.bind(this)}>
              View Backlog
            </div>

            <div className='row'>
              {project && project.epics.map((epic) =>
                <EpicOverviewPostIt key={epic.id}
                  id={epic.id}
                  name={epic.name}
                  priority={epic.priority}
                  storyCount={epic.story_count}
                  openEpic={this.openEpic.bind(this)} />
              )}

              <AddPostIt width='4'
                type='epic'
                title='Add new epic'
                openAdd={this.toggleShowEpicAdder.bind(this)} />
            </div>
          </div>

          <div className='col-sm-5 user-list'>
            <div className='post-it meta fitted'>
              <h3>Team</h3>
            </div>

            <div className='row'>
              {project && this.state.project.users.map((user) =>
                <ProjectUserPostIt key={user.id}
                  name={user.name}
                  role={user.role} />
              )}

              <AddPostIt width='4'
                type='user'
                title='Add user to project'
                openAdd={this.toggleShowUserAssigner.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectDashboard;
