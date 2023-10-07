import React, { useState } from 'react';
import styles from '@/styles/Home/Search.module.css';
import Image from 'next/image';

const Search = () => {

    const [data, setData] = useState(
        {
            tyreType: 'car',
            searchType: 'size',
            width: '',
            ratio: '',
            rim: '',
        }
    );

    return (
        <div className={styles.searchWrap}>
            <div className={styles.searchLeft}>
                <div className={styles.search}>
                    <h2>Search the right tyre</h2>
                    <div className={styles.buttons}>
                        <button>Car Tyres</button>
                        <button>Truck Tyres</button>
                    </div>
                    <div className={styles.options}>
                        <div className={styles.option}>
                            <input type='checkbox' id='size' />
                            <label htmlFor='size'>By Tyre Size</label>
                        </div>
                        <div className={styles.option}>
                            <input type='checkbox' id='brand' />
                            <label htmlFor='brand'>By Tyre Brand</label>
                        </div>
                    </div>
                    <div className={styles.measurementWrap}>
                        <h6>Tyre Size Guide</h6>
                        <div className={styles.sections}>
                            <select>
                                <option selected disabled>Width</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            <select>
                                <option selected disabled>Ratio</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            <select>
                                <option selected disabled>Rim</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                    </div>
                    <button className={styles.searchBtn}>SEARCH</button>
                </div>
                <p className={styles.help}>Need Help?</p>
            </div>
            <div className={styles.searchRight}>
                <Image src='/assests/Services/alignment/banner.webp' alt='Search Image' width={1000} height={1000} className={styles.rightImage} />
            </div>
        </div>
    )
}

export default Search;