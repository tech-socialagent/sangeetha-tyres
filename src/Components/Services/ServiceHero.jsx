import React, { useEffect } from 'react'
import styles from '@/styles/Services/ServicesHero.module.css'
import Image from 'next/image'

const ServiceHero = ({ data }) => {
    if (!data) {
        // Handle the case when data is null
        return null; // Or display a loading message or component
    }
    return (
        <div className={styles.sectionWrap}>
            <Image src={data.heroImage} alt='image' className={styles.img} width={1000} height={1000}/>
            <Image src='/assests/Services/background.png' width={1000} height={1000} className={styles.backgroundPic} /> 
            <div className={styles.infoCard}>
                <div className={styles.title}>
                    {/* Precision Balanced: Your <span className={styles.highlight} >Drive Perfected</span> */}
                    {data.heroTitle}
                </div>
                <div className={styles.desc}>
                    {data.heroDesc}
                </div>
                <button>BOOK AN APPOINTMENT</button>
            </div>
        </div>
    )
}

export default ServiceHero