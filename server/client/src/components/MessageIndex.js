import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

class MessagesIndex extends Component {
  renderContent(raw = []) {
    const msgObj = _.groupBy(raw, 'dateSent');

    if (raw.length > 0) {
      console.log('raw length', msgObj.length);
      console.log('raw messages:', msgObj);
      msgObj.map(message => (
        <div>
          <p>{message}</p>
        </div>
      ))
    } else {
      return <div>No messages here</div>;
    }

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
