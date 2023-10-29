import React, { useEffect, useState } from 'react';
import styles from '@/styles/Products/SingleProduct.module.css';
import Image from 'next/image';
import SectionHeader from '../Common/SectionHeader';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../FirebaseConfig'

const SingleProduct = ({ data }) => {
    const [center, setCenter] = useState(data.images ? data.images[0] : null);
    const [tyreBrand, setTyreBrand] = useState([])

    useEffect(() => {
        setCenter(data.images ? data.images[0] : null)
    }, [data])

    const readData = async () => {
        if (data.tyreBrand) { // Ensure data.tyreBrand is defined
            const q = query(collection(db, "TyreBrands"), where("value", "==", data.tyreBrand));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // array.push()
                setTyreBrand(doc.data());
            });
        }
    }

    useEffect(() => {
        readData();
    }, [])

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price); // Ensure price is a valid number
        if (!isNaN(numericPrice)) {
            return numericPrice.toLocaleString();
        } else {
            return price; // Return original value if it's not a valid number
        }
    };

    return (
        <div className={styles.productWrap}>
            <div className={styles.productView}>
                <div className={styles.images}>
                    <div className={styles.scrollingImages}>
                        {data.images && data.images.map((item, id) => (
                            <div
                                className={styles.scrollingImageContainer}
                                key={id}
                                onClick={() => setCenter(item)}
                            >
                                <Image src={item} alt='product' width={1000} height={1000} className={styles.scrollingImage} />
                            </div>
                        ))}
                    </div>
                    {center && (
                        <Image src={center} alt='Product Image' width={1000} height={1000} className={styles.centerImage} />
                    )}
                </div>
                <div className={styles.details}>
                    {tyreBrand.image && (
                        <Image src={tyreBrand.image} alt='brand' width={1000} height={1000} className={styles.brandImage} />
                    )}
                    <h6>{data.title}</h6>
                    <h1>{data.description}</h1>
                    <h2>M.R.P : &nbsp;₹{formatPrice(data.price)}</h2>
                    <h5>Inclusive of all taxes</h5>
                    <button className={styles.detailsBtn}>SEND ENQUIRY</button>
                </div>
            </div>

            {/* Product Overview */}
            <div className={styles.overviewWrap}>
                <SectionHeader title='QUICK OVERVIEW' desc={data.title} align='center' />
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

            {/* Product Description */}
            <div className={styles.desc}>
                <div className={styles.title}>
                    {data.brandImage && (
                        <Image src={data.brandImage} alt='brand' width={1000} height={1000} className={styles.brandImage1} />
                    )}
                    <h1>{data.id}</h1>
                    <h5>{data.name}</h5>
                </div>
                <div className={styles.content}>
                    <h2>Description</h2>
                    <p>{data.desc}</p>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
