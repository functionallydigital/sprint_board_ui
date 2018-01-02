import React, { Component } from 'react';

class ConfigProgressStepPostIt extends Component {
  render() {
    return (
      <div className='post-it-wrapper'>
        <div draggable='true' className='post-it step'>
          <h4>{this.props.step.name}</h4>
        </div>
      </div>
    )
  }
}

export default ConfigProgressStepPostIt;