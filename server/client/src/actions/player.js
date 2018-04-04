import axios from 'axios';

const DOMAIN = 'http://localhost:5000/api';

export const fetchAll = () =>
  function (dispatch) {
    dispatch({
      type: 'FETCH_PLAYERS',
      payload: axios.get(`${DOMAIN}/players`),
    });
  };

export const createPlayer = player =>
  function (dispatch) {
    dispatch({
      type: 'CREATE_PLAYER',
      payload: player,
    });
  };

export const updatePlayer = player =>
  function (dispatch) {
    console.log('hitting updatePlayer action:', player);
    dispatch({
      type: 'UPDATE_PLAYER',
      payload: axios.put(`${DOMAIN}/players/${player.id}`, player),
    });
  };

export const deletePlayer = (player) =>
  function (dispatch) {
    dispatch({
      type: 'DELETE_PLAYER',
      payload: player,
    });
  };
