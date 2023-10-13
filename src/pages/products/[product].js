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
        title:'BRIDGESTONE - STRUDO PASSENGER',

        //Description
        desc:"The Bridgestone Sturdo passenger is made for performance. It performs well in wet and dry conditions and the tread pattern allows one to brake even in wet conditions. To reduce the noise created while driving, Bridgestone has carved five different tread blocks on the tyre. This tyre involves a varied 5 pitch design to prevent the road noise from filtering in to the vehicle cabin. Large centre blocks come equipped with 3D grooves in order to maximize wet and dry traction.",
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