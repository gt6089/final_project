import axios from 'axios';

const DOMAIN = 'http://localhost:5000/api';

export const fetchAll = () =>
  function (dispatch) {
    dispatch({
      type: 'FETCH_MESSAGES',
      payload: axios.get(`${DOMAIN}/messages`),
    });
  };

export const createMessage = (message) => {
  return function (dispatch) {
    dispatch({
      type: 'CREATE_MESSAGE',
      payload: axios.post(`${DOMAIN}/messages`, message),
    });
  };
};

export const invitePlayers = (event) => {
  return function (dispatch) {
    dispatch({
      type: 'INVITE_PLAYERS',
      payload: axios.post(`${DOMAIN}/messages`, event)
    })
  }
  fetchAll();
}

export const remindPlayers = (event) => {
  return function (dispatch) {
    dispatch({
      type: 'REMIND_PLAYERS',
      payload: axios.post(`${DOMAIN}/messages`, event)
    })
  }
}