import React from 'react';
import PropTypes from 'prop-types';

const TrackStatItem = ({ item }) => {
  return (
    <div className='trackstat-item' style={{ background: item.bg }}>
      <p className='value' style={{ textAlign: 'center' }}>
        {Array.isArray(item.data) ? (
          <span key={item.data[0].id}>{item.data[0].name}</span>
        ) : (
          item.data
        )}
      </p>
      <h5 className='subheading'>{item.subheading}</h5>
    </div>
  );
};

TrackStatItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TrackStatItem;
