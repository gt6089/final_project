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

export const bulkUpdateEvents = (updatedEvents) =>
  function (dispatch) {
    dispatch({
      type: 'BULK_UPDATE_EVENTS',
      payload: updatedEvents,
    });
  };

export const updateEvent = event =>
  function (dispatch) {
    dispatch({
      type: 'UPDATE_EVENT',
      payload: event,
    });
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
    dispatch({
      type: 'CREATE_EVENT',
      payload: event,
    });
  };

export const deleteEvent = event =>
  function (dispatch) {
    dispatch({
      type: 'DELETE_EVENT',
      payload: event,
    });
  };
