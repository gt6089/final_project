import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../actions/player';
import PlayerForm from './PlayerForm';
import axios from 'axios';

class PlayerNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        isActive: true,
      },
      saving: false,
    };
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators(playerActions, dispatch);

    this.savePlayer = this.savePlayer.bind(this);
    this.updatePlayerState = this.updatePlayerState.bind(this);
  }

  updatePlayerState(event) {
    const field = event.target.name;
    const newPlayer = this.state.player;
    newPlayer[field] = event.target.value;
    
    return this.setState({
      player: newPlayer,
    });
  }

  savePlayer(event) {
    event.preventDefault();

    let currentState = this.props.players;

    axios
      .post('http://localhost:5000/api/players', this.state.player)
      .then((createdPlayer) => {
        currentState = [...currentState, createdPlayer.data];

        this.props.dispatch(playerActions.createPlayer(currentState));

        this.props.history.push('/players');
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Create player</h1>
        <PlayerForm
          {...this.boundActionCreators}
          player={this.state.player}
          onSave={this.savePlayer}
          onChange={this.updatePlayerState}
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

export default connect(mapStateToProps)(PlayerNew);
