import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USER, FETCH_EVENTS } from './types';

const DOMAIN = 'http://localhost:5000/api'

// ACTION CREATORS

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(msg) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    msg
  }
}

function requestEvents(events) {
  return {
    type: FETCH_EVENTS,
    events
  }
}

function receiveEvents(events, json) {
  return {
    type: RECEIVE_EVENTS,
    events,
    events: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// ACTIONS

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`${DOMAIN}/current_user`);
  dispatch({
    type: FETCH_USER,
    payload: res.data
  })
}

export const fetchEvents = () => async dispatch => {
  const res = await axios.get(`${DOMAIN}/events`);
  dispatch({
    type: FETCH_EVENTS,
    payload: res.data
  })
}