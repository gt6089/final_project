export default function reducer(
  state = {
    user: null,
  },
  action,
) {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'DELETE_USER': {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
