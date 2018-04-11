import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActions from '../actions/message';
import * as playerActions from '../actions/player';
import MessageForm from './MessageForm';
import axios from 'axios';
import { Redirect } from 'react-router';

class MessageNew extends Component {
  constructor(props) {
    super(props);
    const target = this.props.location.state.player
      ? this.props.location.state.player.phone
      : 'All players';

    const event = this.props.location.state.event ? this.props.location.state.event : null;

    const eventId = event ? event.id : null;

    this.state = {
      message: {
        to: target,
        eventId,
        msgBody: '',
        type: 'manual',
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
    event.preventDefault();

    axios
      .post('http://localhost:5000/api/messages', {
        message: this.state.message
      })
      .then((res) => {
        this.props.dispatch(messageActions.fetchAll())
      })
      .then(() => this.props.history.push('/messages'));
  }

  render() {
    const event = this.props.location.state.event ? this.props.location.state.event : null;

    return (
      <div>
        <h1>Send message</h1>
        <MessageForm
          {...this.boundActionCreators}
          event={event}
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
