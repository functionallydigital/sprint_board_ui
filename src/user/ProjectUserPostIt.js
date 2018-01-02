import React, { Component } from 'react';

class ProjectUserPostIt extends Component {
  render() {
    return (
      <div className='col-md-4 col-sm-6 post-it-wrapper'>
        <div className='post-it user clickable'>
          <h4>{this.props.name}</h4>
          
          <p>Role: {this.props.role}</p>
        </div>
      </div>
    )
  }
}

export default ProjectUserPostIt;