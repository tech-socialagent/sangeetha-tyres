import React, { useEffect, useState } from 'react';
import styles from '@/styles/Admin/ProductList.module.css';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import db from '../../FirebaseConfig';
import Image from 'next/image';
import { BiSolidEdit } from 'react-icons/bi';

const ProductList = ({ setProductData, setEditProduct }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, 'products'), orderBy('title'));

            const querySnapshot = await getDocs(q);
            const productData = [];

            querySnapshot.forEach((doc) => {
                // Collect data from each document
                const product = doc.data();
                productData.push(product);
            });

            // Set the collected data to the state
            setData(productData);
        };
        getData();
    }, []);

    // Function to format price with comma separation
    const formatPrice = (price) => {
        const numericPrice = parseFloat(price); // Ensure price is a valid number
        if (!isNaN(numericPrice)) {
            return numericPrice.toLocaleString();
        } else {
            return price; // Return original value if it's not a valid number
        }
    };


    const handleEdit = (item) => {
        setProductData(item)
        setEditProduct(true)
    }


    return (
        <div className={styles.SectionWrap}>
            <div className={styles.title}>Products</div>
            <table border={1} className={styles.table}>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>SKU Code</th>
                        <th>Price</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, key) => (
                        <tr key={key}>
                            <td>
                                <Image width={100} height={80} src={item.images[0]} alt="product" />
                            </td>
                            <td>{item.title}</td>
                            <td>{item.status}</td>
                            <td>{item.skuCode}</td>
                            <td className={styles.price}>{formatPrice(item.price)}</td>
                            <td onClick={() => handleEdit(item)} ><BiSolidEdit className={styles.editIcon} /> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
