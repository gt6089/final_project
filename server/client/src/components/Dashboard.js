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
        <NextEvent />
        <hr />
        <Link to={'/events'} className="button expanded">Events</Link>
        <Link to={'/players'} className="button expanded">Players</Link>
        <Link to={'/messages'} className="button expanded">Messages</Link>
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
