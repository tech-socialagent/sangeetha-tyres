import React, { useState } from 'react'
import styles from '@/styles/Products/SingleProduct.module.css';
import Image from 'next/image';
import SectionHeader from '../Common/SectionHeader';

const SingleProduct = ({ data }) => {

    const [center, setCenter] = useState(data.images[0]);

    return (
        <div className={styles.productWrap}>
            <div className={styles.productView}>
                <div className={styles.images}>
                    <div className={styles.scrollingImages}>
                        {data.images.map((item, id) => (
                            <div 
                                className={styles.scrollingImageContainer} 
                                key={id}
                                onClick={() => setCenter(item)}
                            >
                                <Image src={item} alt='product' width={1000} height={1000} className={styles.scrollingImage} />
                            </div>
                        ))}
                    </div>
                    <Image src={center} alt='Product Image' width={1000} height={1000} className={styles.centerImage} />
                </div>
                <div className={styles.details}>
                    <Image src={data.brandImage} alt='brand' width={1000} height={1000} className={styles.brandImage} />
                    <h6>{data.name}</h6>
                    <h1>{data.id}</h1>
                    <h2>{data.mrp}</h2>
                    <h5>Inclusive of all taxes</h5>
                    <button className={styles.detailsBtn}>SEND ENQUIRY</button>
                </div>
            </div>
            <SectionHeader title='QUICK OVERVIEW' desc={data.title} />
            <div className={styles.overview}>
                <div className={styles.overviewContainer}>
                    <div className={styles.eachOverview}>
                        <h5>Width</h5>
                        <p>{data.width}</p>
                    </div>
                    <div className={styles.eachOverview}>
                        <h5>Rim Diameter in Inches</h5>
                        <p>{data.rim}</p>
                    </div>
                    <div className={styles.eachOverview}>
                        <h5>Speed Rating</h5>
                        <p>{data.speed}</p>
                    </div>
                </div>
                <div className={styles.overviewContainer}>
                    <div className={styles.eachOverview}>
                        <h5>Aspect Ratio</h5>
                        <p>{data.ratio}</p>
                    </div>
                    <div className={styles.eachOverview}>
                        <h5>Load Index</h5>
                        <p>{data.loadIndex}</p>
                    </div>
                    <div className={styles.eachOverview}>
                        <h5>Tubeless</h5>
                        <p>{data.tubeless ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;