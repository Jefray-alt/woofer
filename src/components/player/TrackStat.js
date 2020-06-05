import React, { useContext } from 'react';
import playerContext from '../../context/player/playerContext';
import TrackStatItem from './TrackStatItem';
import moment from 'moment';

const TrackStat = () => {
  const PlayerContext = useContext(playerContext);
  const { nowPlaying } = PlayerContext;

  return (
    <div className='trackstat-container'>
      {/* Artists */}
      <TrackStatItem
        item={{
          data: nowPlaying.track.artists,
          subheading: 'Artists',
          bg:
            'linear-gradient(180deg, rgba(235,51,73,1) 40%, rgba(244,92,67,1) 100%)',
        }}
      />

      {/* Track Name */}
      <TrackStatItem
        item={{
          data: nowPlaying.track.name,
          subheading: 'Track Name',
          bg:
            'linear-gradient(180deg, rgba(20,30,48,1) 40%, rgba(36,59,85,1) 100%)',
        }}
      />

      {/* Popularity */}
      <TrackStatItem
        item={{
          data: nowPlaying.track.popularity + '%',
          subheading: 'Popularity',
          bg:
            'linear-gradient(180deg, rgba(24,90,157,1)  40%, rgba(67,206,162,1) 100%)',
        }}
      />
      {/* Duration */}
      <TrackStatItem
        item={{
          data: moment(nowPlaying.track.album.release_date).format(
            'MMMM D, YYYY'
          ),
          subheading: 'Release Date',
          bg:
            'linear-gradient(180deg, rgba(66,39,90,1) 40%, rgba(115,75,109,1) 100%)',
        }}
      />
    </div>
  );
};

export default TrackStat;
