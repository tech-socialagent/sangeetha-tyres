import React from 'react'
import styles from '@/styles/Products/IndividualProduct.module.css'
import Navbar from '@/Components/Common/Navbar'
import Footer from '@/Components/Common/Footer'
import SingleProduct from '@/Components/Products/SingleProduct'

const IndividualProduct = () => {

    const productData = {
        id:'135/70R12',
        name:'Sturdo passenger',
        brandImage:'/assests/home/logos/image1.png',
        mrp:'4,999.00',
        images:[
            "/assests/Products/demo/demo1.png",
            "/assests/Products/demo/demo2.png",
            "/assests/Products/demo/demo3.png",
            "/assests/Products/demo/demo4.png"
        ],
        width:'165',
        rim:'14',
        speed:'T',
        ratio:'70',
        loadIndex:'81',
        tubeless: true,

        //Section Header
        title:'BRIDGESTONE - STRUDO PASSENGER'
    };

    return (
        <div>
            <Navbar />
            <div className={styles.banner}>
                <h3>BRIDGESTONE TYRE CATEGORIES</h3>
            </div>
            <SingleProduct data={productData}/>
            <Footer />
        </div>
    )
}

export default IndividualProduct