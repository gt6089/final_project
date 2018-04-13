import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USER, FETCH_EVENTS } from './types';

const DOMAIN = 'http://localhost:5000/api';

// ACTIONS

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get(`${DOMAIN}/currentuser`);
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const createUser = userData => async (dispatch) => {
  console.log('userData', userData);
  const res = await axios.post(`${DOMAIN}/users`, userData);
  console.log(res);
};
