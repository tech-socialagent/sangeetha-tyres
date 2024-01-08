import React from 'react'
import styles from '@/styles/Home/TyreBrands.module.css'
import Image from 'next/image'
import SectionHeader from '../Common/SectionHeader'

const TyreBrands = () => {

    const types = [
        {
            id: 1,
            image: '/assests/home/logos/image1.png',
        },
        {
            id: 1,
            image: '/assests/home/logos/image2.png',
        },
        {
            id: 1,
            image: '/assests/home/logos/image3.png',
        },
        {
            id: 1,
            image: '/assests/home/logos/image4.png',
        },
        {
            id: 1,
            image: '/assests/home/logos/image5.png',
        },
    ];

    return (
        <div className="" id='brand' >
            <div className={styles.sectionWrap}>
                <SectionHeader title='Tyre Brands' desc='Fuel your ride with top tyre brand expertise and our exceptional service for an unparalleled experience' />
                <div className={styles.brandList}>
                    {types.map((item) => (
                        <div key={item.id} className={styles.imageContainer}>
                            <Image className={styles.img} src={item.image} alt='image' width={1000} height={1000} />
                        </div>
                    ))}
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