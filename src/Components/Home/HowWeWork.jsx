import React from 'react'
import styles from '@/styles/Home/HowWeWork.module.css'
import Image from 'next/image'

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
            img: require("../../../public/assests/icons/tyre.png")
        },
        {
            title: "FIND THE RIGHT TYRES?",
            desc: "Choose from a wide range of tyre brands",
            img: require("../../../public/assests/icons/tyre.png")
        },
    ]


    return (
        <div className={styles.sectionWrap}>
            <div className={styles.top}>
                <h2>How we work?</h2>
                <p>Revving up safety is our priority at Sangeetha Tyre.
                    We provide top-notch tyre solutions and customer service for a secure & satisfying drive
                </p>
            </div>
            <div className={styles.bottom}>
                {
                    data.map((item, key) => (
                        <div key={key} className={styles.cardWrap}>
                            <Image src={item.img} alt="icon" className={styles.icon} />
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HowWeWork