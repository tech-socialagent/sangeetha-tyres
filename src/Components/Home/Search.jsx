import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home/Search.module.css';
import Image from 'next/image';
import { collection, onSnapshot, } from "firebase/firestore";
import db from '../../FirebaseConfig'
import { useRouter } from 'next/router';

const Search = () => {
    const [tyreRim, setTyreRim] = useState([]);
    const [tyreSize, setTyreSize] = useState([]);
    const [tyreWidth, setTyreWidth] = useState([]);
    const router = useRouter();

    const [data, setData] = useState(
        {
            width: '',
            size: '',
            rim: '',
        }
    );

    // Function to handle checkbox changes
    // const handleCheckboxChange = (event, value) => {
    //     setData({ ...data, searchType: value });
    // };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Assuming your route is '/products', you can replace it with the correct route
        const route = '/products';

        // Build the query string based on the form data
        const queryString = Object.keys(data)
            .map(key => encodeURIComponent(key) + 'Param=' + encodeURIComponent(data[key]))
            .join('&');

        // Use the useRouter hook to push the new route with query parameters
        router.push({
            pathname: route,
            query: queryString,
        });
    }

    // Function to fetch data from Firestore for dropdowns
    useEffect(() => {
        const getData = async (collectionName) => {
            const q = collection(db, collectionName);
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const array = [];
                querySnapshot.forEach((doc) => {
                    array.push(doc.data());
                });
                switch (collectionName) {

                    case "TyreRim":
                        setTyreRim(array);
                        break;
                    case "TyreSize":
                        setTyreSize(array);
                        break;
                    case "TyreWidth":
                        setTyreWidth(array);
                        break;
                    default:
                        break;
                }
            });
        };

        getData("TyreRim");
        getData("TyreSize");
        getData("TyreWidth");
    }, []);

    return (
        <div className={styles.searchWrap}>
            <div className={styles.searchLeft}>
                <div className={styles.search}>
                    <h2>Search the right tyre</h2>
                    <div className={styles.buttons}>
                        <button
                            className={data.tyreType === 'car' ? styles.activeBtn : ''}
                            onClick={() => setData({ ...data, tyreType: 'car' })}
                        >
                            Car Tyres
                        </button>
                        <button
                            className={data.tyreType === 'truck' ? styles.activeBtn : ''}
                            onClick={() => setData({ ...data, tyreType: 'truck' })}
                        >
                            Truck Tyres
                        </button>
                    </div>
                    <div className={styles.measurementWrap}>
                        {/* <h6>Tyre Size Guide</h6> */}
                        <div className={styles.sections}>
                            <select
                                id="width"
                                name="width"
                                value={data.width}
                                required
                                onChange={handleSelectChange}
                            >
                                <option value="" disabled>Width</option>
                                {tyreWidth.map((item, key) => (
                                    item.value != 'null' ? <option key={key}>{item.value}</option> : ''
                                ))}
                            </select>
                            <select
                                name="size"
                                value={data.size}
                                required
                                onChange={handleSelectChange}
                            >
                                <option value="" disabled>Size</option>
                                {tyreSize.map((item, key) => (
                                    item.value != 'null' ? <option key={key}>{item.value}</option> : ''
                                ))}
                            </select>
                            <select
                                name="rim"
                                value={data.rim}
                                required
                                onChange={handleSelectChange}
                            >
                                <option value="" disabled>Rim</option>
                                {tyreRim.map((item, key) => (
                                    item.value != 'null' ? <option key={key}>{item.value}</option> : ''
                                ))}
                            </select>
                        </div>
                    </div>
                    <button className={styles.searchBtn} onClick={handleSubmit}>SEARCH</button>
                </div>
                <p className={styles.help}>Need Help?</p>
            </div>
            <div className={styles.searchRight}>
                <Image src='/assests/home/homeCar.png' alt='Search Image' width={1000} height={1000} className={styles.rightImage} />
            </div>
        </div>
    )
}

export default Search;