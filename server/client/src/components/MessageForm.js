import React, { Component } from 'react';

class MessageForm extends Component {
  render() {
    // let event = '';
    // if (this.props.event) {
    //   event = this.props.event.date
    // }

    const { to } = this.props;

    let target = '';
    if (to === 'All players') {
      target = 'All players';
    }
    else {
      target = `${to.first_name} ${to.last_name}`
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
            <label htmlFor="event">Event date:</label>
            <input
              type="text"
              name="event"
              value={this.props.event.date}
              disabled
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
