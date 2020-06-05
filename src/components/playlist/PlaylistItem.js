import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import playerContext from '../../context/player/playerContext';

const PlaylistItem = ({ track }) => {
  const PlayerContext = useContext(playerContext);
  const { nowPlaying, setNowPlaying } = PlayerContext;
  const setPlaying = (e) => {
    e.preventDefault();
    setNowPlaying(track);
  };
  return (
    <a
      href='!#'
      onClick={setPlaying}
      className={
        'track-item' +
        (nowPlaying !== null && nowPlaying.track.id === track.id
          ? ' active'
          : '')
      }
    >
      <div className='track-name'>
        <p>{track.name}</p>
      </div>
      <div className='track-artists'>
        {track.artists.map((artist) => {
          return (
            <span
              key={artist.id}
              className={track.artists.length > 1 ? 'multiple' : ''}
            >
              {artist.name}
            </span>
          );
        })}
      </div>
      <div className='track-album'>
        <span>{track.album.name}</span>
      </div>
    </a>
  );
};

PlaylistItem.propTypes = {
  track: PropTypes.object.isRequired,
};

export default PlaylistItem;
