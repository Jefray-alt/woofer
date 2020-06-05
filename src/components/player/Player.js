import React, { useContext } from 'react';
import SinglePlayer from './SinglePlayer';
import TrackStat from './TrackStat';
import TrackGraph from './TrackGraph';
import playerContext from '../../context/player/playerContext';
const Player = () => {
  const PlayerContext = useContext(playerContext);
  const { nowPlaying } = PlayerContext;

  if (nowPlaying === null) {
    return (
      <div className='message-container'>
        <h1>Select a song to analyze</h1>
      </div>
    );
  } else {
    return (
      <div className='player-container'>
        <h1 className='stat-title'>Track Stats</h1>
        <TrackStat />
        <TrackGraph data={nowPlaying.data} />
        <SinglePlayer />
      </div>
    );
  }
};

export default Player;
