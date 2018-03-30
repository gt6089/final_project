import { combineReducers } from 'redux';
import events from './eventsReducer';
import players from './playersReducer';
import messages from './messagesReducer';

export default combineReducers({
  events,
  players,
  messages
})