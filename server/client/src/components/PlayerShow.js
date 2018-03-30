import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PlayerShow extends Component {
  renderAttendance(events = []) {
    if (events.length > 0) {
      return events.map(event => (
        <tr key={event.id}>
          <td>
            <Link to={`/events/${event.id}`}>
              {event.date}
            </Link>
          </td>
          <td>{event.Attendance.status}</td>
        </tr>
      ));
    }
  }
  render() {
    const {
      id,
      first_name,
      last_name,
      phone,
      email,
      is_active,
      Events
    } = this.props.player;
    return (
      <div className="player-show">
        <div className="player-show-header">
          <h2>{first_name} {last_name}</h2>
          <h4>
            {phone}
          </h4>
          <h4>{email}</h4>
          <h3>Next session: Not responded</h3>
        </div>
        <div className="player-actions">
          <button className="button">Remind player to respond</button>
          <Link to={`/players/${id}/edit`} className="button">Edit player</Link>
          <button className="button">Make player inactive</button>
          <button className="button">Message player</button>
        </div>
        <div className="player-show-attendance">
        <h4>Attendance history</h4>
          <table className="stack">
            <thead>
              <tr>
                <th>Date</th>
                <th>Attended</th>
              </tr>
            </thead>
            <tbody>{
              this.renderAttendance(Events)
            }</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let player = {};
  console.log(ownProps.match.params);
  let players = state.players.players;
  let playerId = ownProps.match.params.id || '0';
  if (players.length > 0) {
    player = Object.assign({}, players.find(player => player.id == playerId));
  }
  console.log(player);
  return { player: player };
}

export default connect(mapStateToProps)(PlayerShow);
