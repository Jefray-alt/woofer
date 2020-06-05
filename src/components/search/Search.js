import React, { useContext, useEffect, Fragment } from 'react';
import Carousel from './Slider';
import Songs from './Songs';
import spotifyContext from '../../context/spotify/spotifyContext';
import Loading from '../layouts/Loading';

const Search = (props) => {
  const SpotifyContext = useContext(spotifyContext);
  const { searchItems, loading, searchedObjects } = SpotifyContext;

  useEffect(
    () => {
      searchItems(props.match.params.item);
    }, //eslint-disable-next-line
    [props.match.params.item]
  );

  if (loading || searchedObjects === null) {
    return <Loading />;
  } else {
    return (
      <div className='search-container'>
        {searchedObjects.artists.items.length !== 0 && (
          <Fragment>
            <h1 className='collection-title'>Artists</h1>
            <Carousel collection={searchedObjects.artists.items} />
          </Fragment>
        )}
        {/* {searchedObjects.albums.items.length !== 0 && (
          <Fragment>
            <h1 className='collection-title'>Albums</h1>
            <Carousel collection={searchedObjects.albums.items} />
          </Fragment>
        )}
        {searchedObjects.playlists.items.length !== 0 && (
          <Fragment>
            <h1 className='collection-title'>Playlists</h1>
            <Carousel collection={searchedObjects.playlists.items} />
          </Fragment>
        )} */}
        {searchedObjects.tracks.items.length !== 0 && (
          <Fragment>
            <h1 className='collection-title'>Tracks</h1>
            <Songs collection={searchedObjects.tracks.items} />
          </Fragment>
        )}
      </div>
    );
  }
};

export default Search;
