import React, { useEffect, useState } from 'react'
import styles from '@/styles/Products/IndividualProduct.module.css'
import Navbar from '@/Components/Common/Navbar'
import Footer from '@/Components/Common/Footer'
import SingleProduct from '@/Components/Products/SingleProduct'
import { useRouter } from 'next/router';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../FirebaseConfig';

const IndividualProduct = () => {
    const [productData, setProductData] = useState([])
    const router = useRouter();

    // Get the current URL
    const currentUrl = router.query.product;

    useEffect(() => {
        const readData = async () => {
            if (currentUrl) {
                const q = query(collection(db, "products"), where("skuCode", "==", currentUrl));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setProductData(doc.data());
                });
            }
        };

        readData();
    }, [currentUrl]);

    

    return (
        <div>
            <Navbar />
            <div className={styles.banner}>
                <h3>BRIDGESTONE TYRE CATEGORIES</h3>
            </div>
            <SingleProduct data={productData} />
            <Footer />
        </div>
    )
}

export default IndividualProduct