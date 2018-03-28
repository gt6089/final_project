import React, { Component } from 'react';

class EventIndex extends Component {
  render() {
    const { events } = this.props;
    return (
      <div>
        <h2>Events</h2>
        {
          events.map(event => (
       <div className="card" style="width: 300px;">
        <div className="card-section">
          <h4>{event.date}</h4>
          <p>
            {event.start_time} - {event.end_time} @ {event.location}
          </p>
        </div>
      </div>           
          ))
        }
      </div>
    )
  }
}

function mapStateToProps({ events }) {
  return { events }; 
}

export default connect(mapStateToProps)(EventIndex);
