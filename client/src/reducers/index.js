import { combineReducers } from 'redux';
import events from './eventsReducer';
import players from './playersReducer';
import messages from './messagesReducer';
import user from './userReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  events,
  players,
  messages,
  user,
  routing: routerReducer
})