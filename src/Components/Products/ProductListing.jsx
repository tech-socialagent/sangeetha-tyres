import React, { useEffect, useState } from 'react'
import styles from '@/styles/Products/Product.module.css'
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../FirebaseConfig'
import Card from './Card/Card';
import { TiTick } from 'react-icons/ti';

//Testing Data
// import { products } from './data';

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



    const [select, setSelect] = useState('All');

    const tyreBrand = [
        "Sturdo Passenger",
        "Ccopia",
        "Duelee",
        "Alenzo",
        "Potenzo",
    ]



    return (
        <div className={styles.sectionWrap}>
            <div className={styles.filterWrap} id='child'>
                <div className={styles.filterContainer}>
                    <div className={styles.filterTitle}>
                        <h3>Tyre Brand</h3>
                        {/* <span>{open === 'tyreBrand' ? '-' : '+'}</span> */}
                    </div>
                    <div className={styles.menuContainer}>
                        {tyreBrand.map((item) => (
                            <div className={styles.eachMenu} onClick={() => setSelect(item)}>
                                <div className={styles.square}>
                                    <span style={{ opacity: select === item ? '1' : '0' }}>
                                        <TiTick />
                                    </span>
                                </div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.productList}>
                {data.map((item) => (
                    <Card data={item} />
                ))}
            </div>
        </div>
    )
}

export default ProductListing;