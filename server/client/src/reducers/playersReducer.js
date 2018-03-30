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
    case 'UPDATE_PLAYER': {
      const { id } = action.payload;
      const newPlayers = [...state.players];
      const playerToUpdate = newPlayers.findIndex(player => player.id === id);
      newPlayers[playerToUpdate] = action.payload;

      return {
        ...state,
        players: newPlayers,
      };
    }
    default:
      return state;
  }
}
