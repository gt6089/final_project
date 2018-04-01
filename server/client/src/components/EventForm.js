import React, { Component } from 'react';

class EventForm extends Component {
  render() {
    return (
      <div className="EventForm">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              value={this.props.event.date}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="start_time">Start time</label>
            <input
              type="time"
              name="start_time"
              value={this.props.event.start_time}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="end_time">End time</label>
            <input
              type="time"
              name="end_time"
              value={this.props.event.end_time}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="deadline_date">RSVP deadline date</label>
            <input
              type="date"
              name="deadline_date"
              value={this.props.event.deadline_date}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="deadline_time">RSVP deadline time</label>
            <input
              type="time"
              name="deadline_time"
              value={this.props.event.deadline_time}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={this.props.event.location}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="min_attendees">Minimum # of attendees</label>
            <input
              type="number"
              step="1"
              min="1"
              name="min_attendees"
              value={this.props.event.min_attendees}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="max_attendees">Maximum # of attendees</label>
            <input
              type="number"
              step="1"
              min="1"
              name="max_attendees"
              value={this.props.event.max_attendees}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="inviteMsg">Invite message</label>
            <textarea
              name="inviteMsg"
              value={this.props.event.inviteMsg}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <input
              type="submit" className="button"
              onClick={this.props.onSave}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EventForm;
