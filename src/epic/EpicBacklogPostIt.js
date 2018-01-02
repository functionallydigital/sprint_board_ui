import React, { Component } from 'react';

class EpicBacklogPostIt extends Component {
  render() {
    return (
      <div className='post-it-wrapper'>
        <div className='post-it epic'>
          <h4>{this.props.name}</h4>
          
          <p>Priority: {this.props.priority}</p>
        </div>
      </div>
    )
  }
}

export default EpicBacklogPostIt;