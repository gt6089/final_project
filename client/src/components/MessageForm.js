import React, { Component } from 'react';

class MessageForm extends Component {
  render() {
    const { to } = this.props;

    let target = '';

    if (to === 'All players') {
      target = 'All players';
    }
    else {
      target = `${to.first_name} ${to.last_name}`
    }

    let eventDate = '';

    if (this.props.event) {
      eventDate = this.props.event.date;
    } else {
      eventDate = 'N/A';
    }

    return (
      <div className="MessageForm">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="to" className="label">To:</label>
            <input
            className="input"
              type="text"
              name="to"
              value={target}
              onChange={this.props.onChange}
              disabled
            />
          </div>
          <div className="field">
            <label htmlFor="event" className="label">Event date:</label>
            <input
            className="input"
              type="text"
              name="event"
              value={eventDate}
              disabled
            />
          </div>
          <div className="field">
            <label htmlFor="msgBody" className="label">Message body</label>
            <textarea
            className="textarea"
              name="msgBody"
              placeholder="Type your message here"
              rows={8}
              onChange={this.props.onChange}
            />
          </div>
          <div className="control">
            <input
            className="input"
              type="submit"
              className="button"
              value="Send message"
              onClick={this.props.onSave}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default MessageForm;
