import React, { Component } from 'react';
import ProjectOverviewPostIt from './ProjectOverviewPostIt';
import EpicTitlePostIt from '../epic/EpicTitlePostIt';
import RoadmapSprint from '../sprint/RoadmapSprint';
import { loadProjectRoadmap } from '../api/ProjectRequestHandler';
import { updateEpicSprint } from '../api/EpicRequestHandler'

class ProjectRoadmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    }
  }

  componentDidMount() {
    loadProjectRoadmap(this.props.session, this.props.projectId)
      .then((response) => {
        if (!response.error) {
          this.setState({project: response});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  editProject() {
    const history = this.props.history;
    history.push('/project/' + this.props.projectId + '/config');
  }

  dragOver(event) {
    event.preventDefault();
  }

  addEpicToSprint(sprintNumber, event) {
    event.preventDefault();
    let project = this.state.project;
    const epic = JSON.parse(event.dataTransfer.getData('epic'));
    const origin = event.dataTransfer.getData('origin');
    const originId = event.dataTransfer.getData('originId');
    updateEpicSprint(this.props.session, epic.id, {sprintNumber: sprintNumber})
      .then((response) => {
        if (!response.error) {
          project.sprints[sprintNumber - 1].epics.push(epic);
          project.sprints[sprintNumber - 1].estimate += response.estimate;
          project.required_velocity = response.average_velocity;
          this.setState({project: project });
          if (origin === '"project"') {
            this.removeEpicFromProject(epic);
          } else if (origin === '"sprint"') {
            this.removeEpicFromSprint(epic, originId, response.estimate);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  addEpicToProject(event) {
    console.log(10);
    event.preventDefault();
    const epic = JSON.parse(event.dataTransfer.getData('epic'));
    const origin = event.dataTransfer.getData('origin');
    const originId = event.dataTransfer.getData('originId');
    if (origin !== '"project"') {
      let project = this.state.project;
      updateEpicSprint(this.props.session, epic.id, {sprintNumber: null})
        .then((response) => {
          if (!response.error) {
            project.epics.push(epic);
            project.required_velocity = response.average_velocity;
            this.setState({project: project });
            this.removeEpicFromSprint(epic, originId, response.estimate);
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  removeEpicFromProject(epic) {
    let project = this.state.project;
    let index;
    for (let i = 0; i < project.epics.length; i++) {
      if (project.epics[i].id === epic.id) {
        index = i;
      }
    }
    if (index !== undefined) {
      project.epics.splice(index, 1);
    }
    this.setState({project: project });
  }

  removeEpicFromSprint(epic, position, estimate) {
    let project = this.state.project;
    let index;
    for (let i = 0; i < project.sprints[position].epics.length; i++) {
      if (project.sprints[position].epics[i].id === epic.id) {
        index = i;
      }
    }
    if (index !== undefined) {
      project.sprints[position].epics.splice(index, 1);
      project.sprints[position].estimate -= estimate;
    }
    this.setState({project: project });
  }

  render() {
    const project = this.state.project;
    const addEpicToSprint = this.addEpicToSprint;
    return (
      <div className='project-roadmap'>
        <div className='row heading'>
          <div className='col-sm-4 post-it-wrapper'>
            <div className='post-it meta'>
              <h1>Project Roadmap</h1>
            </div>
          </div>

          <div className='col-sm-4'>
            {project && 
              <ProjectOverviewPostIt name={project.name}
                description={project.description}
                startDate={project.start_date}
                endDate={project.end_date}
                editProject={this.editProject.bind(this)} />
            }
          </div>

          <div className='col-sm-2 post-it-wrapper'>
            <div className='post-it meta'>
              <h3>Required velocity:</h3>
              <h4>{project && project.required_velocity}</h4>
            </div>
          </div>
        </div>

        <div className='body-wrapper epic-list' onDragOver={this.dragOver} onDrop={this.addEpicToProject.bind(this)}>
          <div className='row'>
            <div className='col-sm-1'>
              <div className='post-it-wrapper'>
                <div className='post-it meta'>
                  <h3>Epics</h3>
                </div>
              </div>
            </div>

            <div className='col-sm-11'>
              { project && project.epics.map((epic) => 
                  <EpicTitlePostIt key={`epic-${epic.id}`}
                    epic={epic}
                    origin='project' />
                )
              }
            </div>
          </div>
        </div>

        <div className='board' onDragOver={this.dragOver}>
          <div className='body-wrapper sprint-list'>
            {project && this.state.project.sprints.map((sprint) =>
                <RoadmapSprint  key={`sprint-${sprint.id}`}
                  sprint={sprint}
                  addEpicToSprint={addEpicToSprint.bind(this)} />
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectRoadmap;
