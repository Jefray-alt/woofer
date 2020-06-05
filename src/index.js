import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import AuthState from './context/auth/AuthState';
import SpotifyState from './context/spotify/SpotifyState';
import PlayerState from './context/player/PlayerState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <SpotifyState>
        <PlayerState>
          <Router>
            <App />
          </Router>
        </PlayerState>
      </SpotifyState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
