import axios from 'axios';
import { browserHistory } from 'react-router';
import { CREATE_EVENT_SUCCESS, FETCH_EVENTS } from './types';

const DOMAIN = 'http://localhost:5000/api';

export const fetchAll = () =>
  function (dispatch) {
    dispatch({
      type: 'FETCH_EVENTS',
      payload: axios.get(`${DOMAIN}/events`),
    });
  };

export const updateEvents = event =>
  function (dispatch) {
    console.log('update event action\n', event);
    dispatch({
      type: 'UPDATE_EVENTS',
      payload: event,
    });
  };

export const createEvent = event =>
  function (dispatch) {
    console.log('creating event\n', event);
    dispatch({
      type: 'CREATE_EVENT',
      payload: event,
    });
  };
