import React from 'react';
import styles from '@/styles/Services/ServiceBanner.module.css';
import Image from 'next/image';

const ServiceBanner = () => {
  return (
    <div className={styles.bannerWrap}>
        <Image src='/assests/Services/ServiceBanner.webp' alt='banner' width={1000} height={1000} className={styles.bannerImage}/>
        <div className={styles.bannerContent}>
            <h2>Our Services</h2>
            <p>Comprehensive Tire Services: From Installation to Maintenance, We've Got Your Wheels Covered. Trust <br /> Our Expertise for Safety, Performance, and a Smooth Ride. Explore Our Tire Solutions Today</p>
        </div>
    </div>
  )
}

export default ServiceBanner