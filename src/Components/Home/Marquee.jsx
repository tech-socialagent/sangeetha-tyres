import React from 'react';
import styles from '@/styles/Home/marquee.module.css';
import { GiCarWheel } from 'react-icons/gi';

const Marq = () => {
  return (
    <div className={styles.marqueeContainer}>
        <marquee>Marquee here</marquee>
    </div>
  )
}

export default Marq;