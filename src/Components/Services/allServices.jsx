import React from 'react';
import styles from '@/styles/Services/allServices.module.css';
import { useRouter } from 'next/router';
import { serviceData } from '@/data';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Image from 'next/image';
import SectionHeader from '../Common/SectionHeader';

const AllServices = ({text}) => {

    const router = useRouter();

    // Access the current URL
    const currentURL = router.asPath;

    // Split the URL path by '/' and get the last segment
    const segments = currentURL.split('/');
    const serviceSegment = segments[segments.length - 1];

    const display = serviceData.filter((item) => item.id !== serviceSegment)

    const handleClick = (e,id) => {
        e.preventDefault();
        router.push(`/services/${id}`)
    }

    return (
        <>
            { serviceData.length > display.length && <SectionHeader title=<>Other <span style={{color:'var(--Orange)'}}> Services</span></> align='center'/>}
            <div className={styles.servicesContainer}>
                {display.map((item) => (
                    <div className={styles.eachService}>
                        <div className={styles.eachImageContainer}>
                            <Image src={item.serviceImage} alt='Service' width={1000} height={1000} className={styles.eachImage} />
                            <button className={styles.serviceBooking}>Book now</button>
                        </div>
                        <p>{item.desc}</p>
                        <div className={styles.eachbottom} onClick={(e) => handleClick(e,item.id)}>
                            <h5>{item.name}</h5>
                            <span><MdOutlineArrowForwardIos /></span>
                        </div>
                    </div>
                ))}
            </div>
            { text !== false  && <div className={styles.textContainer}>
                <div className={styles.text}>
                    <h2>Retreads cost less than new tires, saving money while ensuring safety</h2>
                </div>
            </div>}
        </>
    )
}

export default AllServices