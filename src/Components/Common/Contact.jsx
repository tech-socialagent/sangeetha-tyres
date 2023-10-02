import React from 'react'
import styles from '@/styles/Common/Contact.module.css'
import { FaLocationDot } from 'react-icons/fa6'
import { AiFillInstagram } from 'react-icons/ai'
import Link from 'next/link'

const Contact = () => {
    return (
        <div className={styles.sectionWrap}>
            <form className={styles.formWrap}>
                <h1>Contact Us</h1>
                <input type="text" placeholder='Name' required />
                <input type="email" placeholder='Email' required />
                <textarea type="text" placeholder='Message' required />
                <div className={styles.chechBox}>
                    <input type="checkbox" required />
                    <p>I would like to receive the newsletter</p>
                </div>
                <input type="submit" />
            </form>
            <div className={styles.locWrap}>
                <div className={styles.address}>
                    Survey No 03, Village Krishnasagara, Attibele Anekal, Hobli, beside Nayara Fuel Station, Bengaluru, Karnataka 562107
                </div>
                <div className={styles.map}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9238165230786!2d77.65086047463102!3d12.912617916169593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156ddcc9e49f%3A0x9dc40c60fec016a0!2sSocial%20Agent!5e0!3m2!1sen!2sin!4v1696272188631!5m2!1sen!2sin" width="100%" height="250px" style={{ border: '0', borderRadius: '10px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className={styles.info}>
                    <div className={styles.infoWrap}>
                        <FaLocationDot className={styles.icon} />
                        <Link className={styles.infoLink} href=''>Bengaluru, Karnataka</Link>
                    </div>
                    <div className={styles.infoWrap}>
                        <FaLocationDot className={styles.icon} />
                        <Link className={styles.infoLink} href=''>Demo@gmail.com</Link>
                    </div>
                    <div className={styles.infoWrap}>
                        <FaLocationDot className={styles.icon} />
                        <Link className={styles.infoLink} href=''>Demo@gmail.com</Link>
                    </div>
                </div>
                <div className={styles.socialMedia}>
                    <Link href="" className={styles.socialIcon}><AiFillInstagram /></Link>
                    <Link href="" className={styles.socialIcon}><AiFillInstagram /></Link>
                    <Link href="" className={styles.socialIcon}><AiFillInstagram /></Link>
                    <Link href="" className={styles.socialIcon}><AiFillInstagram /></Link>
                </div>
            </div>
        </div>
    )
}

export default Contact