import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/event';
import * as messageActions from '../actions/message';
import * as playerActions from '../actions/message';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventStatusBar from './EventStatusBar';
import moment from 'moment';
import axios from 'axios';

class EventShow extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.makeEventCurrent = this.makeEventCurrent.bind(this);
    this.invitePlayers = this.invitePlayers.bind(this);
    this.remindPlayers = this.remindPlayers.bind(this);
  }

  renderResponses(players = []) {
    console.log('rendering players', players);
    if (players.length > 0) {
      return players.map(player => (
        <tr key={player.id}>
          <td>
            <Link to={`/players/${player.id}`}>
              {player.first_name} {player.last_name}
            </Link>
          </td>
          <td>{player.phone}</td>
          <td>{player.Attendance.status}</td>
        </tr>
      ));
    }
    return (
      <tr>
        <td>No one has been invited</td>
      </tr>
    );
  }

  deleteEvent(event) {
    event.preventDefault();

    console.log('hitting delete event');
    console.log('this.props.event', this.props.event);
    const { id } = this.props.event;
    console.log('event id', id);
    axios
      .delete(`http://localhost:5000/api/events/${id}`)
      .then((deletedEvent) => {
        console.log('deleted:', deletedEvent);
        this.props.dispatch(eventActions.deleteEvent(deletedEvent.data));
      }).then(() => this.props.history.push('/events'))
      .catch((err) => {
        throw new Error(err);
      });
  }

  makeEventCurrent() {
    axios
      .put('http://localhost:5000/api/events')
      .then(updatedEvents => this.props.dispatch(eventActions.bulkUpdateEvents(updatedEvents.data)))
      .then(() =>
        axios
          .put(`http://localhost:5000/api/events/${this.props.event.id}`, {
            id: this.props.event.id,
            is_current: true,
          })
          .then(updatedEvent => this.props.dispatch(eventActions.updateEvent(updatedEvent.data)))
          .then(() => this.props.dispatch(eventActions.getNextEvent())));
  }

  invitePlayers() {
    axios
      .post('http://localhost:5000/api/messages', {
        event: this.props.event.id,
        type: 'invite',
      })
      .then((messages) => {
        this.props.dispatch(messageActions.updateMessages(messages.data));
      })
      .then(() => this.props.dispatch(messageActions.fetchAll()))
      .then(() => this.props.dispatch(playerActions.fetchAll()))
  }

  remindPlayers() {
    this.props.dispatch(messageActions.remindPlayers({
      event: this.props.event.id,
      type: 'reminder',
    }));
    this.props.history.push('/events');
  }

  render() {
    const { event } = this.props;

    const {
      id, location, min_attendees, max_attendees, inviteMsg, Players,
    } = event;

    const date = moment(event.date).format('dddd MMMM Do YYYY');
    const dateTimeStart = new Date(`${event.date} ${event.start_time}`);
    const formattedStartTime = moment(dateTimeStart).format('h:mm a');
    const end_time = moment(event.end_time).format('h:mm a');
    const dateTimeEnd = new Date(`${event.date} ${event.end_time}`);
    const formattedEndTime = moment(dateTimeEnd).format('h:mm a');
    const deadline_date = event.deadline_date;
    const formattedDeadlineDate = moment(deadline_date).format('dddd MMMM Do');
    const deadlineDateTime = new Date(`${deadline_date} ${event.deadline_time}`);
    const formattedDeadlineTime = moment(deadlineDateTime).format('h:mm a');

    return (
      <div className="event-show grid-y grid-margin-y">
        <div className="event-show-header cell">
          <h1>{date}</h1>
          <h3 className="light-text">
            {formattedStartTime} - {formattedEndTime} @ {location}
          </h3>
        </div>
        <div className="cell">
          <EventStatusBar event={this.props.event} />
        </div>
        <div className="cell">
          <h5>
            # of attendees:{' '}
            <span className="light-text">
              Min {min_attendees} / max {max_attendees}
            </span>
          </h5>
          <h5>
            RSVP deadline:{' '}
            <span className="light-text">
              {formattedDeadlineDate} @ {formattedDeadlineTime}
            </span>
          </h5>
        </div>
        <div>
          <button onClick={this.makeEventCurrent} className="button expanded">
            Set this as next event
          </button>
          <Link to={`/events/${id}/edit`} className="button expanded">
            Edit event
          </Link>
          <button onClick={this.deleteEvent} className="alert button expanded">
            Delete event
          </button>
        </div>
        <div className="event-show-responses cell">
          <h2>Players</h2>
          <div>
            <button onClick={this.invitePlayers} className="button expanded">
              Invite all players to event
            </button>
            <button onClick={this.remindPlayers} className="button expanded">
              Remind players to respond
            </button>
            <Link
              to={{
                pathname: '/messages/new',
                state: {
                  event,
                },
              }}
              className="button expanded"
            >
              Message players about this event
            </Link>
          </div>
          <h4>Responses</h4>
          <table className="stack">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
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

  return {
    event,
  };
}

export default connect(mapStateToProps)(EventShow);
