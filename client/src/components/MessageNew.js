import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActions from '../actions/message';
import MessageForm from './MessageForm';
import axios from 'axios';
import { Redirect } from 'react-router';

class MessageNew extends Component {
  constructor(props) {
    super(props);
    const target = this.props.location.state.player
      ? this.props.location.state.player
      : 'All players';

    this.state = {
      message: {
        to: target,
        event: this.props.location.state.event.id,
        msgBody: '',
      },
      saving: false,
    };

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(messageActions, dispatch);

    this.saveMessage = this.saveMessage.bind(this);
    this.updateMessageState = this.updateMessageState.bind(this);
  }

  updateMessageState(event) {
    const field = event.target.name;
    const newMessage = this.state.message;
    newMessage[field] = event.target.value;
    return this.setState({
      message: newMessage,
    });
  }

  saveMessage(event) {
    console.log('sending message', this.state.message);

    event.preventDefault();

    this.props.dispatch(messageActions.createMessage(this.state.message));

    this.props.history.push('/messages');
  }

  render() {
    return (
      <div>
        <h1>Send message</h1>
        <MessageForm
          {...this.boundActionCreators}
          event={this.props.location.state.event}
          to={this.props.location.state.player ? this.props.location.state.player : 'All players'}
          onSave={this.saveMessage}
          onChange={this.updateMessageState}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.players.players,
  };
}

export default connect(mapStateToProps)(MessageNew);
