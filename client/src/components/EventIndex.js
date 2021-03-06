import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventStatusBar from './EventStatusBar';
import moment from 'moment';
import NextEvent from './NextEvent';

class EventIndex extends Component {
  sortEvents(raw) {
    return raw.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  }
  render() {
    const events = this.sortEvents(this.props.events);
    return (
      <div>
        <h1>Events</h1>
        <NextEvent />
        <hr style={{marginBottom: '0.4em'}}/>
        <div className="event-actions">
          <Link to="/events/new" className="button">
            Create event
          </Link>
        </div>
        <div className="event-list">
          {events &&
            events.map(event => (
              <div key={event.id} className="box">
                <Link to={`/events/${event.id}`}>{event.date}</Link>
                <p>
                  {event.start_time} - {event.end_time} @ {event.location}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  nextEvent: state.events.nextEvent,
});

export default connect(mapStateToProps)(EventIndex);
