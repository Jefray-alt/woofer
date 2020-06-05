import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  const item = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        yoyo: Infinity,
        repeatDelay: 1,
        ease: 'backInOut',
      },
    },
    hidden: {
      opacity: 0,
      y: -100,
    },
  };

  const list = {
    visible: {
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
    hidden: {
      transition: {
        when: 'afterChildren',
      },
    },
  };
  return (
    <div className='loading-container'>
      <motion.ul
        className='loading'
        initial='hidden'
        animate='visible'
        variants={list}
      >
        <motion.li variants={item} />
        <motion.li variants={item} />
        <motion.li variants={item} />
      </motion.ul>
      <h2>LOADING...</h2>
    </div>
  );
};

export default Loading;
