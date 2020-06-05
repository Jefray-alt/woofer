import React from 'react';
import Slider from 'react-slick';
import SliderItem from './SliderItem';

const Carousel = ({ collection }) => {
  var settings = {
    slidesToShow: collection.length > 2 ? 3 : collection.length,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: collection.length > 1 ? 2 : collection.length,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {collection.map((item) => {
        return <SliderItem key={item.id} item={item} />;
      })}
    </Slider>
  );
};

export default Carousel;
