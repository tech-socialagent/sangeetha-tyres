import React from 'react';
import styles from '@/styles/Home/marquee.module.css';
import tyreGIF from '../../../public/assests/home/tyre.gif';
import car from '../../../public/assests/home/car.png';
import Image from 'next/image';

const HeaderMarquee = () => {
  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marquee}>
        <span>
          <div className={styles.imageText}>
            <Image src={tyreGIF} alt='gif' className={styles.gifContainer} />
            Traction You Can Trust Quality Tires for Safety&nbsp;&nbsp;&nbsp;
          </div>
        </span>
      </div>
      <div className={`${styles.marquee} ${styles.marquee2}`}>
      <span>
          <div className={styles.imageText}>
            <Image src={car} alt='gif' className={styles.gifContainer} />
            Smooth Rides Ahead Discover Our Tire Selection&nbsp;&nbsp;&nbsp;          </div>
        </span>
      </div>
    </div>
  )
}

export default HeaderMarquee;