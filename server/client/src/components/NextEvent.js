import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import EventStatusBar from './EventStatusBar';
import * as messageActions from '../actions/message';

class NextEvent extends Component {
  constructor(props) {
    super(props);
    this.remindPlayers = this.remindPlayers.bind(this);
  }

  remindPlayers() {
    this.props.dispatch(messageActions.remindPlayers({
      id: this.props.nextEvent.id,
      type: 'reminder',
    }));
    this.props.history.push('/events');
  }
  
  render() {
    const { nextEvent } = this.props;
    return (
      <div className="next-event">
        <h3>Next event: {moment(nextEvent.date).format('MMMM Do YYYY')}</h3>
        <EventStatusBar event={nextEvent} />
        <div className="expanded button-group">
          <Link to={`/events/${nextEvent.id}`} className="button">
            See responses
          </Link>
          <button onClick={this.remindPlayers} type="button" className="button">
            Remind players to respond
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.events.nextEvent);
  if (state.events.nextEvent) {
    return {
      nextEvent: state.events.nextEvent,
    };
  }
  return {
    nextEvent: {},
  };
}

export default connect(mapStateToProps)(NextEvent);
