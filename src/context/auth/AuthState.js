import React, { useReducer } from 'react';
import authReducer from './authReducer';
import authContext from './authContext';

import moment from 'moment';

import {
  SET_AUTH_LOADING,
  REMOVE_AUTH,
  GET_PROFILE,
  CLEAR_ALL,
} from '../types';

let spotifyClientId;
let spotifyClientSecret;

if (process.env.NODE_ENV !== 'production') {
  spotifyClientId = process.env.REACT_APP_CLIENT_ID;
  spotifyClientSecret = process.env.REACT_APP_CLIENT_SECRET;
  redirectURI = 'http://localhost:3000/home';
} else {
  spotifyClientId = process.env.REACT_APP_CLIENT_ID_PROD;
  spotifyClientSecret = process.env.REACT_APP_CLIENT_SECRET_PROD;
  redirectURI = process.env.REACT_APP_REDIRECT_URI_PROD;
}

const AuthState = (props) => {
  const initialState = {
    authLoading: true,
    isAuth: false,
    profile: {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const credentialKey = spotifyClientId + ':' + spotifyClientSecret;

  const encodeFormData = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&');
  };

  const generateKey = async () => {
    try {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let accessCode = params.get('code');
      if (accessCode !== null) {
        setAuthLoading();
        const dataBody = {
          grant_type: 'authorization_code',
          code: accessCode,
          redirect_uri: redirectURI,
        };

        const res = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(credentialKey)}`,
          }),
          body: encodeFormData(dataBody),
        });
        if (res.status === 200) {
          const data = await res.json();

          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);
          localStorage.setItem('tokenType', data.token_type);
          localStorage.setItem('acquiredTime', moment().format());
          getProfile();
        } else {
          removeAuth();
        }
      } else {
        removeAuth();
      }
    } catch (err) {
      console.log('error');
    }
  };

  const newToken = async (callback) => {
    try {
      setAuthLoading();
      const dataBody = {
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('refreshToken'),
        redirect_uri: redirectURI,
      };

      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(credentialKey)}`,
        }),
        body: encodeFormData(dataBody),
      });

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('acquiredTime', moment().format());
        getProfile();
        if (callback) {
          callback();
        }
      } else {
        removeAuth();
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  };

  const removeAuth = () => {
    dispatch({ type: REMOVE_AUTH });
  };

  const setAuthLoading = () => {
    dispatch({ type: SET_AUTH_LOADING });
  };

  const getProfile = async () => {
    try {
      setAuthLoading();

      const res = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      const data = await res.json();
      dispatch({ type: GET_PROFILE, payload: data });
    } catch (err) {
      console.log('Error', err.message);
    }
  };

  const clearAll = () => {
    localStorage.clear();
    dispatch({ type: CLEAR_ALL, payload: initialState });
  };

  return (
    <authContext.Provider
      value={{
        authLoading: state.authLoading,
        isAuth: state.isAuth,
        profile: state.profile,
        setAuthLoading,
        generateKey,
        newToken,
        removeAuth,
        getProfile,
        clearAll,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
