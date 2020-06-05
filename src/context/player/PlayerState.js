import React, { useReducer } from 'react';
import playerContext from './playerContext';
import playerReducer from './playerReducer';

import { SET_PLAYING, SET_PLAYER_LOADING, CLEAR_ALL } from '../types';

const PlayerState = (props) => {
  const initialState = {
    playerLoading: true,
    nowPlaying: null,
  };

  const [state, dispatch] = useReducer(playerReducer, initialState);

  const setNowPlaying = async (track) => {
    const res = await fetch(
      ` https://api.spotify.com/v1/audio-features/${track.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    const data = await res.json();
    dispatch({ type: SET_PLAYING, payload: { track, data } });
  };

  const setPlayerLoading = () => {
    dispatch({ type: SET_PLAYER_LOADING });
  };

  const clearAll = () => {
    dispatch({ type: CLEAR_ALL, payload: initialState });
  };

  return (
    <playerContext.Provider
      value={{
        nowPlaying: state.nowPlaying,
        playerLoading: state.playerLoading,
        setPlayerLoading,
        setNowPlaying,
        clearAll,
      }}
    >
      {props.children}
    </playerContext.Provider>
  );
};

export default PlayerState;
