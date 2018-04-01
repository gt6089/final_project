import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PlayerIndex extends Component {
  sortPlayers(raw = []) {
    if (raw.length > 0) {
      return raw.sort((a, b) => {
        const nameA = a.first_name.toLowerCase();
        const nameB = b.first_name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
  }
  render() {
    console.log('this.props.players', this.props.players);
    const players = (this.props.players.length > 0) ? (this.sortPlayers(this.props.players)) : [];
    return (
      <div>
        <h1>Players</h1>
        <div className="player-index-actions">
          <Link to="/players/new" className="button">
            Create player
          </Link>
        </div>
        <table className="stack">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {players &&
              players.map(player => (
                <tr key={player.id}>
                  <td>
                    <Link to={`/players/${player.id}`}>
                      {player.first_name} {player.last_name}
                    </Link>
                  </td>
                  <td>{player.phone}</td>
                  <td>{player.email}</td>
                  <td>{player.is_active}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.players) {
    return {
      players: state.players.players,
    }
  } else {
    return {
      players: []
    }
  }
};

export default connect(mapStateToProps)(PlayerIndex);
