import React, { Component } from 'react';

class BacklogUserPostIt extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className='post-it-wrapper'>
        <div className='post-it user clickable' onClick={this.props.openUserAssigner}>
          { user &&
            <h4>{user.name}</h4>
          }
          { !user &&
            <h4>Currently unassigned</h4>
          }
        </div>
      </div>
    )
  }
}

export default BacklogUserPostIt;