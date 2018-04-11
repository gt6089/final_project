import React, { Component } from 'react';
import * as playerActions from '../actions/player';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class PlayerShow extends Component {
  constructor(props) {
    super(props);
    this.deletePlayer = this.deletePlayer.bind(this);
    this.togglePlayerActive = this.togglePlayerActive.bind(this);
    this.checkNextEventAttendance = this.checkNextEventAttendance.bind(this);
  }

  renderAttendance(events = []) {
    if (events.length > 0) {
      return events.map(event => (
        <tr key={event.id}>
          <td>
            <Link to={`/events/${event.id}`}>{event.date}</Link>
          </td>
          <td>{event.Attendance.status}</td>
        </tr>
      ));
    }
    return <h5 className="light-text mt">Nothing found</h5>;
  }

  checkNextEventAttendance(pagePlayer = {}, nextEvent = {}) {
    if (nextEvent.Players) {
      if (nextEvent.Players.length < 1) {
        return 'Not invited';
      }
      let status = '';
      nextEvent.Players.forEach((player) => {
        if (player.id === pagePlayer.id) {
          switch (player.Attendance.status) {
            case 'YES':
              status = 'Yes';
              break;
            case 'NO':
              status = 'No';
              break;
            case 'MAYBE':
              status = 'Maybe';
              break;
            case 'INVITED':
              status = 'Not responded';
              break;
            default:
              status = 'Not invited';
              break;
          }
        } else {
          status = 'Not invited';
        }
      });
      return status;
    }
  }

  togglePlayerActive(event) {
    event.preventDefault();

    const status = !this.props.player.isActive;

    this.props.dispatch(playerActions.updatePlayer({
      id: this.props.player.id,
      isActive: status,
    }));
    this.props.history.push('/players');
  }

  deletePlayer(event) {
    event.preventDefault();

    axios
      .delete(`http://localhost:5000/api/players/${this.props.player.id}`)
      .then((deletedPlayer) => {
        this.props.dispatch(playerActions.deletePlayer(deletedPlayer.data));

        this.props.history.push('/players');
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    const { player } = this.props;
    const {
      id, first_name, last_name, phone, email, isActive, Events,
    } = this.props.player;
    return (
      <div className="player-show">
        <div className="player-show-header">
          <h1>
            {first_name} {last_name}{' '}
            <span className="small has-text-weight-light">{isActive ? 'Active' : 'Inactive'}</span>
          </h1>
          <h5 className="light-text">{phone}</h5>
          <h5 className="light-text">{email}</h5>
          <h4 className="mt">
            Next event:{' '}
            <span className="light-text">
              {this.checkNextEventAttendance(this.props.player, this.props.nextEvent)}
            </span>
          </h4>
        </div>
        <div className="player-actions mt">
          <button className="button is-fullwidth">Remind player to respond</button>
          <Link to={`/players/${id}/edit`} className="button is-fullwidth">
            Edit player
          </Link>
          <button onClick={this.togglePlayerActive} className="button is-fullwidth">
            Make player {isActive ? 'inactive' : 'active'}
          </button>
          <button onClick={this.deletePlayer} className="button is-fullwidth">
            Delete player
          </button>
          <Link
            to={{
              pathname: '/messages/new',
              state: {
                player,
                event: null
              },
            }}
            className="button is-fullwidth"
          >
            Message player
          </Link>
        </div>
        <div className="player-show-attendance">
          <h4 className="mt">Attendance history</h4>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{this.renderAttendance(Events)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let player = {};
  let nextEvent = {};

  const players = state.players.players;
  const playerId = ownProps.match.params.id || '0';
  if (players.length > 0) {
    player = Object.assign({}, players.find(player => player.id == playerId));
  }
  if (state.events.nextEvent) {
    nextEvent = state.events.nextEvent;
  }

  return {
    player,
    nextEvent,
  };
}

export default withRouter(connect(mapStateToProps)(PlayerShow));
