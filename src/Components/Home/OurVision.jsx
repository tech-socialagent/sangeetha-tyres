import React from 'react';
import styles from '@/styles/Home/OurVision.module.css';
import Image from 'next/image';
import img from '../../../public/assests/location.webp';
import { BsArrowRightShort } from 'react-icons/bs';

const OurVision = () => {
    return (
        <div className={styles.sectionWrap}>
            <div className={styles.contentWrap}>
                <h1>OUR VISION</h1>
                <p>To lead the industry with innovation and excellence, delivering top-quality products and services that redefine the driving experience. We aspire to be the preferred choice for automotive enthusiasts, setting new standards in performance, safety...</p>
                <div className={styles.readMore}><p>Read More</p><span><BsArrowRightShort /></span></div>
            </div>
            <Image src={img} className={styles.img} alt='image' />
        </div>
    )
}

export default OurVision;