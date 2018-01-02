import React, { Component } from 'react';

class SprintOverviewPostIt extends Component {
  render() {
    return (
      <div className='post-it meta clickable'>
        { this.props.sprint_start && 
          <div>
            <h3>Current Sprint</h3>

            <p>Start date: {this.props.sprint_start}</p>

            <p>End date: {this.props.sprint_end}</p>

            <p>Completion: {this.props.sprint_completion}</p>
          </div>
        }

        { !this.props.sprint_start && 
          <div>
            <h3>Current Sprint</h3>

            <p>There is currently no active sprint on this project</p>
          </div>
        }
      </div>
    )
  }
}

export default SprintOverviewPostIt;