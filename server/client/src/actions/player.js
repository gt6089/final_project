import axios from 'axios';

const DOMAIN = 'http://localhost:5000/api';

export const fetchAll = () => function (dispatch) {
  dispatch({
    type: 'FETCH_PLAYERS',
    payload: axios.get(`${DOMAIN}/players`),
  });
};

export const createPlayer = (player) => {
  return function (dispatch) {
    dispatch({
      type: 'CREATE_PLAYER',
      payload: player,
    });
  };
  fetchAll();
};

export const updatePlayer = (player) => {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_PLAYER',
      payload: player
    })
  }
}
