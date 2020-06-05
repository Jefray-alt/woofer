import React, { useContext } from 'react';
import Playlist from '../playlist/Playlist';
import Search from '../search/Search';
import spotifyContext from '../../context/spotify/spotifyContext';

const HomePage = () => {
  const SpotifyContext = useContext(spotifyContext);
  const { searchedObjects } = SpotifyContext;

  return (
    <div className='main-body'>
      <div className='left-container'>
        <div className='container'>
          {searchedObjects ? <Search /> : <Playlist />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
