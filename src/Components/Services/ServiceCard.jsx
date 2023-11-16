import React from 'react';
import styles from '@/styles/Services/serviceCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

const ServiceCard = ({ data }) => {
    if (!data) {
        return null;
    }
    return (
        <div className={styles.cardWrap}>
            <div className={styles.cards}>
                {data.card.map((data, id) => (
                    <div className={id === 1 ? styles.secondCard : styles.eachCard}>
                        {/* <div className={ styles.eachCard}> */}
                        <Image src={data.cardImg} alt='card iamge' width={1000} height={1000} className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h3>{data.cardTitle}</h3>
                            <p>{data.cardDesc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.cardAbout}>
                <h6>About {data.name}</h6>
                <h2>We Provide The Best Service for the <span>{data.aboutTitle}</span></h2>
                <p>{data.aboutDesc}</p>
                <div className={styles.bookAbout}>
                    <Image src={data.bookImg} width={1000} height={1000} className={styles.bookImage} />
                    <div className={styles.bookRight}>
                        {/* There will be sapn content */}
                        <h3>{data.bookTitle}</h3>
                        <p>{data.bookDesc}</p>
                        <Link href='tel:+919939935899'><button> BOOK AN APPOINTMENT</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard;