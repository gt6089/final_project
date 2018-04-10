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

    const barColor = yesResponses >= min_attendees ? 'is-success' : 'is-danger';

    return (
      <progress className={`progress ${barColor}`} value={progressPercent} max="100">{progressPercent}%</progress>
    );
  }

  render() {
    const responses = this.tallyResponses(this.props.event.Players);

    return (
      <div className="event-status-bar mb">
        {this.renderProgressBar(responses)}
        <div className="level is-mobile">
          <div className="level-item title is-5">Yes: {responses.yes}</div>
          <div className="level-item title is-5">No: {responses.no}</div>
          <div className="level-item title is-5">Maybe: {responses.maybe}</div>
          <div className="level-item title is-5">?: {responses.invited}</div>
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
