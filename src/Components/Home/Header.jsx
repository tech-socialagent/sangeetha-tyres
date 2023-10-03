import React from 'react';
import styles from '@/styles/Home/Header.module.css';
import logoVdo from '../../../public/assests/bannerVdo.mp4';

const Header = () => {
    return (
        <div className={styles.headerWrap}>
            <video src={logoVdo} muted autoPlay loop />
            <div className={styles.content}>
                <div className={styles.textContainer}>
                    <h5>YOUR ONE-STOP</h5>
                    <h1>Experience top-notch services: Wheel Alignment, Wheel Balancing, Tyre Fitting, AC Gas Refill, Engine Carbon Cleaning.</h1>
                </div>
                <button className={styles.headerBtn}>BOOK AN APPOINTMENT</button>
            </div>
        </div>
    )
}

export default Header