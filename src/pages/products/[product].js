import React from 'react'
import styles from '@/styles/Products/IndividualProduct.module.css'
import Navbar from '@/Components/Common/Navbar'
import Footer from '@/Components/Common/Footer'

const IndividualProduct = () => {
    return (
        <div>
            <Navbar />
            <div className={styles.banner}>
                <h3>BRIDGESTONE TYRE CATEGORIES</h3>
            </div>
            <Footer />
        </div>
    )
}

export default IndividualProduct