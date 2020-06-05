import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import spotifyContext from '../../context/spotify/spotifyContext';
import playerContext from '../../context/player/playerContext';

const Navbar = withRouter((props) => {
  const AuthContext = useContext(authContext);
  const PlayerContext = useContext(playerContext);
  const SpotifyContext = useContext(spotifyContext);
  const { profile, isAuth, clearAll } = AuthContext;
  const [value, setValue] = useState({ key: '' });

  useEffect(
    () => {
      hideLogout();
      if (props.location.pathname.indexOf('/search') !== -1) {
        setValue({ key: props.location.pathname.replace('/search/', '') });
      } else {
        setValue({ key: '' });
      }
    }, //eslint-disable-next-line
    [props.location.pathname]
  );

  const hideLogout = () => {
    document.body.addEventListener('click', function () {
      if (document.querySelector('.logout-menu') !== null) {
        document.querySelector('.logout-menu').classList.remove('show');
      }
    });
  };

  const showLogout = () => {
    document.querySelector('.logout-menu').classList.toggle('show');
  };

  const saveInput = (e) => {
    setValue({ key: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.history.push(`/search/${value.key}`);
  };

  const logoutUser = (e) => {
    e.preventDefault();
    clearAll();
    PlayerContext.clearAll();
    SpotifyContext.clearAll();
    props.history.push('/');
  };

  const { images } = profile;

  if (!isAuth) {
    return null;
  } else {
    return (
      <nav className='main-navbar'>
        <div className='container'>
          <div className='logo'>
            <Link to='/home'>Woofer</Link>
          </div>
          <div className='nav-search-bar'>
            <form onSubmit={submitForm}>
              <input
                type='text'
                name='search'
                id='search'
                className='nav-search'
                placeholder='Search for tunes...'
                autoComplete='off'
                value={value.key}
                onChange={saveInput}
              />
              <input type='submit' className='btn btn-primary' value='Submit' />
            </form>
          </div>
          <div className='links'>
            <img
              src={images[0].url}
              alt='user-profile'
              className='profile-img'
              onClick={showLogout}
            />
            <div className='logout-menu'>
              <a href='!#' className='nav-link' onClick={logoutUser}>
                Logout
                <i className='fas fa-sign-out-alt'></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
});

export default Navbar;
