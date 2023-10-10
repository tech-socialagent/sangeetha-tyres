import React, { useEffect, useState } from 'react'
import styles from '@/styles/Products/Product.module.css'
import Image from 'next/image'
import dummy from '../../../public/assests/dummy.png'
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../FirebaseConfig'


const ProductListing = () => {
    const [data, setData] = useState([])

    const readData = async () => {
        let array = []
        const q = query(collection(db, "products"), where("status", "==", "Active"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            array.push(doc.data())
        });
        setData(array)
    }

    useEffect(() => {
        readData();
    }, [])
    return (
        <div className={styles.sectionWrap}>
            <div className={styles.leftFilter}>
                Filters
            </div>
            <div className={styles.rightProductList}>
                <p>Sort</p>
                <div className={styles.cardsWrap}>
                    {
                        data.map((item, key) => (
                            <div className={styles.cardWrap} key={key} >
                                <Image width={1000} height={1000} className={styles.image} src={item.images[0]} alt="tyre" />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px' }} >
                                    <div className={styles.brand}>{item.tyreBrand} </div>
                                    <div className={styles.price}>Rs. {item.price}</div>
                                </div>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.size}>Tyre Size: {item.tyreSize}</div>
                                <button>ENQUIRY</button>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default ProductListing