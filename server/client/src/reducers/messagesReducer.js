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
    case 'CREATE_PLAYER': {
      return {
        ...state,
        players: {
          data: action.payload,
        },
      };
    }
  }
  return state;
}
