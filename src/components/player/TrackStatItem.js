import React from 'react';
import PropTypes from 'prop-types';

const TrackStatItem = ({ item }) => {
  return (
    <div className='trackstat-item' style={{ background: item.bg }}>
      <p className='value'>
        {Array.isArray(item.data)
          ? item.data.map((i) => {
              return <span key={i.id}>{i.name}</span>;
            })
          : item.data}
      </p>
      <h5 className='subheading'>{item.subheading}</h5>
    </div>
  );
};

TrackStatItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TrackStatItem;
