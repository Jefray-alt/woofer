import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Login = (props) => {
  useEffect(
    () => {
      if (localStorage.getItem('accessToken') !== null) {
        props.history.push('/home');
      }
    }, //eslint-disable-next-line
    []
  );
  return (
    <div id='login-header'>
      <h1>Welcome to Woofer</h1>
      <p>Please log in to continue</p>
      <Link to='/login' className='btn btn-primary'>
        Log in
      </Link>
    </div>
  );
};

export default Login;
