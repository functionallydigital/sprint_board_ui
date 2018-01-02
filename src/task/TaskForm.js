import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {}
    }
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({task: this.props.task})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.task !== nextProps.task) {
      this.setState({task: nextProps.task});
    }
  }

  handleChange(event) {
    let field = event.target;
    const task = this.state.task
    task[field.name] = field.value;
    this.setState({task: task})
  }

  saveChanges() {
    this.props.save(this.state.task);
  }

  render() {
    return (
      <div className='task-form'>
        <div className='row'>
          <div className='col-sm-8'>

            <div className='row form-row'>
              <div className='col-sm-4'>
                <label>
                  Task Name
                </label>
              </div>

              <div className='col-sm-8'>
                <input type='text' value={this.state.task.title}
                     name='title' onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className='row form-row'>
              <div className='col-sm-4'>
                <label>
                  Description
                </label>
              </div>

              <div className='col-sm-8'>
                <input type='text' value={this.state.task.description}
                     name='description' onChange={this.handleChange.bind(this)} />
              </div>
            </div>
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

export default TaskForm;