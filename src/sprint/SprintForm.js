import React, { Component } from 'react';

class SprintForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprint: {
        id: null,
        start_date: '',
        end_date: '',
        points: ''
      }
    }
  }

  componentWillMount() {
    if (this.props.sprint.id) {
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

  isEditable() {
    if (this.state.sprint) {
      return new Date(this.state.sprint.start_date).getTime() > new Date().getTime() || this.state.sprint.id === null;
    } else {
      return false;
    }
  }

  render() {
    const isEditable = this.isEditable();
    const sprint = this.state.sprint;
    return (
      <div className='sprint-form'>
        { sprint && 
          <div className='post-it meta'>
            <div className='row form-row'>
              <div className='col-sm-4'>
                <label>
                  Start Date
                </label>
              </div>

              <div className='col-sm-8'>
                { isEditable &&
                  <input type='date' value={this.state.sprint.start_date}
                     name='start_date' onChange={this.handleChange.bind(this)} />
                }
                { !isEditable &&
                  <input type='date' value={this.state.sprint.start_date}
                     name='start_date' onChange={this.handleChange.bind(this)} disabled />
                }
              </div>
            </div>

            <div className='row form-row'>
              <div className='col-sm-4'>
                <label>
                  End Date
                </label>
              </div>

              <div className='col-sm-8'>
                { isEditable &&
                  <input type='date' value={this.state.sprint.end_date}
                     name='end_date' onChange={this.handleChange.bind(this)} />
                }
                { !isEditable &&
                  <input type='date' value={this.state.sprint.end_date}
                     name='end_date' onChange={this.handleChange.bind(this)} disabled />
                }
              </div>
            </div>


            <div className='row form-row'>
              <div className='col-sm-4'>
                <label>
                  Velocity
                </label>
              </div>

              <div className='col-sm-8'>
                { isEditable &&
                  <input type='number' value={this.state.sprint.points}
                     name='points' onChange={this.handleChange.bind(this)} />
                }
                { !isEditable &&
                  <input type='number' value={this.state.sprint.points}
                     name='points' onChange={this.handleChange.bind(this)} disabled />
                }
              </div>
            </div>

            { sprint.actual_points &&
              <div className='row form-row'>
                <div className='col-sm-4'>
                  <label>
                    Actual story points
                  </label>
                </div>

                <div className='col-sm-8'>
                  <p>{ sprint.actual_points}</p>
                </div>
              </div>
            }

            { isEditable &&
              <div>
                <button className='post-it button clickable' onClick={this.saveChanges.bind(this)}>{this.props.submitButton}</button>

                {this.props.cancelButton &&
                  <button className='post-it button clickable right' onClick={this.props.cancel}>{this.props.cancelButton}</button>
                }
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default SprintForm;