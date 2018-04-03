import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/event';
import EventForm from './EventForm';
import axios from 'axios';
import { Redirect } from 'react-router';

class EventNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        date: '',
        start_time: '',
        end_time: '',
        deadline_date: '',
        deadline_time: '',
        location: '',
        min_attendees: 1,
        max_attendees: 10,
        inviteMsg: '',
        yesMsg: '',
        noMsg: '',
        maybeMsg: '',
      },
      saving: false,
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
    console.log('hitting save event');
    console.log('local event', this.state.event);
    event.preventDefault();

    let currentState = this.props.events;

    axios
      .post('http://localhost:5000/api/events', this.state.event)
      .then((createdEvent) => {
        console.log(createdEvent);

        currentState = [...currentState, createdEvent.data];

        console.log('currentState', currentState);

        this.props.dispatch(eventActions.createEvent(currentState));
        
        this.props.history.push('/events');
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Create event</h1>
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

function mapStateToProps(state) {
  return {
    events: state.events.events,
  };
}

export default connect(mapStateToProps)(EventNew);
