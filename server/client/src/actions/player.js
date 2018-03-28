import axios from 'axios';

const DOMAIN = 'http://localhost:5000/api';

export const fetchAll = () => {
  return function(dispatch) {
    dispatch({
      type: 'FETCH_PLAYERS',
      payload: axios.get(`${DOMAIN}/players`)
    });
  };
};
