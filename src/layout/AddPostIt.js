import React, { Component } from 'react';
import AddIcon from '../assets/images/add-icon.png';

class AddProjectPostIt extends Component {
  render() {
    const width = this.props.width;
    const openAdd = this.props.openAdd;
    const type = this.props.type;
    const title = this.props.title;
    return (
      <div className={`post-it-wrapper col-sm-${width}`}>
        <div onClick={openAdd} className={`post-it ${type} clickable`}>
          <h4>{title}</h4>

          <div className='add-icon'>
            <img src={AddIcon} alt='Add icon' />
          </div>
        </div>
      </div>
    )
  }
}

export default AddProjectPostIt;