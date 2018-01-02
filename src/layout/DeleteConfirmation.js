import React, { Component } from 'react';

class DeleteConfirmation extends Component {
  render() {
    return (
      <div className='pop-up--cover'>
        <div className='col-sm-5 col-xs-10 pop-up--wrapper'>
          <div className='post-it meta'>
            <h2>
              Are you sure you want to delete {this.props.message}?
            </h2>

            <div className='row'>
              <div className='col-xs-12'>
                <div className='post-it button fitted clickable' onClick={this.props.delete}>
                  Confirm
                </div>

                <div className='post-it button fitted clickable right' onClick={this.props.cancel}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DeleteConfirmation;