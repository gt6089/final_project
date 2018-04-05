import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/event';
import EventForm from './EventForm';
import axios from 'axios';

class EventEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: { ...this.props.event },
    };

    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators(eventActions, dispatch);

    this.saveEvent = this.saveEvent.bind(this);
    this.updateEventState = this.updateEventState.bind(this);
  }

  updateEventState(event) {
    const field = event.target.name;
    const newEvent = this.state.event;
    newEvent[field] = event.target.value;
    return this.setState({
      event: newEvent,
    });
  }

  saveEvent(event) {
    event.preventDefault();

    axios
      .put(`http://localhost:5000/api/events/${this.props.event.id}`, this.state.event)
      .then((updatedEvent) => {
        this.props.dispatch(eventActions.updateEvent(updatedEvent.data));
      })
      .then(() => {
        this.props.dispatch(eventActions.fetchAll());
        this.props.history.push('/events');
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Edit event</h1>
        <EventForm
          {...this.boundActionCreators}
          event={this.state.event}
          onSave={this.saveEvent}
          onChange={this.updateEventState}
        />
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
    events,
  };
}

export default connect(mapStateToProps)(EventEdit);
