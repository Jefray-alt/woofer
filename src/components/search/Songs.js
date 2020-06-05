import React from 'react';
import PlaylistItem from '../playlist/PlaylistItem';

const Songs = ({ collection }) => {
  return (
    <div className='playlist-container'>
      <div className='track-item'>
        <div className='track-name'>
          <i className='fas fa-play-circle'></i>
          <h5>Song</h5>
        </div>
        <div className='track-artists'>
          <h5>Artists</h5>
        </div>
        <div className='track-album'>
          <h5>Album</h5>
        </div>
      </div>
      {collection.map((track) => {
        return <PlaylistItem key={track.id} track={track} />;
      })}
    </div>
  );
};

export default Songs;
