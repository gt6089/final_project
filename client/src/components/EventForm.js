import React, { Component } from 'react';

class EventForm extends Component {
  render() {
    return (
      <div className="EventForm">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="date" className="label">Date</label>
            <input
            className="input"
              type="date"
              name="date"
              value={this.props.event.date}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="start_time" className="label">Start time</label>
            <input
            className="input"
              type="time"
              name="start_time"
              value={this.props.event.start_time}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="end_time" className="label">End time</label>
            <input
            className="input"
              type="time"
              name="end_time"
              value={this.props.event.end_time}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="deadline_date" className="label">RSVP deadline date</label>
            <input className="input"
              type="date"
              name="deadline_date"
              value={this.props.event.deadline_date}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="deadline_time" className="label">RSVP deadline time</label>
            <input
            className="input"
              type="time"
              name="deadline_time"
              value={this.props.event.deadline_time}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="location" className="label">Location</label>
            <input
            className="input"
              type="text"
              name="location"
              value={this.props.event.location}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="min_attendees" className="label">Minimum # of attendees</label>
            <input
            className="input"
              type="number"
              step="1"
              min="1"
              name="min_attendees"
              value={this.props.event.min_attendees}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="max_attendees" className="label">Maximum # of attendees</label>
            <input
            className="input"
              type="number"
              step="1"
              min="1"
              name="max_attendees"
              value={this.props.event.max_attendees}
              onChange={this.props.onChange}
            />
          </div>
          <div className="field">
            <label htmlFor="inviteMsg" className="label">Invite message</label>
            <textarea
            className="textarea"
              name="inviteMsg"
              rows={6}
              value={this.props.event.inviteMsg}
              onChange={this.props.onChange}
            />
          </div>
          <div className="control">
            <input className="input"
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
