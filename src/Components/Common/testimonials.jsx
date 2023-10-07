import React, { useState } from 'react';
import styles from '@/styles/Common/testimonials.module.css';
import SectionHeader from './SectionHeader';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Testimonials = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2500,
        beforeChange: (current, next) => setSlideIndex(next),
        responsive: [
            {
                breakpoint: 750, // Adjust this value to your desired breakpoint
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const data = [
        {
            id: 1,
            review: `Prompt attention extended on services of Hearing Aid, supplied to me and all timely and efficient support given to me all these years is indeed an excellant job which I convey to yourTeam.Thanking you`,
            name: 'Mohan P',
        },
        {
            id: 2,
            review: `She has been using your machine since 25 years. Very happy with the product and the service provided.`,
            name: 'Yogendra Singh Rawat',
        },
        {
            id: 3,
            review: `Last 20 years i am using Siemens hearing aid from Shreya. And I always go to Shreya Indiranagar center. The service and suggestions they offered me over the years is awesome.`,
            name: 'Vinayak Koparkar',
        },
        {
            id: 4,
            review: `I have been a satisfied client of Shreya for two decades now. The service I have received from every member of the team has been consistent as well as professional. Thank You.`,
            name: 'Dev',
        },
        {
            id: 5,
            review: `Sangeetha Tyre has remarkably transformed my Audi's performance! My car rides exceptionally smoothly now, all thanks to their top-notch products and highly skilled staff. Their exceptional dedication to excellence truly sets them apart in the industry.`,
            name: 'Jeelani Herial',
        },
        {
            id: 6,
            review: `I have been using services from Shreya hearing clinic for more than ten years the service is exceptional. Ms Mona has been helpful in clarifying and addressing all the needs related to instrument and service .`,
            name: 'Raheem Khan',
        },
    ];

    return (
        <div className={styles.testWrap}>
            <SectionHeader title='Testimonials' desc='Combining the expertise of top tyre brands with our exceptional service for an unparalleled experience.' />
            <div className={styles.sliderContainer}>
                <Slider {...settings} className={styles.ReviewContainer}>
                    {data.map((item) => (
                        <div className={`${styles.eachSlider} ${item.id === slideIndex + 1 ? styles.eachSliderActive : ''}`}>
                            <div className={styles.content}>
                                <span><BiSolidQuoteAltLeft /></span>
                                <p>{item.review}</p>
                                <div className={styles.line} style={{borderBottom : item.id === slideIndex + 1 ? '1px solid #fff' : '1px solid var(--Dark-grey)'}}>
                                </div>
                                <h5 id='contactUs'>{item.name}</h5>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Testimonials;