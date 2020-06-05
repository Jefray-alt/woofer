import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const SliderItem = ({ item, history }) => {
  const viewItem = (e) => {
    e.preventDefault();
    history.push(`/profile/${item.id}`);
  };
  return (
    <div>
      <div className='slider-item'>
        {item.images.length !== 0 ? (
          <img
            src={item.images[0].url}
            alt='item'
            className='item-image'
            onClick={viewItem}
          />
        ) : (
          <div className='no-img'>
            <h5>No Image</h5>
          </div>
        )}
        <h4>{item.name}</h4>
        {item.artists && (
          <div className='artist-name'>
            {item.artists.map((artist) => {
              return (
                <span
                  className={item.artists.length > 1 ? 'multiple' : ''}
                  key={artist.id}
                >
                  {artist.name}
                </span>
              );
            })}
          </div>
        )}
        {item.owner && (
          <div className='artist-name'>
            <span
              className={item.owner.length > 1 ? 'multiple' : ''}
              key={item.owner.id}
            >
              {item.owner.display_name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

SliderItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withRouter(SliderItem);
