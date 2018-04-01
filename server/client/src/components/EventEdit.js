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
    console.log(this.boundActionCreators);

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
    console.log('hitting saveEvent');
    console.log('this.state.event', this.state.event);

    event.preventDefault();

    // let currentState = this.props.players;
    console.log('props.event.id', this.props.event.id);
    axios
      .put(`http://localhost:5000/api/events/${this.props.event.id}`, this.state.event)
      .then((updatedEvent) => {
        console.log('updated event:', updatedEvent);

        this.props.dispatch(eventActions.updateEvent(updatedEvent.data));

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
  console.log('found event: ', event);

  return {
    event,
    events,
  };
}

export default connect(mapStateToProps)(EventEdit);
