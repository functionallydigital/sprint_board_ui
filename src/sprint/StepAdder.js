import React, { Component } from 'react';
import { addProgressStep } from '../api/ProjectRequestHandler'

class StepAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepName: ''
    }
  }

  handleChange (event) {
    let field = event.target;
    this.setState({stepName: field.value });
  }

  createStep() {
    const that = this;
    addProgressStep(this.props.session, this.props.projectId, {stepName: this.state.stepName})
      .then((response) => {
        if (!response.error) {
          that.props.updateStepsList(response);
          that.props.closeStepAdder();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='user-assigner pop-up--cover'>
        <div className='col-sm-5 col-xs-10 pop-up--wrapper'>
          <div className='post-it step'>
            <h3>Add new step to </h3>

            <div className='row'>
              <div className='col-sm-8'>
                <div className='form-row'>
                  <input type='text' value={this.state.stepName}
                     name='name' onChange={this.handleChange.bind(this)} />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-xs-12'>
                <div className='post-it button fitted clickable' onClick={this.createStep.bind(this)}>
                  Add step
                </div>

                <div className='post-it button fitted clickable right' onClick={this.props.closeStepAdder}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StepAdder;
