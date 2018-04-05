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
    return <h5 className="light-text">Nothing found</h5>;
  }

  checkNextEventAttendance(pagePlayer = {}, nextEvent = {}) {
    console.log('check event attendance - pagePlayer', pagePlayer);
    console.log('check event attendance - nextEvent', nextEvent);
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
    console.log('inactivating player');
    const status = !this.props.player.isActive;
    console.log('switch to', status);
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
        console.log('deleted:', deletedPlayer.data);

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
            {first_name} {last_name} <small>{isActive ? 'Active' : 'Inactive'}</small>
          </h1>
          <h4 className="light-text">{phone}</h4>
          <h4 className="light-text">{email}</h4>
          <h3>
            Next event:{' '}
            <span className="light-text">
              {this.checkNextEventAttendance(this.props.player, this.props.nextEvent)}
            </span>
          </h3>
        </div>
        <div className="player-actions mt mb">
          <button className="button expanded">Remind player to respond</button>
          <Link to={`/players/${id}/edit`} className="button expanded">
            Edit player
          </Link>
          <button onClick={this.togglePlayerActive} className="button expanded">
            Make player {isActive ? 'inactive' : 'active'}
          </button>
          <button onClick={this.deletePlayer} className="button expanded">
            Delete player
          </button>
          <Link
            to={{
              pathname: '/messages/new',
              state: {
                player,
              },
            }}
            className="button expanded"
          >
            Message player
          </Link>
        </div>
        <div className="player-show-attendance">
          <h4>Attendance history</h4>
          <table>
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
  console.log(ownProps.match.params);
  const players = state.players.players;
  const playerId = ownProps.match.params.id || '0';
  if (players.length > 0) {
    player = Object.assign({}, players.find(player => player.id == playerId));
  }
  if (state.events.nextEvent) {
    nextEvent = state.events.nextEvent;
  }
  console.log(player);
  return {
    player,
    nextEvent,
  };
}

export default withRouter(connect(mapStateToProps)(PlayerShow));
