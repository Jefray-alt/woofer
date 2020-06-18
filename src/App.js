import React, { Fragment } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/pages/Login';
import LoginExternal from './components/pages/LoginExternal';
import Playlist from './components/playlist/Playlist';
import Search from './components/search/Search';
import Profile from './components/profile/Profile';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Navbar from './components/layouts/Navbar';
import MissingPage from './components/pages/MissingPage';
const App = () => {
  return (
    <Fragment>
      <div className='block-mobile'>
        <h1 style={{ color: 'white' }}>
          Woofer is not yet available in mobile devices
        </h1>
      </div>
      {console.log(process.env)}
      <Navbar />
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={LoginExternal} />
        <ProtectedRoute exact path='/home' component={Playlist} />
        <ProtectedRoute exact path='/search/:item' component={Search} />
        <ProtectedRoute exact path='/profile/:id' component={Profile} />
        <Route path='/404' component={MissingPage} />
        <Redirect to='/404' />
      </Switch>
    </Fragment>
  );
};

export default App;
