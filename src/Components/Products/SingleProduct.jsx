import React, { useEffect, useState } from 'react';
import styles from '@/styles/Products/SingleProduct.module.css';
import Image from 'next/image';
import SectionHeader from '../Common/SectionHeader';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../FirebaseConfig'
import Head from 'next/head';

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
                setTyreBrand(doc.data());
            });
        }
    }

    useEffect(() => {
        readData();
    }, [data.tyreBrand])

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price); // Ensure price is a valid number
        if (!isNaN(numericPrice)) {
            return numericPrice.toLocaleString();
        } else {
            return price; // Return original value if it's not a valid number
        }
    };

    return (
        <>
            <Head>
                <title>{data.title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>F
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
                        <h1>{data.title}</h1>
                        <h6>{data.description}</h6>
                        <h2>M.R.P : &nbsp; <span className={styles.compareAtPrice} > ₹{formatPrice(data.compareAtPrice)}</span>  ₹{formatPrice(data.price)}</h2>
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
                                <p>{data.tyreWidth == 'null' ? '-' : data.tyreWidth}</p>
                            </div>
                            <div className={styles.eachOverview}>
                                <h5>Tyre size</h5>
                                <p>{data.tyreSize == 'null' ? '-' : data.tyreSize}</p>
                            </div>
                            <div className={styles.eachOverview}>
                                <h5>Tyre pattern</h5>
                                <p>{data.tyrePattern == 'null' ? '-' : data.tyrePattern}</p>
                            </div>
                        </div>
                        <div className={styles.overviewContainer}>
                            <div className={styles.eachOverview}>
                                <h5>Tyre Aspect</h5>
                                <p>{data.tyreAspect == 'null' ? '-' : data.tyreAspect}</p>
                            </div>
                            <div className={styles.eachOverview}>
                                <h5>Tyre type</h5>
                                <p>{data.tyreType == 'null' ? '-' : data.tyreType}</p>
                            </div>
                            {/* <div className={styles.eachOverview}>
                            <h5>Status</h5>
                            <p>{data.status == 'null' ? '-' : data.status}</p>
                        </div> */}
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
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProduct;
