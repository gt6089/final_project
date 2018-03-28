import { combineReducers } from 'redux';
import events from './eventsReducer';
import players from './playersReducer';

export default combineReducers({
  events,
  players,
})