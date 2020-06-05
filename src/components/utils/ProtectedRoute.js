import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { Route, Redirect } from 'react-router-dom';
import Player from '../player/Player';
import Loading from '../layouts/Loading';

import authContext from '../../context/auth/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const AuthContext = useContext(authContext);
  const {
    generateKey,
    newToken,
    isAuth,
    authLoading,
    getProfile,
    profile,
  } = AuthContext;
  useEffect(
    () => {
      if (
        localStorage.getItem('accessToken') !== null &&
        moment(moment().subtract(1, 'hour')).isSameOrAfter(
          moment(localStorage.getItem('acquiredTime'))
        )
      ) {
        console.log('Im expired');
        newToken();
      } else if (localStorage.getItem('accessToken') !== null) {
        if (
          Object.keys(profile).length === 0 &&
          profile.constructor === Object
        ) {
          getProfile();
        }
      } else if (localStorage.getItem('accessToken') === null) {
        generateKey();
      }
    }, // eslint-disable-next-line
    []
  );
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authLoading) {
          return <Loading />;
        } else if (isAuth) {
          return (
            <div className='main-body'>
              <div className='left-container'>
                <div className='container'>
                  <Component {...props} />
                </div>
              </div>
              <div className='right-container'>
                <div className='container'>
                  <Player />
                </div>
              </div>
            </div>
          );
        } else {
          return <Redirect to='/' />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
