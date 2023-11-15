import React, { useRef } from 'react';
import styles from '@/styles/Home/ServicesMain.module.css';
import SectionHeader from '../Common/SectionHeader';
import Image from 'next/image';
import { serviceData } from '@/data';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { useRouter } from 'next/router';

const ServicesMain = () => {

    const scrl = useRef();
    const router = useRouter();

    const slide = (shift) => {
        const scrollOptions = {
            left: scrl.current.scrollLeft + shift,
            behavior: 'smooth'
        };
        scrl.current.scrollTo(scrollOptions);
    };

    return (
        <div className={styles.servicesWrap}>
            <SectionHeader title='Our Services' desc='' pad='0 2%' />
            <div className={styles.servicesMain}>
                <div className={styles.left}><span onClick={() => slide(-310)}><IoIosArrowDropleftCircle /></span></div>
                <div className={styles.servicesContainer} ref={scrl}>
                    {serviceData.map((item) => (
                        <div className={styles.eachService}
                        onClick={()=> router.push(`/services/${item.id}`)}
                        >
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
                <div className={styles.left}><span onClick={() => slide(+310)}><IoIosArrowDroprightCircle /></span></div>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.text}>
                    <h2 id='howWeWork' >Our tires are pros at the 'age-defying' game – they just keep rolling back the years</h2>
                </div>
            </div>
        </div>
    )
}

export default ServicesMain;