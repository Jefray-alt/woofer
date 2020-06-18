import { useEffect } from 'react';

const LoginExternal = (props) => {
  useEffect(
    () => {
      if (localStorage.getItem('accessToken') !== null) {
        props.history.push('/home');
      } else {
        let key;
        let redirectURI;
        if (process.env.NODE_ENV === 'production') {
          key = process.env.REACT_APP_CLIENT_ID_PROD;
          redirectURI = process.env.REACT_APP_REDIRECT_URI_PROD;
        } else {
          key = process.env.REACT_APP_CLIENT_ID;
          redirectURI = 'http://localhost:3000/home';
        }
        const scopes =
          'user-read-private user-read-email user-library-read streaming user-follow-modify user-follow-read';
        window.location = `https://accounts.spotify.com/authorize?response_type=code&client_id=${key}&scope=${encodeURIComponent(
          scopes
        )}&redirect_uri=${redirectURI}`;
      }
    }, //eslint-disable-next-line
    []
  );

  return null;
};

export default LoginExternal;
