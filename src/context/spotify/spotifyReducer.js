import {
  SET_LOADING,
  GET_LIKED_PLAYLIST,
  CHANGE_PAGE_LIKED_PLAYLIST,
  SEARCH_KEYWORD,
  GET_ARTIST_PROFILE,
  CHECK_FOLLOWING,
  UNFOLLOW_ARTIST,
  FOLLOW_ARTIST,
  CLEAR_ALL,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PAGE_LIKED_PLAYLIST:
    case GET_LIKED_PLAYLIST:
      return {
        ...state,
        likedPlaylist: action.payload,
        loading: false,
      };
    case SEARCH_KEYWORD:
      return {
        ...state,
        searchedObjects: action.payload,
        loading: false,
      };

    case GET_ARTIST_PROFILE:
      return {
        ...state,
        searchedArtists: action.payload,
        loading: false,
      };
    case CHECK_FOLLOWING:
      return {
        ...state,
        following: action.payload[0],
      };

    case UNFOLLOW_ARTIST:
      return {
        ...state,
        following: false,
      };
    case FOLLOW_ARTIST:
      return {
        ...state,
        following: true,
      };
    case CLEAR_ALL:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
