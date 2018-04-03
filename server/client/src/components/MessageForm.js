import React, { Component } from 'react';

class MessageForm extends Component {
  render() {
    let re = '';
    if (this.props.event) {
      re = this.props.event.date
    }

    const { to } = this.props;

    let target = '';
    if (to) {
      target = `${to.first_name} ${to.last_name}`
    } else {
      target = 'All players'
    }

    return (
      <div className="MessageForm">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="to">To:</label>
            <input
              type="text"
              name="to"
              value={target}
              onChange={this.props.onChange}
              disabled
            />
          </div>
          <div>
            <label htmlFor="re">Event date:</label>
            <input
              type="text"
              name="event"
              value={re}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label htmlFor="msgBody">Message body</label>
            <textarea
              name="msgBody"
              placeholder="Type your message here"
              rows={8}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <input
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
