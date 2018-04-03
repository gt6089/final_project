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
    this.state = {
      message: {
        to: '',
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
    console.log('sending message');

    event.preventDefault();

    this.props.dispatch(messageActions.createMessage(this.state.message));

    this.props.history.push('/messages');
  }

  grabPlayerNames() {

  }

  render() {
    let player = {};
    if (this.props.location.state.player) {
      player = this.props.location.state.player
    }

    return (
      <div>
        <h1>Send message</h1>
        <MessageForm
          {...this.boundActionCreators}
          event={this.props.location.state.event}
          to={player ? player : ''}
          onSave={this.saveEvent}
          onChange={this.updateEventState}
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
