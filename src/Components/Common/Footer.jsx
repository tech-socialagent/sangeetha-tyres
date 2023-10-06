import React from 'react';
import styles from '@/styles/Common/Footer.module.css';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { BiLogoLinkedin, BiLogoFacebook, BiLogoTwitter } from 'react-icons/bi';

const Footer = () => {

    const menuData = [
        {
            id: 1,
            header: 'Home',
            menus: [
                {
                    id: 1,
                    name: 'Our vision',
                    url: '/'
                },
                {
                    id: 2,
                    name: 'Brands',
                    url: '/'
                },
                {
                    id: 3,
                    name: 'Testimonials',
                    url: '/'
                },
                {
                    id: 4,
                    name: 'Book an appointment',
                    url: '/'
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
                    url: '/'
                },
                {
                    id: 2,
                    name: 'Wheel balancing',
                    url: '/'
                },
                {
                    id: 3,
                    name: 'Tyre fitting',
                    url: '/'
                },
                {
                    id: 4,
                    name: 'AC gas refil',
                    url: '/'
                },
                {
                    id: 5,
                    name: 'Engine carbon cleaning',
                    url: '/'
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
                    url: '/'
                },
                {
                    id: 2,
                    name: 'Contact us',
                    url: '/'
                },
            ]
        },
    ];

    return (
        <div className={styles.footerWrap}>
            <div className={styles.footerLeft}>
                <div className={styles.footerLogo}>
                    <Image src='' alt="Logo" width={1000} height={1000} className={styles.logo} />
                </div>
                <div className={styles.subscribe}>
                    <h5>Subscribe</h5>
                    <div className={styles.inputContainer}>
                        <input type='email' placeholder='Email Address' />
                        <button><FaArrowRight /></button>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur. Posuere volutpat vitae mattis etiam.</p>
                </div>
            </div>
            <div className={styles.footerRight}>
                <div className={styles.footerTop}>
                    {menuData.map((item, id) => (
                        <div className={styles.menus} key={id}>
                            <h3>{item.header}</h3>
                            <ul>
                                {item.menus.map((each) => (
                                    <li className={styles.menu}>{each.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className={styles.footerBottom}>
                    <div className={styles.terms}>
                        <ul>
                            <li>Terms</li>
                            <li>Privacy</li>
                            <li>Cookies</li>
                        </ul>
                    </div>
                    <div className={styles.icons}>
                        <div className={styles.eachIcon}><BiLogoLinkedin /></div>
                        <div className={styles.eachIcon}><BiLogoFacebook /></div>
                        <div className={styles.eachIcon}><BiLogoTwitter /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer