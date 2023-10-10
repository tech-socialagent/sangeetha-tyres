import React, { useState } from 'react';
import styles from '@/styles/Home/Search.module.css';
import Image from 'next/image';

const Search = () => {


    const [data, setData] = useState(
        {
            tyreType: 'car',
            searchType: 'size',
            width: 'Width',
            ratio: 'Ratio',
            rim: 'Rim',
        }
    );

    // Function to handle checkbox changes
    const handleCheckboxChange = (event, value) => {
        setData({ ...data, searchType: value });
    };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
    }

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
                    <div className={styles.options}>
                        <div className={styles.option}>
                            <input type='checkbox' id='size' onChange={(e) => handleCheckboxChange(e, "size")} checked={data.searchType === 'size' ? true : false} />
                            <label htmlFor='size'>By Tyre Size</label>
                        </div>
                        <div className={styles.option}>
                            <input type='checkbox' id='brand' onChange={(e) => handleCheckboxChange(e, "brand")} checked={data.searchType === 'brand' ? true : false} />
                            <label htmlFor='brand'>By Tyre Brand</label>
                        </div>
                    </div>
                    <div className={styles.measurementWrap}>
                        <h6>Tyre Size Guide</h6>
                        <div className={styles.sections}>
                            <select
                                name="width"
                                value={data.width}
                                onChange={handleSelectChange}
                            >
                                <option selected disabled>Width</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            <select
                                name="ratio"
                                value={data.ratio}
                                onChange={handleSelectChange}
                            >
                                <option selected disabled>Ratio</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            <select
                                name="rim"
                                value={data.rim}
                                onChange={handleSelectChange}
                            >
                                <option selected disabled>Rim</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
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