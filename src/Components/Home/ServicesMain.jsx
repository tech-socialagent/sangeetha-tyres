import React, { useRef } from 'react';
import styles from '@/styles/Home/ServicesMain.module.css';
import SectionHeader from '../SectionHeader';
import Image from 'next/image';
import { serviceData } from '@/data';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const ServicesMain = () => {

    const scrl = useRef();

    const slide = (shift) => {
        const scrollOptions = {
            left: scrl.current.scrollLeft + shift,
            behavior: 'smooth'
        };
        scrl.current.scrollTo(scrollOptions);
    };

    return (
        <div className={styles.servicesWrap}>
            <SectionHeader title='Our Services' desc='' pad='0 2%'/>
            <div className={styles.servicesMain}>
                <div className={styles.left}><span onClick={() => slide(-300)}><IoIosArrowDropleftCircle /></span></div>
                <div className={styles.servicesContainer} ref={scrl}>
                    {serviceData.map((item) => (
                        <div className={styles.eachService}>
                            <div className={styles.eachImageContainer}>
                                <Image src={item.serviceImage} alt='Service' width={1000} height={1000} className={styles.eachImage} />
                                <button className={styles.serviceBooking}>Book now</button>
                            </div>
                            <p>{item.desc}</p>
                            <div className={styles.eachbottom}>
                                <h5>{item.name}</h5>
                                <span><MdOutlineArrowForwardIos /></span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.left}><span onClick={() => slide(+300)}><IoIosArrowDroprightCircle /></span></div>
            </div>
        </div>
    )
}

export default ServicesMain;