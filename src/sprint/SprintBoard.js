import React, { Component } from 'react';
import EpicTitlePostIt from '../epic/EpicTitlePostIt';
import { loadSprint } from '../api/SprintRequestHandler';

class SprintBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprint: null
    }
  }

  componentWillMount() {
    loadSprint(this.props.session, this.props.sprintId)
      .then((response) => {
        if (!response.error) {
          this.setState({sprint: response});
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    const sprint = this.state.sprint;
    return(
      <div className='sprint-board'>
        { sprint && 
          <div className='heading'>
            <div className='row'>
              <div className='post-it-wrapper col-sm-4'>
                <div className='post-it meta'>
                  <h2>Sprint: { sprint.start_date } - { sprint.end_date }</h2>
                  <p>Velocity: { sprint.points }</p>
                  <p>Completion: { sprint.completion }</p>
                </div>
              </div>

              <div className='epics-list col-sm-8'>
                <div className='row'>
                  <div className='col-md-2 col-sm-4'>
                    <div className='post-it-wrapper'>
                      <div className='post-it meta'>
                        <h3>Epics</h3>
                      </div>
                    </div>
                  </div>

                  <div className='col-sm-8 col-md-10'>
                    {sprint.epics.map((epic) => 
                        <EpicTitlePostIt key={`epic-${epic.id}`}
                          epic={epic}
                          draggable='false' />
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default SprintBoard;