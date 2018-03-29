import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/event';
import EventForm from './EventForm';

class EventNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        date: '',
        start_time: '',
        end_time: '',
        deadline: '',
        location: '',
        min_attendees: 1,
        max_attendees: 10,
        inviteMsg: '',
        yesMsg: '',
        noMsg: '',
        maybeMsg: ''
      },
      saving: false
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
      event: newEvent
    });
  }

  saveEvent(event) {
    console.log('hitting save event');
    console.log(this.state.event);
    event.preventDefault();
    this.props.dispatch(eventActions.createEvent(this.state.event));
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


export default connect()(EventNew);
