import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/event';
import * as messageActions from '../actions/message';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventStatusBar from './EventStatusBar';
import moment from 'moment';

class EventShow extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.makeEventCurrent = this.makeEventCurrent.bind(this);
    this.invitePlayers = this.invitePlayers.bind(this);
    this.remindPlayers = this.remindPlayers.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(eventActions.fetchAttendance(this.props.match.params.id));
  }

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

    this.props.dispatch(eventActions.deleteEvent(this.props.event));

    this.props.history.push('/events');
  }

  makeEventCurrent() {
    this.props.dispatch(eventActions.bulkUpdateEvents());
    this.props.dispatch(eventActions.updateEvent({
      id: this.props.event.id,
      is_current: true
    }))
  }

  invitePlayers() {
    this.props.dispatch(messageActions.invitePlayers({
      id: this.props.event.id,
      type: 'invite'
    }))
    this.props.history.push('/events')
  }

  remindPlayers() {
    this.props.dispatch(messageActions.remindPlayers({
      id: this.props.event.id,
      type: 'reminder'
    }))
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
          <h2>{date}</h2>
          <h4>
            {formattedStartTime} - {formattedEndTime} @ {location}
          </h4>
        </div>
        <div className="cell">
          <EventStatusBar event={this.props.event} />
        </div>
        <div className="cell">
          <h5>
            RSVP deadline: {formattedDeadlineDate} @ {formattedDeadlineTime}
          </h5>
        </div>
        <div>
          <button onClick={this.makeEventCurrent} className="button expanded">
            Set this as current event
          </button>
          <button onClick={this.invitePlayers} className="button expanded">
            Invite all players to event
          </button>
          <button onClick={this.remindPlayers} className="button expanded">
            Remind players to respond
          </button>
          <Link to={`/events/${id}/edit`} className="button expanded">
            Edit event
          </Link>
          <button onClick={this.deleteEvent} className="button expanded">
            Delete event
          </button>
        </div>
        <div className="event-show-responses cell">
          <h3>Responses</h3>
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
