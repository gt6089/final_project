import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class EventIndex extends Component {
  sortEvents(raw) {
    return raw.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateA - dateB;
    });
  }
  render() {
    const events = this.props.events;
    return (
      <div>
        <h1>Events</h1>
        <div className="next-event">
          <h3>Next event: Monday March 12</h3>
          <button className="button">See responses</button>
          <button className="button">Send reminder</button>
        </div>
        <div className="event-actions">
          <Link to="/events/new" className="button">
            Create event
          </Link>
        </div>
        <div className="event-list">
          {events && events.map(event => (
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
  events: state.events.events,
});

export default connect(mapStateToProps)(EventIndex);