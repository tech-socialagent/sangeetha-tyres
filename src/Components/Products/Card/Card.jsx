import React from 'react';
import styles from '@/styles/Products/Card/Card.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Card = ({ data }) => {

    const router = useRouter();

    const handleClick = (e, id) => {
        e.preventDefault();

        router.push(`/products/${id}`)
    }

    return (
        <div className={styles.eachProduct}>
            <div className={styles.productImageContainer}>
                <Image src={data.images[0]} alt='Product Image' width={1000} height={1000} className={styles.productName} />
            </div>
            <div className={styles.productDesc}>
                <div className={styles.productTitle}>
                    <Image src='' alt='brand' width={1000} height={1000} className={styles.brandImage} />
                    <h2>Rs. {data.price}</h2>
                </div>
                <h4>{data.tyreType}</h4>
                <h6>Tyre Size : {data.tyreSize}</h6>
                <button className={styles.enquiryBtn}  onClick={(e) => handleClick(e,data.skuCode)}>ENQUIRY</button>
            </div>
        </div>
    )
}

export default Card;