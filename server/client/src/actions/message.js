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
      payload: message,
    });
  };
  fetchAll();
};