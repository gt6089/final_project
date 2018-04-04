export default function reducer(
  state = {
    players: [],
    fetching: false,
    fetched: false,
    error: null,
  },
  action,
) {
  switch (action.type) {
    case 'FETCH_PLAYERS_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_PLAYERS_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_PLAYERS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        players: action.payload.data,
      };
    }
    case 'CREATE_PLAYER': {
      return {
        ...state,
        players: action.payload,
      };
    }
    case 'UPDATE_PLAYER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'UPDATE_PLAYER_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'UPDATE_PLAYER_FULFILLED': {
      const { id } = action.payload.data;
      const newPlayers = [...state.players];

      const playerToUpdate = newPlayers.findIndex(player => player.id === id);
      newPlayers[playerToUpdate] = action.payload.data;

      return {
        ...state,
        players: newPlayers,
      };
    }
    case 'DELETE_PLAYER': {
      const { id } = action.payload;
      return {
        ...state,
        players: state.players.filter(player => player.id !== id)
      }
    }
    default:
      return state;
  }
}
