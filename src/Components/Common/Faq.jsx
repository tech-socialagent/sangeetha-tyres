import React from 'react';
import styles from '@/styles/Common/Faq.module.css';
import SectionHeader from '../SectionHeader';
import { AiFillCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai';

const Faq = () => {

    const faqData = [
        {
            num: '01',
            ques: 'What types of tyres does Sangeetha Tyre offer?',
            ans: 'Sangeetha Tyre provides a wide range of tyres for various vehicles, including cars, SUVs, and motorcycles.'
        },
        {
            num: '02',
            ques: 'Do they offer any warranty on their tyres?',
            ans: 'Sangeetha Tyre provides a wide range of tyres for various vehicles, including cars, SUVs, and motorcycles.'
        },
        {
            num: '03',
            ques: 'Can I schedule a tyre installation appointment online?',
            ans: 'Sangeetha Tyre provides a wide range of tyres for various vehicles, including cars, SUVs, and motorcycles.'
        },
        {
            num: '04',
            ques: 'Can I get professional help in choosing the right tyres for my vehicle?',
            ans: 'Sangeetha Tyre provides a wide range of tyres for various vehicles, including cars, SUVs, and motorcycles.'
        },
    ];

    return (
        <div className={styles.faqWrap}>
            <SectionHeader title="FAQ's" desc="Tyre Talk! The secrets for a Gripping and Safe Ride." />
            <div className={styles.faqMain}>
                {faqData.map((item, id) => (
                    <div className={styles.eachFaq} key={id}>
                        <div className={styles.eachLeft}>
                            <span>{item.num}</span>
                        </div>
                        <div className={styles.eachRight}>
                            <h3>{item.ques}</h3>
                            <p>{item.ans}</p>
                        </div>
                        <div className={styles.close}>
                            <span><AiOutlinePlusCircle /></span>
                            <span><AiFillCloseCircle /></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Faq;