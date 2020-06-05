import { useEffect } from 'react';

const LoginExternal = (props) => {
  useEffect(
    () => {
      if (localStorage.getItem('accessToken') !== null) {
        props.history.push('/home');
      } else {
        const scopes =
          'user-read-private user-read-email user-library-read streaming user-follow-modify user-follow-read';
        const redirectURI = 'http://localhost:3000/home';
        window.location = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
          process.env.REACT_APP_CLIENT_ID
        }&scope=${encodeURIComponent(scopes)}&redirect_uri=${redirectURI}`;
      }
    }, //eslint-disable-next-line
    []
  );

  return null;
};

export default LoginExternal;
