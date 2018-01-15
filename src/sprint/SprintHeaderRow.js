import React, { Component } from 'react';
import ConfigProgressStepPostIt from '../sprint/ConfigProgressStepPostIt';

class SprintHeaderRow extends Component {
  render() {
    const steps = this.props.steps;
    return(
      <div className='header-row'>
        <div className='step-list'>
          { steps.map((step) => 
            <div key={step.id} className='stage'>
              <ConfigProgressStepPostIt draggable='false'
                      step={step} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SprintHeaderRow;