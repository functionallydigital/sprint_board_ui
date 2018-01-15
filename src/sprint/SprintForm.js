import React, { Component } from 'react';

class SprintForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprint: {}
    }
  }

  componentWillMount() {
    if (this.props.sprint) {
      this.setState({sprint: this.props.sprint})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sprint !== nextProps.sprint) {
      this.setState({sprint: nextProps.sprint});
    }
  }

  handleChange(event) {
    let field = event.target;
    const sprint = this.state.sprint
    sprint[field.name] = field.value;
    this.setState({sprint: sprint})
  }

  saveChanges() {
    this.props.save(this.state.sprint);
  }

  render() {
    return (
      <div className='sprint-form'>
        <div className='row form-row'>
          <div className='col-sm-4'>
            <label>
              Start Date
            </label>
          </div>

          <div className='col-sm-8'>
            <input type='date' value={this.state.sprint.start_date}
                 name='start_date' onChange={this.handleChange.bind(this)} />
          </div>
        </div>

        <div className='row form-row'>
          <div className='col-sm-4'>
            <label>
              End Date
            </label>
          </div>

          <div className='col-sm-8'>
            <input type='date' value={this.state.sprint.end_date}
                 name='end_date' onChange={this.handleChange.bind(this)} />
          </div>
        </div>


        <div className='row form-row'>
          <div className='col-sm-4'>
            <label>
              Velocity
            </label>
          </div>

          <div className='col-sm-8'>
            <input type='number' value={this.state.sprint.points}
                 name='points' onChange={this.handleChange.bind(this)} />
          </div>
        </div>

        <button className='post-it button clickable' onClick={this.saveChanges.bind(this)}>{this.props.submitButton}</button>

        {this.props.cancelButton &&
          <button className='post-it button clickable right' onClick={this.props.cancel}>{this.props.cancelButton}</button>
        }
      </div>
    )
  }
}

export default SprintForm;