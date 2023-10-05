import React from 'react'
import styles from '@/styles/Home/HowWeWork.module.css'
import Image from 'next/image'
import SectionHeader from '../Common/SectionHeader'

const HowWeWork = () => {

    const data = [
        {
            title: "FIND THE RIGHT TYRES?",
            desc: "Choose from a wide range of tyre brands",
            img: require("../../../public/assests/icons/tyre.png")
        },
        {
            title: "FIND THE RIGHT TYRES?",
            desc: "Choose from a wide range of tyre brands",
            img: require("../../../public/assests/icons/man.png")
        },
        {
            title: "FIND THE RIGHT TYRES?",
            desc: "Choose from a wide range of tyre brands",
            img: require("../../../public/assests/icons/car.png")
        },
    ]


    return (
        <div className={styles.sectionWrap}>
            <SectionHeader title='How we work?' desc=<>Revving up safety is our priority at Sangeetha Tyre<br />.We provide top-notch tyre solutions and customer service for a secure & satisfying drive</> align='center' />
            <div className={styles.bottom}>
                {
                    data.map((item, key) => (
                        <div key={key} className={styles.cardWrap}>
                            <Image src={item.img} alt="icon" className={styles.icon} />
                            <div className={styles.textContainer}>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HowWeWork