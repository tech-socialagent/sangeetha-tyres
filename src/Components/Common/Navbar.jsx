import React, { useEffect, useState } from 'react';
import styles from '@/styles/Common/Navbar.module.css';
//import { AiOutlineSearch } from 'react-icons/ai';
//import { IoLocationOutline } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {

    const router = useRouter();

    // Access the current URL
    const currentURL = router.asPath;

    // Determine the current page
    const page = router.pathname;

    return (
        <>
            <div className={styles.navbarWrap}>
                <div className={styles.navbarTop}>
                    <Image src='' alt='TYRES' width={1000} height={1000} className={styles.navbarLogo} />
                    <ul className={styles.navbarMenus}>
                        <Link href='/'>
                            <li style={{ color: currentURL === '/' ? 'var(--Orange)' : '#000' }}>Home</li>
                        </Link>
                        <Link href='/services'>
                            <li style={{ color: page === '/services' || page === '/services/[service]' ? 'var(--Orange)' : '#000' }}>Services</li>
                        </Link>
                        <Link href='/#contactUs'>
                            <li style={{ color: currentURL === '/#contactUs' ? 'var(--Orange)' : '#000' }}>Contact us</li>
                        </Link>
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
            <div className={styles.spacer}></div>
        </>
    )
}

export default Navbar;