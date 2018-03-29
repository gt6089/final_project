import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  CREATE_EVENT_SUCCESS,
  FETCH_EVENTS
} from './types';

const DOMAIN = 'http://localhost:5000/api';

export const fetchAll = () => {
  return function(dispatch) {
    dispatch({
      type: 'FETCH_EVENTS',
      payload: axios.get(`${DOMAIN}/events`)
    });
  };
};

export const createEvent = (event) => {
  return function(dispatch) {
    console.log('creating event', event)
    dispatch({
      type: 'CREATE_EVENT',
      payload: axios.post(`${DOMAIN}/events`, event)
    })
  }
}