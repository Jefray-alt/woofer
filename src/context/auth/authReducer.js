import {
  SET_AUTH_LOADING,
  REMOVE_AUTH,
  GET_PROFILE,
  CLEAR_ALL,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    case REMOVE_AUTH:
      return {
        ...state,
        isAuth: false,
        authLoading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        authLoading: false,
        isAuth: true,
      };
    case CLEAR_ALL:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
