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
      console.log('update player', action.payload.data);
      const { id } = action.payload.data;
      const newPlayers = [...state.players];
      console.log('state.players', newPlayers);
      const playerToUpdate = newPlayers.findIndex(player => player.id === id);
      newPlayers[playerToUpdate] = action.payload.data;
      console.log('changed newPlayers', newPlayers);
      return {
        ...state,
        players: newPlayers,
      };
    }
    case 'DELETE_PLAYER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'DELETE_PLAYER_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'DELETE_PLAYER_FULFILLED': {
      const { id } = action.payload;

      const stateCopy = [...state.players];
      const playerToDelete = stateCopy.findIndex(player => player.id === id);
      stateCopy.splice(playerToDelete, 1);
      return {
        players: stateCopy,
      };
    }
    default:
      return state;
  }
}
