import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventShow extends Component {
  render() {
    const {
      date,
      start_time,
      end_time,
      deadline,
      location,
      min_attendees,
      max_attendees,
      inviteMsg
    } = this.props.event;
    return (
      <div className="event-show">
        <div className="event-show-header">
          <h2>{date}</h2>
          <h4>
            {start_time} - {end_time}
          </h4>
          <h4>{location}</h4>
        </div>
        <div className="event-show-progress">
          <div className="progress-bar">
          </div>
          <span>Yes</span>
          <span>No</span>
          <span>Maybe</span>
          <span>N/R</span>
        </div>
        <div>
        <p>Deadline: {deadline}</p>
        </div>
        <div>
          <button className="button">Edit event</button>
        </div>
        <div className="event-show-responses">
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let event = {};
  console.log(ownProps.match.params);
  let events = state.events.events.data;
  let eventId = ownProps.match.params.id || '0';
  if (events.length > 0) {
    event = Object.assign({}, events.find(event => event.id == eventId));
  }
  console.log(event);
  return { event: event };
}

export default connect(mapStateToProps)(EventShow);
