import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../actions/player';
import PlayerForm from './PlayerForm';
import axios from 'axios';

class PlayerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {...this.props.player}
    }

    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators(playerActions, dispatch);
    console.log(this.boundActionCreators);

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
    console.log('hitting save event');
    console.log('local event', this.state.player);

    event.preventDefault();

    // let currentState = this.props.players;
    console.log('props.player.id', this.props.player.id)
    axios
      .put(`http://localhost:5000/api/players/${this.props.player.id}`, this.state.player)
      .then((updatedPlayer) => {
        // currentState = [...currentState, updatedPlayer.data];

        // console.log('currentState', currentState);
        console.log('updated player:', updatedPlayer)

        this.props.dispatch(playerActions.updatePlayer(updatedPlayer.data));

        this.props.history.push('/players');
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Edit player</h1>
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

function mapStateToProps(state, ownProps) {
  let player = {};
  const players = state.players.players;
  const playerId = ownProps.match.params.id;

  if (playerId && players.length > 0) {
    player = Object.assign({}, players.find(player => player.id == playerId));
  }
  console.log('found player: ', player)

  return { 
    player,
    players,
  };
}

export default connect(mapStateToProps)(PlayerEdit);
