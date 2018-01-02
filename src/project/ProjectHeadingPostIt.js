import React, { Component } from 'react';

class ProjectHeadingPostIt extends Component {
  render() {
    return (
      <div className='post-it meta'>
        <h2>{this.props.heading}</h2>
      </div>
    )
  }
}

export default ProjectHeadingPostIt;