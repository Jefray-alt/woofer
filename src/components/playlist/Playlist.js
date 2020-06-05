import React, { useContext, useEffect } from 'react';
import spotifyContext from '../../context/spotify/spotifyContext';
import authContext from '../../context/auth/authContext';
import Loading from '../layouts/Loading';

import PlaylistItem from './PlaylistItem';

const Playlist = () => {
  const SpotifyContext = useContext(spotifyContext);
  const AuthContext = useContext(authContext);
  const {
    likedPlaylist,
    changePageLikedPlaylist,
    getLikedPlaylist,
    limitPerPage,
    offset,
  } = SpotifyContext;
  const { profile } = AuthContext;

  useEffect(
    () => {
      getLikedPlaylist();
    }, //eslint-disable-next-line
    []
  );

  const changePage = (e) => {
    e.preventDefault();
    changePageLikedPlaylist(e.target.id);
    document.querySelector('.left-container .container').scrollTop = 0;
  };

  return (
    <div className='playlist-container'>
      <div className='header-title'>
        <h1>Welcome {profile.display_name}</h1>
        <h3>Your Liked Music</h3>
      </div>
      {/* TItle */}
      <div className='track-item'>
        <div className='track-name'>
          <h5>Song</h5>
        </div>
        <div className='track-artists'>
          <h5>Artists</h5>
        </div>
        <div className='track-album'>
          <h5>Album</h5>
        </div>
      </div>
      {likedPlaylist === null ? (
        <Loading />
      ) : (
        likedPlaylist.items.map((item) => {
          return <PlaylistItem track={item.track} key={item.track.id} />;
        })
      )}
      <div className='pagination'>
        <ul>
          {likedPlaylist !== null
            ? [
                ...Array(
                  Math.ceil(likedPlaylist.total / likedPlaylist.limit)
                ).keys(),
              ].map((item, i) => {
                return (
                  <li className='pagination-item' key={i}>
                    <a
                      id={i + 1}
                      href='!#'
                      className={
                        Math.round((i + 1 - 1) * (limitPerPage + 1)) === offset
                          ? 'active'
                          : ''
                      }
                      onClick={changePage}
                    >
                      {i + 1}
                    </a>
                  </li>
                );
              })
            : ''}
        </ul>
      </div>
    </div>
  );
};

export default Playlist;
