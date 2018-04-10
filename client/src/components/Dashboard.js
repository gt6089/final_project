import React, { Component } from 'react';
import EventStatusBar from './EventStatusBar';
import { connect } from 'react-redux';
import moment from 'moment';
import NextEvent from './NextEvent';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
      <h3 className="mb title is-3">Welcome to RecRun!</h3>
        <NextEvent />
        <hr />
        <Link to={'/events'} className="button is-fullwidth">Events</Link>
        <Link to={'/players'} className="button is-fullwidth">Players</Link>
        <Link to={'/messages'} className="button is-fullwidth">Messages</Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    nextEvent: state.events.nextEvent,
  };
}

export default connect(mapStateToProps)(Dashboard);
