import React, { useState, useEffect, useContext } from 'react';
import styles from '@/styles/Admin/Product.module.css';
import Image from 'next/image';
import db from '../../FirebaseConfig'
import { collection, getDocs, query, where, onSnapshot, addDoc } from "firebase/firestore";
import { IoMdAddCircleOutline } from 'react-icons/io'
import { PopupContext } from '@/Context';
import AddItemPopup from './AddItemPopup';

const AddProduct = ({ title }) => {
  const [filePreviews, setFilePreviews] = useState([]);
  // const [productTitle, setProductTitle] = useState('');
  // const [ProductDescription, setProductDescription] = useState('');
  // const [price, setPrice] = useState('')
  // const [skuCode, setSkuCode] = useState([])
  const [tyreBrand, setTyreBrand] = useState([])
  const [vehicleBrand, setVehicleBrand] = useState([])
  const [tyreSize, setTyreSize] = useState([])
  const [tyreType, setTyreType] = useState([])
  const [tyreWidth, setTyreWidth] = useState([])
  const [tyreAspect, setTyreAspect] = useState([])
  const [popupData, setPopupData] = useState([{
    id: '',
    popupTitle: '',
    docName: '',

  }])

  const [product, setProduct] = useState([{
    title: '',
    description: '',
    price: '',
    skuCode: '',
  }])
  const { popupActive, setPopupActive } = useContext(PopupContext);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {

      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === files.length) {
          setFilePreviews(previews);
        }
      };

      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    const getData = async (collectionName) => {
      const q = query(collection(db, collectionName));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
          array.push(doc.data());
        });
        collectionName === "TyreBrands" ? setTyreBrand(array) :
          collectionName === "VehicleBrand" ? setVehicleBrand(array) :
            collectionName === "TyreSize" ? setTyreSize(array) :
              collectionName === "TyreType" ? setTyreType(array) :
                collectionName === "TyreWidth" ? setTyreWidth(array) :
                  collectionName === "TyreAspect" ? setTyreAspect(array) : ''
      });
    }

    getData("TyreBrands");
    getData("VehicleBrand");
    getData("TyreSize");
    getData("TyreType");
    getData("TyreWidth");
    getData("TyreAspect");
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      title: product.title,
      description: product.description,
      // tyreBrand: tyreBrand,
      // vehicleBrand: vehicleBrand,
      // tyreSize: tyreSize,
      // Price: '12345',
      // tyreType: tyreType,
      // tyreWidth: tyreWidth,
      // tyreAspect: tyreAspect,
      skuCode: product.skuCode, // Use product.skuCode instead of skuCode
    };


    const docRef = await addDoc(collection(db, "products"), productData);

  };






  return (
    <form className={styles.addProduct} onSubmit={handleSubmit} >
      <div className={styles.titleBackWrap}>
        <div className={styles.title}>
          {title ? title : 'Add Product'}
        </div>
        <div className={styles.saveCloseBtn}>
          <button>Close</button>
          <input type="submit" value='Save' />
        </div>
      </div>


      <div className={styles.inputForm}>
        <div className={styles.large}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" placeholder='Enter the title'
            value={product.title}
            onChange={(e) =>
              setProduct(prevProductData => ({
                ...prevProductData,
                title: e.target.value,
              }))
            }
            required />
        </div>
        <div className={styles.large}>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder='Enter the description'
            value={product.description}
            onChange={(e) =>
              setProduct(prevProductData => ({
                ...prevProductData,
                description: e.target.value,
              }))
            }
            required />
        </div>
        <div className={styles.large}>
          <label htmlFor="uploadImages">Upload Images</label>
          {filePreviews.length > 0 && (
            <div className={styles.filePreviews}>
              {filePreviews.length > 0 && (
                <div className={styles.filePreviews}>
                  {filePreviews.map((preview, index) => (
                    <Image
                      className={styles.previewImg}
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      width={200} // Set the width and height as per your requirements
                      height={200}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            id="uploadImages"
            name="uploadImages"
            placeholder="Select image files"
            multiple
            required
            onChange={handleFileChange}
          />
        </div>

        <div className={styles.medium}>
          <label htmlFor="tyreBrand">Tyre Brand</label>
          {/* <input type="text" id="tyreBrand" name="tyreBrand" placeholder='Enter the Brand Name' required /> */}

          <div className={styles.select}>
            <select id="tyrebrand" name="tyrebrand"
              // value={product.}
              // onChange={(e) =>
              //   setProduct(prevProductData => ({
              //     ...prevProductData,
              //     title: e.target.value,
              //   }))
              // }
              // required
              >
              {
                tyreBrand.map((item, key) => (
                  <option key={key} value="">{item.value}</option>
                ))
              }
            </select>
            <IoMdAddCircleOutline className={styles.addIcon} onClick={() => {
              setPopupActive(true),
                setPopupData(prevPopupData => ({
                  ...prevPopupData,
                  id: tyreBrand.length,
                  popupTitle: "Tyre Brand",
                  docName: "TyreBrands",
                }));
            }} />
          </div>
        </div>

        <div className={styles.medium}>
          <label htmlFor="vehicleBrand">Vehicle Brand</label>

          <div className={styles.select}>
            <select id="vehicleBrand" name="vehicleBrand">
              {
                vehicleBrand.map((item, key) => (
                  <option key={key} value="">{item.value}</option>
                ))
              }
            </select>
            <IoMdAddCircleOutline className={styles.addIcon} onClick={() => {
              setPopupActive(true),
                setPopupData(prevPopupData => ({
                  ...prevPopupData,
                  id: vehicleBrand.length,
                  popupTitle: "Vehicle Brand",
                  docName: "VehicleBrand",
                }));
            }} />
          </div>

        </div>


        <div className={styles.medium}>
          <label htmlFor="tyreSize">Tyre Size</label>

          <div className={styles.select}>
            <select id="tyreSize" name="tyreSize">
              {
                tyreSize.map((item, key) => (
                  <option key={key} value="">{item.value}</option>
                ))
              }
            </select>
            <IoMdAddCircleOutline className={styles.addIcon} onClick={() => {
              setPopupActive(true),
                setPopupData(prevPopupData => ({
                  ...prevPopupData,
                  id: tyreSize.length,
                  popupTitle: "Tyre Size",
                  docName: "TyreSize",
                }));
            }} />
          </div>

        </div>


        <div className={styles.medium}>
          <label htmlFor="price">Price</label>
          <input type="text" id="price" name="price" placeholder='Enter the Price'
            onChange={(e) =>
              setProduct(prevProductData => ({
                ...prevProductData,
                price: e.target.value,
              }))
            }
            required />
        </div>


        <div className={styles.medium}>
          <label htmlFor="tyreType">Tyre Type</label>

          <div className={styles.select}>
            <select id="tyreType" name="tyreType">
              {
                tyreType.map((item, key) => (
                  <option key={key} value="">{item.value}</option>
                ))
              }
            </select>
            <IoMdAddCircleOutline className={styles.addIcon} onClick={() => {
              setPopupActive(true),
                setPopupData(prevPopupData => ({
                  ...prevPopupData,
                  id: tyreType.length,
                  popupTitle: "Tyre Type",
                  docName: "TyreType",
                }));
            }} />
          </div>

        </div>
        <div className={styles.medium}>
          <label htmlFor="tyreWidth">Tyre Width</label>

          <div className={styles.select}>
            <select id="tyreWidth" name="tyreWidth">
              {
                tyreWidth.map((item, key) => (
                  <option key={key} value="">{item.value}</option>
                ))
              }
            </select>
            <IoMdAddCircleOutline className={styles.addIcon} onClick={() => {
              setPopupActive(true),
                setPopupData(prevPopupData => ({
                  ...prevPopupData,
                  id: tyreWidth.length,
                  popupTitle: "Tyre Aspect",
                  docName: "TyreWidth",
                }));
            }} />
          </div>

        </div>
        <div className={styles.medium}>
          <label htmlFor="tyreAspect">Tyre Aspect</label>

          <div className={styles.select}>
            <select id="tyreAspect" name="tyreAspect">
              {
                tyreAspect.map((item, key) => (
                  <option key={key} value="">{item.value}</option>
                ))
              }
            </select>
            <IoMdAddCircleOutline className={styles.addIcon} onClick={() => {
              setPopupData(prevPopupData => ({
                ...prevPopupData,
                id: tyreAspect.length,
                popupTitle: "Tyre Aspect",
                docName: "TyreAspect",
              }));
              setPopupActive(true);
            }} />
          </div>

        </div>
        <div className={styles.medium}>
          <label htmlFor="skuCode">SKU Code</label>
          <input type="text" id="skuCode" name="skuCode" placeholder='Enter the SKU Code'
            value={product.skuCode}
            onChange={(e) =>
              setProduct(prevProductData => ({
                ...prevProductData,
                skuCode: e.target.value,
              }))
            }
            required />
        </div>
      </div>




      {/* POPUP form */}
      {popupActive ? <AddItemPopup
        id={popupData.id + 1}
        popupTitle={popupData.popupTitle}
        docName={popupData.docName}
      /> : ''}

      <div className={styles.rightWrap}>

      </div>
    </form>
  );
};

export default AddProduct;
