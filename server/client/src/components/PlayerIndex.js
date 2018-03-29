import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PlayerIndex extends Component {
  render() {
    const { players } = this.props;
    return (
      <div>
        <h1>Players</h1>
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
            {players.map(player => (
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

const mapStateToProps = state => ({
  players: state.players.players.data
});

export default connect(mapStateToProps)(PlayerIndex);
