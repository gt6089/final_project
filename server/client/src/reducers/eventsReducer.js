import { FETCH_EVENTS, CREATE_EVENT } from '../actions/types';
import { history } from 'react-router';

export default function reducer(
  state = {
    events: [],
    fetching: false,
    fetched: false,
    error: null
  },
  action
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
        events: action.payload
      };
    }
    case 'CREATE_EVENT_PENDING': {
      return { ...state, fetching: true };
    }
    case 'CREATE_EVENT_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'CREATE_EVENT_FULFILLED': {
      console.log('state', state);
      console.log('state.events', state.events);
      console.log('state.events.data', state.events.data)
      return {
        ...state,
        events: [...state.events.data, action.payload.data]
      }
    }
    case 'UPDATE_EVENT': {
      const { id } = action.payload;
      const newEvents = [...state.events];
      const eventToUpdate = newEvents.findIndex(event => event.id === id);
      newEvents[eventToUpdate] = action.payload;

      return {
        ...state,
        events: newEvents
      };
    }
  }
  return state;
}
