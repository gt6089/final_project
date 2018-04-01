import React, { Component } from 'react';

class EventStatusBar extends Component {
  tallyResponses(players = []) {
    const responses = {
      yes: 0,
      no: 0,
      maybe: 0,
      noResponse: 0,
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
        default:
      }
    });
    console.log('tallied response obj', responses);
    return responses;
  }

  renderProgressBar(responses) {
    const { min_attendees } = this.props.event;
    const { max_attendees } = this.props.event;
    const yesResponses = responses.yes;

    console.log('min:', min_attendees);
    console.log('max:', max_attendees);
    console.log('yes', yesResponses);

    let progressPercent = max_attendees / yesResponses;

    let barColor = yesResponses >= min_attendees ? 'success progress' : 'alert progress';

    return (
      <div
        className={barColor}
        role="progressbar"
        tabIndex="0"
        aria-valuenow={progressPercent}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="progress-meter" style={{width: '25%'}}></div>
      </div>
    );
  }

  render() {
    const responses = this.tallyResponses(this.props.event.Players);

    return (
      <div className="event-show-progress">
        { this.renderProgressBar(responses) }
        <div className="progress-text">
          <span>Yes: {responses.yes}</span>
          <span>No: {responses.no}</span>
          <span>Maybe: {responses.maybe}</span>
          <span>N/R</span>
        </div>
      </div>
    );
  }
}

export default EventStatusBar;
