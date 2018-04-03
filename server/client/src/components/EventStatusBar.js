import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class EventStatusBar extends Component {
  tallyResponses(players = []) {
    const responses = {
      yes: 0,
      no: 0,
      maybe: 0,
      invited: 0,
    };

    players.map((player) => {
      switch (player.Attendance.status) {
        case 'YES':
          responses.yes += 1;
          break;
        case 'NO':
          responses.no += 1;
          break;
        case 'MAYBE':
          responses.maybe += 1;
          break;
        case 'INVITED':
          responses.invited += 1;
          break;
        default:
          break;
      }
    });
    return responses;
  }

  renderProgressBar(responses) {
    const { min_attendees } = this.props.event;
    const { max_attendees } = this.props.event;
    const yesResponses = responses.yes;

    const progressPercent = yesResponses / max_attendees * 100;

    const barColor = yesResponses >= min_attendees ? 'success progress' : 'alert progress';

    return (
      <div
        className={barColor}
        role="progressbar"
        tabIndex="0"
        aria-valuenow={progressPercent}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="progress-meter" style={{ width: `${progressPercent}%` }} />
      </div>
    );
  }

  render() {
    const responses = this.tallyResponses(this.props.event.Players);

    return (
      <div className="event-status-bar mb">
        {this.renderProgressBar(responses)}
        <div className="progress-text grid-x grid-padding-x align-justify">
          <div className="cell small-3">Yes: {responses.yes}</div>
          <div className="cell small-3">No: {responses.no}</div>
          <div className="cell small-3">Maybe: {responses.maybe}</div>
          <div className="cell small-3">?: {responses.invited}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    players: state.players.players,
  };
}

export default connect(mapStateToProps)(EventStatusBar);
