import React from 'react';
import styles from '@/styles/Navbar.module.css';
//import { AiOutlineSearch } from 'react-icons/ai';
//import { IoLocationOutline } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className={styles.navbarWrap}>
            <div className={styles.navbarTop}>
                <Image src='' alt='TYRES' width={1000} height={1000} className={styles.navbarLogo} />
                <ul className={styles.navbarMenus}>
                    <li>Home</li>
                    <li>Services</li> 
                    <li>Contact us</li>
                </ul>
                <div className={styles.navbarIcons}>
                    {/*<span><AiOutlineSearch /></span>
                    <span><IoLocationOutline /></span>*/}
                </div>
            </div>
            <div className={styles.navbarBottom}>
                <div className={styles.BottomLeft}>
                    <div className={styles.brands}>
                        <p>Explore Brands</p>
                        <span><MdOutlineKeyboardArrowDown /></span>
                    </div>
                    <div className={styles.center}>
                        <p>Tyre re-tread center</p>
                    </div>
                </div>
                <button className={styles.navbarBtn}>Book an appointment</button>
            </div>
        </div>
    )
}

export default Navbar;