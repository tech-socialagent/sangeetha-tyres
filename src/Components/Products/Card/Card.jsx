import React, { useEffect, useState } from 'react';
import styles from '@/styles/Products/Card/Card.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../../FirebaseConfig'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Card = ({ data }) => {

    //Image Slider

    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrows: false,
        autoplay: false,
    };

    const [tyreBrand, setTyreBrand] = useState([])
    const router = useRouter();

    const handleClick = (e, id) => {
        e.preventDefault();

        router.push(`/products/${id}`)
    }

    const readData = async () => {
        const q = query(collection(db, "TyreBrands"), where("value", "==", data.tyreBrand));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // array.push()
            setTyreBrand(doc.data().image)
        });
    }

    useEffect(() => {
        readData();
    }, [data])

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price); // Ensure price is a valid number
        if (!isNaN(numericPrice)) {
            return numericPrice.toLocaleString();
        } else {
            return price; // Return original value if it's not a valid number
        }
    };

    return (
        <div className={styles.eachProduct}>
            <div className={styles.productImageContainer}>
                <Slider {...settings} className={styles.productImageContainer}>
                    {data.images.map((item) => (
                        <Image src={item} alt='Product Image' width={1000} height={1000} className={styles.productName} />
                    ))}
                </Slider>
            </div>
            <div className={styles.productDesc}>
                <div className={styles.productTitle}>
                    <Image src={tyreBrand} alt='brand' width={1000} height={1000} className={styles.brandImage} />
                    <h2>Rs. {formatPrice(data.price)}</h2>
                </div>
                <h4>{data.title}</h4>
                <h4>{data.tyreType}</h4>
                <h6>Tyre Size : {data.tyreSize}</h6>
                <button className={styles.enquiryBtn} onClick={(e) => handleClick(e, data.skuCode)}>ENQUIRY</button>
            </div>
        </div>
    )
}

export default Card;