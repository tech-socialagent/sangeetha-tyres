import React, { useState } from 'react'
import styles from '@/styles/Home/CarSection.module.css'
import Image from 'next/image'
import carImg from '../../../public/assests/car.webp'
import cleanCarImg from '../../../public/assests/cleanCar.webp'

const CarSection = () => {
    const [cleanCar, setCleanCar] = useState(false)
    return (
        <div className={styles.sectionWrap}
            onClick={() => setCleanCar(!cleanCar)}
        >
            <div className={styles.content}>Experience <span className={styles.orange} >top-notch</span> car services with <span className={styles.whiteBg} >just a <span className={styles.orange} >click!</span></span></div>
            <Image className={styles.img} src={cleanCar ? cleanCarImg : carImg} alt='imageCar' />
        </div>
    )
}

export default CarSection