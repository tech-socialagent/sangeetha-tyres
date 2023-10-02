import React from 'react'
import styles from '@/styles/Home/TyreBrands.module.css'
import Image from 'next/image'
import bridgestone from '../../../public/assests/tyreBrandsLogo/bridgestone.webp'

const TyreBrands = () => {
    return (
        <div className="">
            <div className={styles.sectionWrap}>
                <h1>Tyre Brands</h1>
                <p>Fuel your ride with top tyre brand expertise and our exceptional service for an unparalleled experience</p>
                <div className={styles.brandList}>
                    <Image className={styles.img} src={bridgestone} alt='image' />
                    <Image className={styles.img} src={bridgestone} alt='image' />
                    <Image className={styles.img} src={bridgestone} alt='image' />
                    <Image className={styles.img} src={bridgestone} alt='image' />
                    <Image className={styles.img} src={bridgestone} alt='image' />
                </div>

            </div>
            <div className={styles.didYouKnow}>
                <div className={styles.heading}>
                    DID you know?
                </div>
                <div className={styles.desc}>
                    The largest tyre manufacturer in the world is Bridgestone.
                </div>
            </div>
        </div>
    )
}

export default TyreBrands