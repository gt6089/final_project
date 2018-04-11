import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

class MessagesIndex extends Component {
  sortMessages(raw = []) {
    const msgObj = _.groupBy(raw, 'dateSent');

    if (raw.length > 0) {
      return msgObj;
    }
    return {};
  }

  renderMsgArray(obj, key) {
    const sortedMessages = _.orderBy(obj[key], [
      'timeSent'], ['desc']);

    const sortedArr = sortedMessages.map(item => (
      <div>
        <strong>
          {item.timeSent} to {item.Players[0] !== undefined ? item.Players[0].first_name : item.to}:
        </strong>{' '}
        {item.body}
      </div>
    ));
    return sortedArr;
  }

  render() {
    const messages = this.sortMessages(this.props.messages);

    return (
      <div>
        <h1>Sent Messages</h1>
        {this.props.messages.length > 0 ? (
          Object.keys(messages).map(date => (
            <Fragment>
              <h3>{moment(date).format('MMMM Do YYYY')}</h3>
              {this.renderMsgArray(messages, date)}
            </Fragment>
          ))) : 'No messages found'
        }
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
