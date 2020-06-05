import React, { useContext, useEffect } from 'react';
import spotifyContext from '../../context/spotify/spotifyContext';
import PlaylistItem from '../playlist/PlaylistItem';
import Loading from '../layouts/Loading';

const Profile = (props) => {
  const SpotifyContext = useContext(spotifyContext);
  const {
    searchedArtists,
    getProfile,
    loading,
    checkFollowing,
    following,
    followArtist,
    unfollowArtist,
  } = SpotifyContext;

  useEffect(
    () => {
      getProfile(props.match.params.id);
      checkFollowing(props.match.params.id);
    }, //eslint-disable-next-line
    []
  );

  if (searchedArtists === null || loading) {
    return <Loading />;
  } else {
    return (
      <div className='container'>
        <div className='profile-container'>
          <div className='profile-info'>
            <img
              src={searchedArtists.dataProfile.images[0].url}
              alt='artist'
              className='artist-img'
            />
            <h1>{searchedArtists.dataProfile.name}</h1>
            <small>
              Followers: {searchedArtists.dataProfile.followers.total}
            </small>
            {!following ? (
              <input
                type='button'
                className='btn btn-primary-outline'
                value='Follow'
                onClick={() => followArtist(props.match.params.id)}
              />
            ) : (
              <input
                type='button'
                className='btn btn-primary-outline'
                value='Unfollow'
                onClick={() => unfollowArtist(props.match.params.id)}
              />
            )}
          </div>

          <h2 className='header-title'>Popular Tracks</h2>

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
          {searchedArtists.data.tracks.map((item) => {
            return <PlaylistItem key={item.id} track={item} />;
          })}
        </div>
      </div>
    );
  }
};

export default Profile;
