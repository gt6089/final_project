import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class EventShow extends Component {
  renderResponses(players = []) {
    if (players.length > 0) {
      return players.map(player => (
        <tr key={player.id}>
          <td>
            <Link to={`/players/${player.id}`}>
              {player.first_name} {player.last_name}
            </Link>
          </td>
          <td>{player.phone}</td>
          <td>{player.email}</td>
          <td>{player.Attendance.status}</td>
        </tr>
      ));
    }
    return (
      <tr>
        <td>No responses</td>
      </tr>
    );
  }
  render() {
    const {
      date,
      start_time,
      end_time,
      deadline,
      location,
      min_attendees,
      max_attendees,
      inviteMsg,
      Players,
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
          <div className="progress-bar" />
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
          <table className="stack">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>{this.renderResponses(Players)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let event = {};
  const events = state.events.events;
  const eventId = ownProps.match.params.id;

  if (eventId && events.length > 0) {
    event = Object.assign({}, events.find(event => event.id == eventId));
  }

  return { event };
}

export default connect(mapStateToProps)(EventShow);
