import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessagesIndex extends Component {
  renderContent(raw = []) {
    console.log('raw messages:', raw);
    if (raw.length > 0) {
      return raw.map(message => (
        <div>
          <div>{message.to}</div>
          <div>{message.body}</div>
        </div>
      ));
    }
    return <div>No messages here</div>;
  }
  render() {
    return (
      <div>
        <h1>Messages</h1>
        {this.renderContent(this.props.messages)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages.messages,
  };
}

export default connect(mapStateToProps)(MessagesIndex);
