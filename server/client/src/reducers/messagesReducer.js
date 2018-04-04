export default function reducer(
  state = {
    messages: [],
    fetching: false,
    fetched: false,
    error: null,
  },
  action,
) {
  switch (action.type) {
    case 'FETCH_MESSAGES_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_MESSAGES_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_MESSAGES_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        messages: action.payload.data,
      };
    }
    case 'UPDATE_MESSAGES': {
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    }
    case 'CREATE_MESSAGE': {
      console.log('hitting create message action', action.payload.data);
      return {
        ...state,
        messages: [...state.messages, ...action.payload.data],
      };
    }
    case 'REMIND_PLAYERS_PENDING': {
      return { ...state, fetching: true };
    }
    case 'REMIND_PLAYERS_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'REMIND_PLAYERS_FULFILLED': {
      return {
        ...state,
      };
    }
  }
  return state;
}
