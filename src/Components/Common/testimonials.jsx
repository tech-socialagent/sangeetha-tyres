import React, { useState } from 'react';
import styles from '@/styles/Common/testimonials.module.css';
import SectionHeader from '../SectionHeader';
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
            review: `I highly recommend Sangeetha Tyres, especially for Mercedes owners like Robert! His driving experience has significantly improved, thanks to their exceptional quality tires and consistently friendly customer service. Their commitment to excellence truly enhances the overall ownership experience`,
            name: 'Arjun',
        },
        {
            id: 2,
            review: `Sangeetha Tyre has remarkably transformed my Audi's performance! My car rides exceptionally smoothly now, all thanks to their top-notch products and highly skilled staff. Their exceptional dedication to excellence truly sets them apart in the industry.`,
            name: 'Karthik',
        },
        {
            id: 3,
            review: `Highly Impressed by Sangeetha Tyre's Expertise! My Innova handles like an absolute dream, all thanks to their unwavering commitment to delivering reliable, durable, and top-quality tires`,
            name: 'Raheem Khan',
        },
        {
            id: 4,
            review: `I highly recommend Sangeetha Tyres, especially for Mercedes owners like Robert! His driving experience has significantly improved, thanks to their exceptional quality tires and consistently friendly customer service. Their commitment to excellence truly enhances the overall ownership experience`,
            name: 'Arjun',
        },
        {
            id: 5,
            review: `Sangeetha Tyre has remarkably transformed my Audi's performance! My car rides exceptionally smoothly now, all thanks to their top-notch products and highly skilled staff. Their exceptional dedication to excellence truly sets them apart in the industry.`,
            name: 'Karthik',
        },
        {
            id: 6,
            review: `Highly Impressed by Sangeetha Tyre's Expertise! My Innova handles like an absolute dream, all thanks to their unwavering commitment to delivering reliable, durable, and top-quality tires`,
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
                                <h5>{item.name}</h5>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Testimonials;