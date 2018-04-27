import axios from 'axios';
import { BASE_URL } from '../requests/config';

export const fetchAll = () =>
  function (dispatch) {
    dispatch({
      type: 'FETCH_PLAYERS',
      payload: axios.get(`${BASE_URL}/players`),
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
    dispatch({
      type: 'UPDATE_PLAYER',
      payload: axios.put(`${BASE_URL}/players/${player.id}`, player),
    });
  };

export const deletePlayer = (player) =>
  function (dispatch) {
    dispatch({
      type: 'DELETE_PLAYER',
      payload: player,
    });
  };
