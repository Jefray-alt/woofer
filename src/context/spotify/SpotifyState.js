import React, { useReducer, useContext } from 'react';
import spotifyReducer from './spotifyReducer';
import spotifyContext from './spotifyContext';
import authContext from '../auth/authContext';

import {
  SET_LOADING,
  GET_LIKED_PLAYLIST,
  CHANGE_PAGE_LIKED_PLAYLIST,
  SEARCH_KEYWORD,
  GET_ARTIST_PROFILE,
  CHECK_FOLLOWING,
  FOLLOW_ARTIST,
  UNFOLLOW_ARTIST,
  CLEAR_ALL,
} from '../types';

const SpotifyState = (props) => {
  const initialState = {
    loading: false,
    likedPlaylist: null,
    currentPage: 0,
    limitPerPage: 20,
    offset: 0,
    keyword: null,
    searchedObjects: null,
    searchedArtists: null,
    following: false,
  };

  const options = (type) => {
    if (type === 'GET') {
      return {
        method: `${type}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };
    } else {
      return {
        method: `${type}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };
    }
  };

  const AuthContext = useContext(authContext);
  const { newToken, profile } = AuthContext;

  const [state, dispatch] = useReducer(spotifyReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const getLikedPlaylist = async () => {
    try {
      setLoading();
      state.offset = 0;
      const res = await fetch(
        `https://api.spotify.com/v1/me/tracks?offset=${state.offset}&limit=${state.limitPerPage}`,
        options('GET')
      );
      if (res.status === 200) {
        const data = await res.json();
        dispatch({ type: GET_LIKED_PLAYLIST, payload: data });
      } else if (res.status === 401) {
        newToken(getLikedPlaylist);
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  };

  const changePageLikedPlaylist = async (page) => {
    setLoading();
    try {
      const offset = (page - 1) * (state.limitPerPage + 1);
      state.offset = offset;
      const res = await fetch(
        `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${state.limitPerPage}`,
        options('GET')
      );
      if (res.status === 200) {
        const data = await res.json();
        dispatch({ type: CHANGE_PAGE_LIKED_PLAYLIST, payload: data });
      } else if (res.status === 401) {
        newToken(changePageLikedPlaylist);
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  };

  const searchItems = async (text) => {
    try {
      setLoading();
      state.offset = 0;
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          text
        )}&offset=${state.offset}&limit=${
          state.limitPerPage
        }&type=album,artist,track,playlist`,
        options('GET')
      );
      if (res.status === 200) {
        const data = await res.json();
        dispatch({ type: SEARCH_KEYWORD, payload: data });
      } else if (res.status === 401) {
        newToken(searchItems);
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  };

  const getProfile = async (id) => {
    setLoading();
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?country=${profile.country}`,
        options('GET')
      );

      const artistProfile = await fetch(
        `https://api.spotify.com/v1/artists/${id}`,
        options('GET')
      );
      if (res.status === 200 && artistProfile.status === 200) {
        const data = await res.json();
        const dataProfile = await artistProfile.json();
        dispatch({ type: GET_ARTIST_PROFILE, payload: { data, dataProfile } });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const followArtist = async (userid) => {
    try {
      await fetch(
        `https://api.spotify.com/v1/me/following?type=artist&ids=${userid}`,
        options('PUT')
      );
      dispatch({ type: FOLLOW_ARTIST });
    } catch (error) {
      console.log(error.message);
    }
  };

  const unfollowArtist = async (id) => {
    try {
      await fetch(
        `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`,
        options('DELETE')
      );
      dispatch({ type: UNFOLLOW_ARTIST });
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkFollowing = async (id) => {
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`,
        options('GET')
      );
      if (res.status === 200) {
        const data = await res.json();
        dispatch({ type: CHECK_FOLLOWING, payload: data });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearAll = () => {
    dispatch({ type: CLEAR_ALL, payload: initialState });
  };

  return (
    <spotifyContext.Provider
      value={{
        loading: state.loading,
        likedPlaylist: state.likedPlaylist,
        limitPerPage: state.limitPerPage,
        offset: state.offset,
        searchedObjects: state.searchedObjects,
        searchedArtists: state.searchedArtists,
        following: state.following,
        getLikedPlaylist,
        changePageLikedPlaylist,
        searchItems,
        getProfile,
        followArtist,
        unfollowArtist,
        checkFollowing,
        clearAll,
      }}
    >
      {props.children}
    </spotifyContext.Provider>
  );
};

export default SpotifyState;
