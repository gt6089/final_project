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
    case 'INVITE_PLAYERS_PENDING': {
      return { ...state, fetching: true };
    }
    case 'INVITE_PLAYERS_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'INVITE_PLAYERS_FULFILLED': {
      return {
        ...state,
      };
    }
    case 'CREATE_MESSAGE_PENDING': {
      return { ...state, fetching: true };
    }
    case 'CREATE_MESSAGE_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'CREATE_MESSAGE_FULFILLED': {
      return {
        ...state,
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
