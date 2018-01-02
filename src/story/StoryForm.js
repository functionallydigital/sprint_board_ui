import React, { Component } from 'react';
import Select from 'react-select';

class StoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: {}
    }
  }

  componentWillMount() {
    if (this.props.story) {
      this.setState({story: this.props.story})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.story !== nextProps.story) {
      this.setState({story: nextProps.story});
    }
  }

  handleChange(event) {
    let field = event.target;
    const story = this.state.story
    story[field.name] = field.value;
    this.setState({story: story})
  }

  handlePriorityChange(selectedPriority) {
    let story = this.state.story;
    story.priority = selectedPriority;
    this.setState({story: story });
  }

  saveChanges() {
    this.props.save(this.state.story);
  }

  render() {
    const prioritiesList = this.props.priorities;
    return (
      <div className='story-form'>
        <div className='row'>
          <div className='col-sm-6'>

            <div className='row form-row'>
              <div className='col-sm-4'>
                <label>
                  Story Name
                </label>
              </div>

              <div className='col-sm-8'>
                <input type='text' value={this.state.story.title}
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
                <input type='text' value={this.state.story.description}
                     name='description' onChange={this.handleChange.bind(this)} />
              </div>
            </div>
          </div>

          <div className='col-sm-6'>
            <div className='row form-row'>
              <div className='col-sm-4'>
                <label>
                  Priority
                </label>
              </div>

              <div className='col-sm-8'>
                <Select
                  name="priority"
                  value={this.state.story.priority.value}
                  onChange={this.handlePriorityChange.bind(this)}
                  options={prioritiesList}
                />
              </div>
            </div>

            <div className='row form-row'>
              <div className='col-sm-4'>
                <label>
                  Estimate
                </label>
              </div>

              <div className='col-sm-8'>
                <input type='number' value={this.state.story.estimate}
                     name='estimate' onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className='row form-row'>
              <div className='col-sm-4'>
                <label>
                  Acceptance criteria
                </label>
              </div>

              <div className='col-sm-8'>
                <input type='text' value={this.state.story.acceptance_criteria}
                     name='acceptance_criteria' onChange={this.handleChange.bind(this)} />
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

export default StoryForm;