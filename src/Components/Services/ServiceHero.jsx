import React, { useEffect } from 'react'
import styles from '@/styles/Services/ServicesHero.module.css'
import Image from 'next/image'
import img from '../../../public/assests/Services/drivePerfected.webp'

const ServiceHero = ({ data }) => {
    if (!data) {
        // Handle the case when data is null
        return null; // Or display a loading message or component
    }
    return (
        <div className={styles.sectionWrap}>
            <Image src={img} alt='image' className={styles.img} />
            <div className={styles.infoCardWrap}>
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
        </div>
    )
}

export default ServiceHero