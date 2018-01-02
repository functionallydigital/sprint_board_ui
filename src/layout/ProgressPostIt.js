import React, { Component } from 'react';
import { pluralize } from '../helpers/languageHelper';

class ProgressPostIt extends Component {
  render() {
    const progress = this.props.progress;
    const type = this.props.type;
    const partSingular = this.props.partSingular;
    const partPlural = this.props.partPlural;
    return (
      <div className='post-it-wrapper'>
        <div className={`post-it ${type}`}>
          <h4 className='capitalize'>{type} progress</h4>

          { progress && progress.map((status, index) => 
            <p key={index}>{status.status_name}: {status.count} {pluralize(partSingular, partPlural, status.count)}</p>
          )}
        </div>
      </div>
    )
  }
}

export default ProgressPostIt;
