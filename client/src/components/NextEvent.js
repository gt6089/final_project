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

    this.renderContent = this.renderContent.bind(this);
  }

  remindPlayers() {
    this.props.dispatch(messageActions.remindPlayers({
      event: this.props.nextEvent.id,
      type: 'reminder',
    }));
  }

  renderContent() {
    const { nextEvent } = this.props;

    if (nextEvent) {
      return (
        <div>
          <h4 className="title is-4">Next event: {moment(nextEvent.date).format('MMMM Do YYYY')}</h4>
          <EventStatusBar event={nextEvent} />
          <div className="level field is-grouped">
            <Link to={`/events/${nextEvent.id}`} type="button" className="button level-item">
              See responses
            </Link>
            <button onClick={this.remindPlayers} type="button" className="button level-item">
              Remind players
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2 className="title is-2">You haven't set up any events yet</h2>
      </div>
    );
  }

  render() {
    return <div className="next-event box">{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  if (state.events.nextEvent) {
    return {
      nextEvent: state.events.nextEvent,
    };
  }
  return {
    nextEvent: null,
  };
}

export default connect(mapStateToProps)(NextEvent);
