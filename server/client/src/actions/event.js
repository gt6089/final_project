import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  CREATE_EVENT_SUCCESS,
  FETCH_EVENTS,
  UPDATE_EVENT,
  FETCH_NEXT_EVENT,
  DELETE_EVENT,
} from './types';

const DOMAIN = 'http://localhost:5000/api';

export const fetchAll = () =>
  function (dispatch) {
    dispatch({
      type: 'FETCH_EVENTS',
      payload: axios.get(`${DOMAIN}/events`),
    });
  };

export const fetchAttendance = eventId =>
  function (dispatch) {
    dispatch({
      type: 'FETCH_ATTENDANCE',
      payload: axios.get(`${DOMAIN}/events/${eventId}/players`),
    });
  };

export const bulkUpdateEvents = () =>
  function (dispatch) {
    console.log('bulk updating');
    dispatch({
      type: 'BULK_UPDATE_EVENTS',
      payload: axios.put(`${DOMAIN}/events`),
    });
    fetchAll();
  };

export const updateEvent = event =>
  function (dispatch) {
    console.log('update event action\n', event);
    dispatch({
      type: 'UPDATE_EVENT',
      payload: axios.put(`${DOMAIN}/events/${event.id}`, event),
    });
    fetchAll();
  };

export const getNextEvent = () =>
  function (dispatch) {
    dispatch({
      type: 'FETCH_NEXT_EVENT',
      payload: axios.get(`${DOMAIN}/events/next`)
    });
  };

export const createEvent = event =>
  function (dispatch) {
    console.log('creating event\n', event);
    dispatch({
      type: 'CREATE_EVENT',
      payload: event,
    });
    fetchAll();
  };

export const deleteEvent = event =>
  function (dispatch) {
    console.log('deleting event\n', event);
    dispatch({
      type: 'DELETE_EVENT',
      payload: axios.delete(`${DOMAIN}/events/${event.id}`),
    });
    fetchAll();
  };
