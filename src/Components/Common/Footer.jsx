import React from 'react';
import styles from '@/styles/Common/Footer.module.css';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { BiLogoLinkedin, BiLogoFacebook, BiLogoTwitter } from 'react-icons/bi';
import Link from 'next/link';
import logo from '../../../public/logo.png'

const Footer = () => {

    const menuData = [
        {
            id: 1,
            header: 'Home',
            menus: [
                {
                    id: 1,
                    name: 'Our vision',
                    url: '/#ourVision'
                },
                {
                    id: 2,
                    name: 'Brands',
                    url: '/#brand'
                },
                {
                    id: 3,
                    name: 'Testimonials',
                    url: '/#Testimonials'
                },
                {
                    id: 4,
                    name: 'Book an appointment',
                    url: 'tel:+919939935899'
                },
            ]
        },
        {
            id: 2,
            header: 'Services',
            menus: [
                {
                    id: 1,
                    name: 'Wheel alignment',
                    url: '/services/wheel-alignment'
                },
                {
                    id: 2,
                    name: 'Wheel balancing',
                    url: '/services/wheel-balancing'
                },
                {
                    id: 3,
                    name: 'Tyre fitting',
                    url: '/services/tyre-Fitting'
                },
                {
                    id: 4,
                    name: 'AC gas refil',
                    url: '/services/ac-Gas-Refil'
                },
                {
                    id: 5,
                    name: 'Engine carbon cleaning',
                    url: '/services/engine-Carbon-Cleaning'
                },
            ]
        },
        {
            id: 3,
            header: 'Company',
            menus: [
                {
                    id: 1,
                    name: 'About us',
                    url: '/#howWeWork'
                },
                {
                    id: 2,
                    name: 'Contact us',
                    url: '/#contactUs'
                },
            ]
        },
    ];

    return (
        <div className={styles.footerWrap}>
            <div className={styles.footerLeft}>
                <div className={styles.footerLogo}>
                    <Image src={logo} alt="Logo" width={1000} height={1000} className={styles.logo} />
                </div>
                <div className={styles.subscribe}>
                    <h5>Subscribe</h5>
                    <div className={styles.inputContainer}>
                        <input type='email' placeholder='Email Address' />
                        <button><FaArrowRight /></button>
                    </div>
                    <p></p>
                </div>
            </div>
            <div className={styles.footerRight}>
                <div className={styles.footerTop}>
                    {menuData.map((item, id) => (
                        <div className={styles.menus} key={id}>
                            <h3>{item.header}</h3>
                            <ul>
                                {item.menus.map((each) => (
                                    <li className={styles.menu}>
                                        <Link href={each.url}> {each.name}</Link>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className={styles.footerBottom}>
                    <div className={styles.terms}>
                        <ul>
                            {/* <li>Terms</li>
                            <li>Privacy</li>
                            <li>Cookies</li> */}
                        </ul>
                    </div>
                    <div className={styles.icons}>
                        {/* <div className={styles.eachIcon}><BiLogoLinkedin /></div>
                        <div className={styles.eachIcon}><BiLogoFacebook /></div>
                        <div className={styles.eachIcon}><BiLogoTwitter /></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer