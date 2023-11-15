import React from 'react';
import styles from '@/styles/Home/OurVision.module.css';
import Image from 'next/image';
import img from '../../../public/assests/location.webp';
import { BsArrowRightShort } from 'react-icons/bs';

const OurVision = () => {
    return (
        <div className={styles.sectionWrap} id='ourVision'>
            <div className={styles.contentWrap}>
                <h1>OUR VISION</h1>
                <p style={{ paddingRight: '60px' }} >To be the industry leader in innovation and excellence, providing top-quality products that redefine the driving experience. We aim to set new standards in performance, safety, and sustainability, fostering lasting customer relationships and inspiring a global community of driving enthusiasts.</p>
                {/* <div className={styles.readMore}><p>Read More</p><span><BsArrowRightShort /></span></div> */}
            </div>
            <Image src={img} className={styles.img} alt='image' />
        </div>
    )
}

export default OurVision;