import React from 'react'
import styles from '@/styles/Home/CarSection.module.css'
import Image from 'next/image'
import carImg from '../../../public/assests/car.webp'

const CarSection = () => {
    return (
        <div className={styles.sectionWrap}>
            <div className={styles.content}>Experience <span className={styles.orange} >top-notch</span> car services with <span className={styles.whiteBg} >just a <span className={styles.orange} >click!</span></span></div>
            <Image className={styles.img} src={carImg} alt='imageCar' />
        </div>
    )
}

export default CarSection