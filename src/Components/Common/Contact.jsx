import React from 'react'
import styles from '@/styles/Common/Contact.module.css'
import { FaLocationDot } from 'react-icons/fa6'
import { AiFillInstagram, AiOutlineMail, AiOutlineTwitter, AiFillYoutube } from 'react-icons/ai'
import { BiPhoneCall } from 'react-icons/bi';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link'
import SectionHeader from './SectionHeader'

const Contact = () => {
    return (
        <div className={styles.contactUs}>
            <SectionHeader title='Contact Us' />
            <div className={styles.sectionWrap}>
                <form className={styles.formWrap}>
                    <input type="text" placeholder='Name' required />
                    <input type="email" placeholder='Email' required />
                    <textarea type="text" placeholder='Message' required />
                    <div className={styles.chechBox}>
                        <input type="checkbox" required />
                        <p>I would like to receive the newsletter</p>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div className={styles.locWrap}>
                    <div className={styles.address}>
                        Survey No 03, Village Krishnasagara, Attibele Anekal, Hobli, beside Nayara Fuel Station, Bengaluru, Karnataka 562107
                    </div>
                    <div className={styles.map}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.9166712053657!2d77.7540662!3d12.7839207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae719c77b7ee79%3A0x5c6f7542b16a45f6!2sBridgestone%20Select%20-%20Sangeetha%20Tyre%20Solutions%20PVT.%20LTD!5e0!3m2!1sen!2sin!4v1700074257256!5m2!1sen!2sin" allowFullScreen={true} referrerPolicy="no-referrer"></iframe>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.infoWrap}>
                            <FaLocationDot className={styles.icon} />
                            <Link className={styles.infoLink} href=''>Bengaluru, Karnataka</Link>
                        </div>
                        <div className={styles.infoWrap}>
                            <BiPhoneCall className={styles.icon} />
                            <Link className={styles.infoLink} href='tel:+919939935899'><u>+91 9939935899</u></Link>
                        </div>
                        {/* <div className={styles.infoWrap}>
                            <AiOutlineMail className={styles.icon} />
                            <Link className={styles.infoLink} href=''>Demo@gmail.com</Link>
                        </div> */}
                    </div>
                    {/* <div className={styles.socialMedia}>
                        <Link href="" className={styles.socialIcon}><AiFillInstagram /></Link>
                        <Link href="" className={styles.socialIcon}><AiOutlineTwitter /></Link>
                        <Link href="" className={styles.socialIcon}><FaFacebook /></Link>
                        <Link href="" className={styles.socialIcon}><AiFillYoutube /></Link>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Contact;