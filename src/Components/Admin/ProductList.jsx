import React, { useEffect, useState } from 'react';
import styles from '@/styles/Admin/ProductList.module.css';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import db from '../../FirebaseConfig';
import Image from 'next/image';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { doc, deleteDoc } from "firebase/firestore";

const ProductList = ({ setProductData, setEditProduct }) => {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState('Title (A to Z)');
    const [titleSearch, setTitleSearch] = useState(''); // State for title search
    const [searchProperty, setSearchProperty] = useState('title'); // State for the selected search property

    const sortData = [
        {
            name: 'Title (A to Z)',
            query: 'title',
            sortBy: 'asc',
        },
        {
            name: 'Title (Z to A)',
            query: 'title',
            sortBy: 'desc',
        },
        {
            name: 'Date (Old to New)',
            query: 'updatedTime',
            sortBy: 'asc',
        },
        {
            name: 'Date (New to Old)',
            query: 'updatedTime',
            sortBy: 'desc',
        },
        {
            name: 'Price (High to Low)',
            query: 'price',
            sortBy: 'asc',
        },
        {
            name: 'Price (Low to High)',
            query: 'price',
            sortBy: 'desc',
        },
    ];

    const searchData = [
        {
            name: 'title',
            label: 'Title'
        },
        {
            name: 'skuCode',
            label: 'SKU Code'
        },
        {
            name: 'status',
            label: 'Status'
        },
    ];

    useEffect(() => {
        const sortOption = sortData.find((option) => option.name === sort);
        if (!sortOption) {
            // Handle invalid or missing sort option
            return;
        }

        const q = query(collection(db, 'products'), orderBy(sortOption.query, sortOption.sortBy));

        const fetchData = async () => {
            const querySnapshot = await getDocs(q);
            const productData = [];

            querySnapshot.forEach((doc) => {
                const product = doc.data();
                productData.push(product);
            });

            setData(productData);
        };

        fetchData();
    }, [sort]);

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
        setProductData(item);
        setEditProduct(true);
    }

    const handleDelete = async (skuCode) => {
        const result = window.confirm(`Do you want to delete this Product (SKU: ${skuCode})?`);

        if (result) {
            await deleteDoc(doc(db, "products", skuCode));
            // Refresh the page
            window.location.reload();
        } else {
            // User clicked "Cancel" or "No," do nothing or provide feedback
        }
    };

    // Filter the data based on the selected search property
    const filteredData = data.filter((item) => {
        return item[searchProperty].toLowerCase().includes(titleSearch.toLowerCase());
    });

    return (
        <div className={styles.SectionWrap}>
            <div className={styles.title}>Products</div>

            <div className="search-bar">
                <label htmlFor="titleSearch">Search</label><br></br>
                <select
                    name="searchProperty"
                    id="searchProperty"
                    value={searchProperty}
                    onChange={(e) => setSearchProperty(e.target.value)}
                >
                    {searchData.map((item, key) => (
                        <option key={key} value={item.name}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <input
                    id='titleSearch'
                    name='titleSearch'
                    type="text"
                    value={titleSearch}
                    onChange={(e) => setTitleSearch(e.target.value)}
                />
            </div>

            <div className={styles.sortSection}>
                <select
                    name="sort"
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    {sortData.map((item, key) => (
                        <option key={key} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <table border={1} className={styles.table}>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>SKU Code</th>
                        <th>Price</th>
                        <th>EDIT</th>
                        <th style={{ width: '50px' }}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, key) => (
                        <tr key={key}>
                            <td>
                                <Image width={100} height={80} src={item.images[0]} alt="product" />
                            </td>
                            <td>{item.title}</td>
                            <td>{item.status}</td>
                            <td>{item.skuCode}</td>
                            <td className={styles.price}>{formatPrice(item.price)}</td>
                            <td onClick={() => handleEdit(item)} ><BiSolidEdit className={styles.editIcon} /> </td>
                            <td onClick={() => handleDelete(item.skuCode)} ><MdDelete className={styles.deleteIcon} /> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;

