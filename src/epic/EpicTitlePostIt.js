import React, { Component } from 'react';

class EpicTitlePostIt extends Component {
  drag(event) {
    event.dataTransfer.setData('epic', JSON.stringify(this.props.epic))
    event.dataTransfer.setData('origin', JSON.stringify(this.props.origin))
    event.dataTransfer.setData('originId', JSON.stringify(this.props.originId))
  }

  render() {
    const epic = this.props.epic;
    return(
      <div className='epic-title'>
        <div className='post-it-wrapper'>
          <div className='post-it epic clickable' draggable='true' onDragStart={this.drag.bind(this)}>
            <h3>{epic.name}</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default EpicTitlePostIt;
