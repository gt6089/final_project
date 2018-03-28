import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class EventIndex extends Component {
  render() {
    const { events } = this.props;
    return (
      <div>
        <h2>Events</h2>
        <div className="event-actions">
          <Link to='/events/new' className="button">Create event</Link>
        </div>
        <div className="event-list">
          {events.map(event => (
            <div key={event.id} className="card">
              <div className="card-section">
                <Link to={`/events/${event.id}`}>{event.date}</Link>
                <p>
                  {event.start_time} - {event.end_time} @ {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events.data
});

export default connect(mapStateToProps)(EventIndex);
