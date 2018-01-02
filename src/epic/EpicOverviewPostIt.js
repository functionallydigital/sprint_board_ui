import React, { Component } from 'react';

class EpicOverviewPostIt extends Component {
  openEpic() {
    this.props.openEpic(this.props.id);
  }

  render() {
    return (
      <div className='col-md-4 col-sm-6 post-it-wrapper'>
        <div className='post-it epic clickable' onClick={this.openEpic.bind(this)}>
          <h4>{this.props.name}</h4>
          
          <p>Priority: {this.props.priority}</p>

          <p>Number of stories: {this.props.storyCount}</p>
        </div>
      </div>
    )
  }
}

export default EpicOverviewPostIt;