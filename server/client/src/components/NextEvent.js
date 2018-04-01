import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import EventStatusBar from './EventStatusBar';

class NextEvent extends Component {
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
          <button type="button" className="button">
            Send reminder
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
