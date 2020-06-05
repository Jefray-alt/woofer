import { SET_PLAYING, SET_PLAYER_LOADING, CLEAR_ALL } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_PLAYER_LOADING:
      return {
        ...state,
        playerLoading: true,
      };
    case SET_PLAYING:
      return {
        ...state,
        nowPlaying: action.payload,
        playerLoading: false,
      };
    case CLEAR_ALL:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
