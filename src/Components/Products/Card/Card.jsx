import React, { useEffect, useState } from 'react';
import styles from '@/styles/Products/Card/Card.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../../FirebaseConfig'

const Card = ({ data }) => {
    const [tyreBrand, setTyreBrand] = useState([])
    const router = useRouter();

    const handleClick = (e, id) => {
        e.preventDefault();

        router.push(`/products/${id}`)
    }

    const readData = async () => {
        const q = query(collection(db, "TyreBrands"), where("value", "==", data.tyreBrand));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // array.push()
            setTyreBrand(doc.data())
        });
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
        <div className={styles.eachProduct}>
            <div className={styles.productImageContainer}>
                <Image src={data.images[0]} alt='Product Image' width={1000} height={1000} className={styles.productName} />
            </div>
            <div className={styles.productDesc}>
                <div className={styles.productTitle}>
                    <Image src={tyreBrand.image} alt='brand' width={1000} height={1000} className={styles.brandImage} />
                    <h2>Rs. {formatPrice(data.price)}</h2>
                </div>
                <h4>{data.tyreType}</h4>
                <h6>Tyre Size : {data.tyreSize}</h6>
                <button className={styles.enquiryBtn} onClick={(e) => handleClick(e, data.skuCode)}>ENQUIRY</button>
            </div>
        </div>
    )
}

export default Card;