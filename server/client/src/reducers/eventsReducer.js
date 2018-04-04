import { FETCH_EVENTS, CREATE_EVENT, FETCH_ATTENDANCE } from '../actions/types';
import { history } from 'react-router';

export default function reducer(
  state = {
    events: [],
    nextEvent: {},
    attendance: [],
    fetching: false,
    fetched: false,
    error: null,
  },
  action,
) {
  switch (action.type) {
    case 'FETCH_EVENTS_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_EVENTS_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_EVENTS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        events: action.payload.data,
      };
    }
    case 'FETCH_ATTENDANCE_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_ATTENDANCE_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_ATTENDANCE_FULFILLED': {
      console.log('action payload:', action.payload);
      return {
        ...state,
        fetching: false,
        fetched: true,
        attendance: action.payload.data,
      };
    }
    case 'CREATE_EVENT': {
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    }
    case 'UPDATE_EVENT_PENDING': {
      return { ...state, fetching: true };
    }
    case 'UPDATE_EVENT_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'UPDATE_EVENT_FULFILLED': {
      const { id } = action.payload.data;
      const newEvents = [...state.events];
      const eventToUpdate = newEvents.findIndex(event => event.id === id);
      newEvents[eventToUpdate] = action.payload.data;

      return {
        ...state,
        events: newEvents,
      };
    }
    case 'BULK_UPDATE_EVENTS_PENDING': {
      return { ...state, fetching: true };
    }
    case 'BULK_UPDATE_EVENTS_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'BULK_UPDATE_EVENTS_FULFILLED': {
      const newEvents = [...state.events, action.payload.data];
      return {
        ...state,
        events: newEvents,
      };
    }
    case 'FETCH_NEXT_EVENT_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_NEXT_EVENT_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_NEXT_EVENT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        nextEvent: action.payload.data,
      };
    }
    case 'DELETE_EVENT': {
      const { id } = action.payload;

      return {
        ...state,
        events: state.events.filter(event => event.id !== id)
      }
    }
    default:
      return state;
  }
}
