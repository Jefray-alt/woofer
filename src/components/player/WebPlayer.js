export default class WebPlayer {
  constructor() {
    this._device_id = '';
    this.player = '';
    this._token = localStorage.getItem('accessToken');
  }

  init = () => {
    if (typeof window.Spotify !== 'undefined') {
      console.log(window.Spotify);
      this.player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb) => {
          cb(this._token);
        },
      });

      // Error handling
      this.player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      this.player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      this.player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      this.player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      this.player.addListener('player_state_changed', (state) => {
        console.log(state);
      });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        this._device_id = device_id;
        // console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      this.player.connect().then((res) => {
        if (res) {
          console.log('Player connected');
          // Bind eventlisteners
          //this.bindEvents();
        }
      });
    } else {
      setTimeout(() => {
        this.init();
      }, 1000);
    }
  };

  bindEvents = () => {
    //   Play/Pause Button
    document.querySelector('#toggle').addEventListener('click', function () {
      this.player.togglePlay().then((res) => {
        console.log('toggled');
      });
    });

    // Prev Track Button
    document.querySelector('#prev').addEventListener('click', function () {
      this.player.previousTrack().then(() => {
        console.log('Set to previous track!');
      });
    });

    // Next Track Button
    document.querySelector('#next').addEventListener('click', function () {
      this.player.nextTrack().then(() => {
        console.log('Set to next track!');
      });
    });
  };

  setMusic = async (uri) => {
    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this._device_id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          uris: [uri],
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._token}`,
        },
      }
    );
  };
}
