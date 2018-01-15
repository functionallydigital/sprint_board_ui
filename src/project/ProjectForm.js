import React, { Component } from 'react';
import ConfigProgressStepPostIt from '../sprint/ConfigProgressStepPostIt';
import AddPostIt from '../layout/AddPostIt';
import StepAdder from '../sprint/StepAdder';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        sprint_length: ''
      },
      showStepAdder: false
    }
  }

  componentWillMount() {
    if (this.props.project) {
      this.setState({project: this.props.project})
    }
  }

  handleChange(event) {
    let field = event.target;
    let fieldName = field.name;
    const project = this.state.project
    project[fieldName] = field.value;
    this.setState({project: project})
  }

  saveChanges() {
    this.props.save(this.state.project);
  }

  toggleStepAdder() {
    this.setState({showStepAdder: !this.state.showStepAdder})
  }

  updateStepsList(step) {
    let project = this.state.project;
    project.steps.push(step);
    this.setState({project: project})
  }

  render() {
    return (
      <div className='project-edit'>
        { this.state.showStepAdder &&
          <StepAdder projectId={this.state.project.id}
            session={this.props.session}
            updateStepsList={this.updateStepsList.bind(this)}
            closeStepAdder={this.toggleStepAdder.bind(this)} />
        }
        <div className='row'>
          <div className='col-sm-6 post-it-wrapper'>
            <div className='post-it meta'>
              <h2>Project Core Settings</h2>

              <div className='row form-row'>
                <div className='col-sm-6'>
                  <label>
                    Project Name
                  </label>
                </div>

                <div className='col-sm-6'>
                  <input type='text' value={this.state.project.name}
                       name='name' onChange={this.handleChange.bind(this)} />
                </div>
              </div>

              <div className='row form-row'>
                <div className='col-sm-6'>
                  <label>
                    Project Description
                  </label>
                </div>

                <div className='col-sm-6'>
                  <input type='text' value={this.state.project.description}
                       name='description' onChange={this.handleChange.bind(this)} />
                </div>
              </div>

              <div className='row form-row'>
                <div className='col-sm-6'>
                  <label>
                    Project Start Date
                  </label>
                </div>

                <div className='col-sm-6'>
                  <input type='date' value={this.state.project.start_date}
                       name='start_date' onChange={this.handleChange.bind(this)} />
                </div>
              </div>

              <div className='row form-row'>
                <div className='col-sm-6'>
                  <label>
                    Project End Date
                  </label>
                </div>

                <div className='col-sm-6'>
                  <input type='date' value={this.state.project.end_date}
                       name='end_date' onChange={this.handleChange.bind(this)} />
                </div>
              </div>
            </div>
          </div>

          <div className='col-sm-6 post-it-wrapper'>
            <div className='post-it meta'>
              <h2>Project Sprint Settings</h2>

              <div className='row form-row'>
                <div className='col-sm-6'>
                  <label>
                    Project Sprint Length
                  </label>
                </div>

                <div className='col-sm-6'>
                  <input type='number' value={this.state.project.sprint_length}
                       name='sprint_length' onChange={this.handleChange.bind(this)} />
                </div>
              </div>

              <div>
                <h3>Progress Steps</h3>
              </div>

              <div className='row form-row'>
                <div className='col-sm-6'>
                  {this.state.project.steps && this.state.project.steps.map((step) =>
                    <ConfigProgressStepPostIt key={step.id}
                      draggable='true'
                      step={step} />
                  )}
                </div>

                <AddPostIt width='4 col-sm-offset-1'
                  type='step'
                  title='Add new step'
                  openAdd={this.toggleStepAdder.bind(this)} />
              </div>

              <div className='row'>
                <div className='col-xs-12'>
                  <button onClick={this.saveChanges.bind(this)} className='post-it button clickable right'>{this.props.buttonText}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectForm;