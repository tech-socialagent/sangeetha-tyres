import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import UpdateProduct from './UpdateProduct'

const ReadProduct = () => {
    const [editProduct, setEditProduct] = useState(false)
    const [productData, setProductData] = useState([])


    return (
        <>
            {
                editProduct ? <UpdateProduct productData={productData} setEditProduct={setEditProduct} /> : <ProductList setProductData={setProductData} setEditProduct={setEditProduct} />
            }

        </>
    )
}

export default ReadProduct