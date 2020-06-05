import React, { useContext } from 'react';
import playerContext from '../../context/player/playerContext';

const SinglePlayer = () => {
  const PlayerContext = useContext(playerContext);
  const { nowPlaying } = PlayerContext;

  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${nowPlaying.track.id}`}
      width='300'
      height='80'
      frameBorder='0'
      allowtransparency='true'
      allow='encrypted-media'
      title='spotify-player'
    ></iframe>
  );
};

export default SinglePlayer;
