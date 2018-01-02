import React, { Component } from 'react';
import Select from 'react-select';

class EpicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      epic: {
        name: '',
        priority: ''
      }
    }
  }

  componentWillMount() {
    if (this.props.epic) {
      this.setState({epic: this.props.epic})
    }
  }

  handleChange(event) {
    let field = event.target;
    let epic = this.state.epic;
    epic[field.name] = field.value;
    this.setState({epic: epic });
  }

  handlePriorityChange(selectedPriority) {
    let epic = this.state.epic;
    epic.priority = selectedPriority;
    this.setState({epic: epic });
  }

  saveChanges() {
    this.props.save(this.state.epic);
  }

  render() {
    const prioritiesList = this.props.priorities;
    return (
      <div>
        <div className='row form-row'>
          <div className='col-sm-8'>
            <label>Name:</label>
            <input type='text' value={this.state.epic.name}
               name='name' onChange={this.handleChange.bind(this)} />
          </div>
        </div>

        <div className='row form-row'>
          <div className='col-sm-8'>
            <label>Priority:</label>
            <Select
              name="priority"
              value={this.state.epic.priority.value}
              onChange={this.handlePriorityChange.bind(this)}
              options={prioritiesList}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <div className='post-it button fitted clickable' onClick={this.saveChanges.bind(this)}>
              {this.props.submitButton}
            </div>

            <div className='post-it button fitted clickable right' onClick={this.props.cancel}>
              {this.props.cancelButton}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EpicForm;