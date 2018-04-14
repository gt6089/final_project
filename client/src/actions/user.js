import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USER, FETCH_EVENTS } from './types';

const DOMAIN = 'http://localhost:5000/api';

// ACTIONS

export const setUser = (user) => async (dispatch) => {
  dispatch({
    type: 'SET_USER',
    payload: user
  })
};

export const createUser = userData => async (dispatch) => {
  console.log('userData', userData);
  const res = await axios.post(`${DOMAIN}/users`, userData);
  console.log(res);
};

export const deleteUser = () => async (dispatch) => {
  dispatch({
    type: 'DELETE_USER'
  })
}