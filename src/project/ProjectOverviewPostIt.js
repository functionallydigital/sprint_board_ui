import React, { Component } from 'react';

class ProjectOverviewPostIt extends Component {
  render() {
    return (
      <div onClick={this.props.editProject} className='post-it meta clickable'>
        <h2>{this.props.name}</h2>

        <p>{this.props.description}</p>
        
        <p>Start date: {this.props.startDate}</p>

        <p>End date: {this.props.endDate}</p>
      </div>
    )
  }
}

export default ProjectOverviewPostIt;