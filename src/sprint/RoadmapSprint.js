import React, { Component } from 'react';
import EpicTitlePostIt from '../epic/EpicTitlePostIt';

class RoadmapSprint extends Component {
  render() {
    const sprint = this.props.sprint;
    return (
      <div className='sprint'>
        <div className='post-it-wrapper'>
          <div className='post-it meta'>
            <p className='sprint-dates'><strong>
              {sprint.start_date} - {sprint.end_date}
            </strong></p>

            <p>Estimate: { sprint.estimate }</p>
          </div>
        </div>

        <div className='sprint-epics' onDrop={this.props.addEpicToSprint.bind(null, sprint.id)}>
          { sprint.epics.map((epic) => 
              <EpicTitlePostIt key={`sprint-epic-${epic.id}`}
                epic={epic}
                origin='sprint'
                originId={sprint.id - 1} />
            )
          }
        </div>
      </div>
    )
  }
}

export default RoadmapSprint;
