import React, { Component } from 'react';

class EventIndex extends Component {
  renderContent() {
    const events = this.props.events;
    events.forEach(function(event) {
      <div className="card" style="width: 300px;">
        <div className="card-section">
          <h4>{event.date}</h4>
          <p>
            {event.start_time} - {event.end_time} @ {event.location}
          </p>
        </div>
      </div>;
    });
  }
  render() {
    return (
      <div>
        <h2>Events</h2>
        {
          this.renderContent()
        }
      </div>
    );
  }
}

export default EventIndex;
