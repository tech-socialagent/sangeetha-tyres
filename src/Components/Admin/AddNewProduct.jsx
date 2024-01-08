import React, { useState, useEffect, useContext } from 'react';
import styles from '@/styles/Admin/AddNewProduct.module.css';
import Image from 'next/image';
import db from '../../FirebaseConfig'
import { collection, getDocs, query, where, onSnapshot, addDoc, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { IoMdAddCircleOutline } from 'react-icons/io'
import { PopupContext } from '@/Context';
import AddItemPopup from './AddItemPopup';
import { GrCloudUpload } from 'react-icons/gr'

const AddNewProduct = ({ title, setDaskboard }) => {
  // State for file previews
  const [filePreviews, setFilePreviews] = useState([]);
  const [notSaved, setNotSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  // State for product data
  const [product, setProduct] = useState({
    title: '',
    description: '',
    tyreBrand: '',
    // vehicleBrand: '',
    vehicleType: '',
    tyreRim: '',
    pattern: '',
    tyreSize: '',
    tyreType: '',
    tyreWidth: '',
    tyreAspect: '',
    price: '',
    skuCode: '',
    status: 'Active'
  });

  // State for various dropdown options
  const [tyreBrand, setTyreBrand] = useState([]);
  // const [vehicleBrand, setVehicleBrand] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [tyreRim, setTyreRim] = useState([]);
  const [tyrePattern, setTyrePattern] = useState([]);
  const [tyreSize, setTyreSize] = useState([]);
  const [tyreType, setTyreType] = useState([]);
  const [tyreWidth, setTyreWidth] = useState([]);
  const [tyreAspect, setTyreAspect] = useState([]);

  // State for controlling the popup
  const { popupActive, setPopupActive } = useContext(PopupContext);
  const [popupData, setPopupData] = useState({
    id: '',
    popupTitle: '',
    docName: '',
  });

  // Function to handle file uploads
  const handleFileChange = (e) => {
    setNotSaved(true)
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

  // Function to fetch data from Firestore for dropdowns
  useEffect(() => {
    const getData = async (collectionName) => {
      const q = collection(db, collectionName);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
          array.push(doc.data());
        });
        switch (collectionName) {
          case "TyreBrands":
            setTyreBrand(array);
            if (array.length > 0) {
              // Set the initial value to the first option value
              setProduct((prevProductData) => ({
                ...prevProductData,
                tyreBrand: array[0].value,
              }));
            }
            break;
          // case "VehicleBrand":
          //   setVehicleBrand(array);
          //   if (array.length > 0) {
          //     // Set the initial value to the first option value
          //     setProduct((prevProductData) => ({
          //       ...prevProductData,
          //       vehicleBrand: array[0].value,
          //     }));
          //   }
          //   break;
          case "VehicleType":
            setVehicleType(array);
            if (array.length > 0) {
              // Set the initial value to the first option value
              setProduct((prevProductData) => ({
                ...prevProductData,
                vehicleType: array[0].value,
              }));
            }
            break;
          case "TyreRim":
            setTyreRim(array);
            if (array.length > 0) {
              // Set the initial value to the first option value
              setProduct((prevProductData) => ({
                ...prevProductData,
                tyreRim: array[0].value,
              }));
            }
            break;
          case "TyrePattern":
            setTyrePattern(array);
            if (array.length > 0) {
              // Set the initial value to the first option value
              setProduct((prevProductData) => ({
                ...prevProductData,
                tyrePattern: array[0].value,
              }));
            }
            break;
          case "TyreSize":
            setTyreSize(array);
            if (array.length > 0) {
              // Set the initial value to the first option value
              setProduct((prevProductData) => ({
                ...prevProductData,
                tyreSize: array[0].value,
              }));
            }
            break;
          case "TyreType":
            setTyreType(array);
            if (array.length > 0) {
              // Set the initial value to the first option value
              setProduct((prevProductData) => ({
                ...prevProductData,
                tyreType: array[0].value,
              }));
            }
            break;
          case "TyreWidth":
            setTyreWidth(array);
            if (array.length > 0) {
              // Set the initial value to the first option value
              setProduct((prevProductData) => ({
                ...prevProductData,
                tyreWidth: array[0].value,
              }));
            }
            break;
          case "TyreAspect":
            setTyreAspect(array);
            if (array.length > 0) {
              // Set the initial value to the first option value
              setProduct((prevProductData) => ({
                ...prevProductData,
                tyreAspect: array[0].value,
              }));
            }
            break;
          default:
            break;
        }
      });
    };

    getData("TyreBrands");
    // getData("VehicleBrand");
    getData("VehicleType");
    getData("TyreRim");
    getData("TyrePattern");
    getData("TyreSize");
    getData("TyreType");
    getData("TyreWidth");
    getData("TyreAspect");

  }, []);

 


  // Firebase Storage instance
  const storage = getStorage();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    // Check if a product with the same SKU code already exists
    const skuCodeQuery = query(
      collection(db, 'products'),
      where('skuCode', '==', product.skuCode)
    );
    const skuCodeQuerySnapshot = await getDocs(skuCodeQuery);

    if (!skuCodeQuerySnapshot.empty) {
      // A product with the same SKU code already exists
      // You can handle this case here (e.g., show an error message)
      setLoading(false)
      alert('A product with the same SKU code already exists.');
    } else {
      // No product with the same SKU code exists, proceed to add the product

      // Upload images to Firebase Storage
      const imageUrls = [];
      for (const file of filePreviews) {
        const storageRef = ref(storage, `images/${Math.random().toString(36).substring(7)}`);
        await uploadString(storageRef, file, 'data_url');
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      }

      // Create the product data with image URLs
      let currentDateTime = new Date();
      const productData = {
        title: product.title,
        description: product.description,
        tyreBrand: product.tyreBrand,
        // vehicleBrand: product.vehicleBrand,
        vehicleType: product.vehicleType,
        tyreRim: product.tyreRim,
        tyrePattern: product.tyrePattern,
        tyreSize: product.tyreSize,
        tyreType: product.tyreType,
        tyreWidth: product.tyreWidth,
        tyreAspect: product.tyreAspect,
        price: product.price,
        skuCode: product.skuCode,
        status: product.status,
        images: imageUrls,
        updatedTime: currentDateTime.toLocaleString(),
      };

      // Add product data to Firestore
      await setDoc(doc(db, "products", product.skuCode), productData);
      setDaskboard("products")
      // await addDoc(collection(db, 'products', product.skuCode), productData);

      // Clear the form fields and file previews after successful submission
      setProduct({
        title: '',
        description: '',
        tyreBrand: '',
        // vehicleBrand: '',
        vehicleType: '',
        tyreRim: '',
        tyrePattern: '',
        tyreSize: '',
        tyreType: '',
        tyreWidth: '',
        tyreAspect: '',
        price: '',
        skuCode: '',
      });
      setFilePreviews([]);
      setLoading(false)
      setNotSaved(false)
    }
  };


  return (
    <form className={styles.addProduct} onSubmit={handleSubmit} >

      {/* Loading  */}
      {loading && (
        <div className={styles.loadingWrap}>
          <GrCloudUpload className={styles.loadingIcon} />
        </div>
      )}

      <div className={styles.titleBackWrap}>
        <div className={styles.title}>
          {title ? title : 'Add Product'}
        </div>

      </div>

      <div style={{ display: 'flex' }}>



        <div className={styles.inputForm}>
          <div className={styles.large}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder='Enter the title'
              value={product.title}
              onChange={(e) => {
                setProduct(prevProductData => ({
                  ...prevProductData,
                  title: e.target.value,
                })), setNotSaved(true)
              }
              }
              required
            />
          </div>
          <div className={styles.large}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder='Enter the description'
              value={product.description}
              onChange={(e) => {
                setProduct(prevProductData => ({
                  ...prevProductData,
                  description: e.target.value,
                })), setNotSaved(true)
              }
              }
              required
            />
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
              accept=".png"
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
            <div className={styles.select}>
              <select
                id="tyrebrand"
                name="tyrebrand"
                value={product.tyreBrand}
                onChange={(e) =>
                  setProduct((prevProductData) => ({
                    ...prevProductData,
                    tyreBrand: e.target.value,
                  }))
                }
                required
              >
                {tyreBrand.map((item, key) => (
                  <option key={key}>{item.value}</option>
                ))}
              </select>
              <IoMdAddCircleOutline
                className={styles.addIcon}
                onClick={() => {
                  setPopupActive(true);
                  setPopupData((prevPopupData) => ({
                    ...prevPopupData,
                    id: tyreBrand.length,
                    popupTitle: "Tyre Brand",
                    docName: "TyreBrands",
                  }));
                }}
              />
            </div>
          </div>

          {/* <div className={styles.medium}>
            <label htmlFor="vehicleBrand">Vehicle Brand</label>
            <div className={styles.select}>
              <select
                id="vehicleBrand"
                name="vehicleBrand"
                value={product.vehicleBrand}
                onChange={(e) =>
                  setProduct((prevProductData) => ({
                    ...prevProductData,
                    vehicleBrand: e.target.value,
                  }))
                }
                required
              >
                {vehicleBrand.map((item, key) => (
                  <option key={key}>{item.value}</option>
                ))}
              </select>
              <IoMdAddCircleOutline
                className={styles.addIcon}
                onClick={() => {
                  setPopupActive(true);
                  setPopupData((prevPopupData) => ({
                    ...prevPopupData,
                    id: vehicleBrand.length,
                    popupTitle: "Vehicle Brand",
                    docName: "VehicleBrand",
                  }));
                }}
              />
            </div>
          </div> */}
          <div className={styles.medium}>
            <label htmlFor="vehicleType">Vehicle Type</label>
            <div className={styles.select}>
              <select
                id="vehicleType"
                name="vehicleType"
                value={product.vehicleType}
                onChange={(e) =>
                  setProduct((prevProductData) => ({
                    ...prevProductData,
                    vehicleType: e.target.value,
                  }))
                }
                required
              >
                {vehicleType.map((item, key) => (
                  <option key={key}>{item.value}</option>
                ))}
              </select>
              <IoMdAddCircleOutline
                className={styles.addIcon}
                onClick={() => {
                  setPopupActive(true);
                  setPopupData((prevPopupData) => ({
                    ...prevPopupData,
                    id: vehicleType.length,
                    popupTitle: "Vehicle Type",
                    docName: "VehicleType",
                  }));
                }}
              />
            </div>
          </div>

          <div className={styles.medium}>
            <label htmlFor="tyreRim">Rim Size</label>
            <div className={styles.select}>
              <select
                id="tyreRim"
                name="tyreRim"
                value={product.tyreRim}
                onChange={(e) =>
                  setProduct((prevProductData) => ({
                    ...prevProductData,
                    tyreRim: e.target.value,
                  }))
                }
                required
              >
                {tyreRim.map((item, key) => (
                  <option key={key}>{item.value}</option>
                ))}
              </select>
              <IoMdAddCircleOutline
                className={styles.addIcon}
                onClick={() => {
                  setPopupActive(true);
                  setPopupData((prevPopupData) => ({
                    ...prevPopupData,
                    id: tyreRim.length,
                    popupTitle: "Tyre Rim Size",
                    docName: "TyreRim",
                  }));
                }}
              />
            </div>
          </div>

          <div className={styles.medium}>
            <label htmlFor="tyrePattern">Tyre Pattern</label>
            <div className={styles.select}>
              <select
                id="tyrePattern"
                name="tyrePattern"
                value={product.tyrePattern}
                onChange={(e) =>
                  setProduct((prevProductData) => ({
                    ...prevProductData,
                    tyrePattern: e.target.value,
                  }))
                }
                required
              >
                {tyrePattern.map((item, key) => (
                  <option key={key}>{item.value}</option>
                ))}
              </select>
              <IoMdAddCircleOutline
                className={styles.addIcon}
                onClick={() => {
                  setPopupActive(true);
                  setPopupData((prevPopupData) => ({
                    ...prevPopupData,
                    id: tyrePattern.length,
                    popupTitle: "Tyre Pattern",
                    docName: "TyrePattern",
                  }));
                }}
              />
            </div>
          </div>

          <div className={styles.medium}>
            <label htmlFor="tyreSize">Tyre Size</label>
            <div className={styles.select}>
              <select
                id="tyreSize"
                name="tyreSize"
                value={product.tyreSize}
                onChange={(e) =>
                  setProduct((prevProductData) => ({
                    ...prevProductData,
                    tyreSize: e.target.value,
                  }))
                }
                required
              >
                {tyreSize.map((item, key) => (
                  <option key={key}>{item.value}</option>
                ))}
              </select>
              <IoMdAddCircleOutline
                className={styles.addIcon}
                onClick={() => {
                  setPopupActive(true);
                  setPopupData((prevPopupData) => ({
                    ...prevPopupData,
                    id: tyreSize.length,
                    popupTitle: "Tyre Size",
                    docName: "TyreSize",
                  }));
                }}
              />
            </div>
          </div>

          <div className={styles.medium}>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Enter the Price"
              onChange={(e) => {
                setProduct((prevProductData) => ({
                  ...prevProductData,
                  price: e.target.value,
                })), setNotSaved(true)
              }
              }
              required
            />
          </div>

          <div className={styles.medium}>
            <label htmlFor="tyreType">Tyre Type</label>
            <div className={styles.select}>
              <select
                id="tyreType"
                name="tyreType"
                value={product.TyreType}
                onChange={(e) => {
                  setProduct((prevProductData) => ({
                    ...prevProductData,
                    TyreType: e.target.value,
                  })), setNotSaved(true)
                }
                }
                required
              >
                {tyreType.map((item, key) => (
                  <option key={key}>{item.value}</option>
                ))}
              </select>
              <IoMdAddCircleOutline
                className={styles.addIcon}
                onClick={() => {
                  setPopupActive(true);
                  setPopupData((prevPopupData) => ({
                    ...prevPopupData,
                    id: tyreType.length,
                    popupTitle: "Tyre Type",
                    docName: "TyreType",
                  }))
                }}
              />
            </div>
          </div>

          <div className={styles.medium}>
            <label htmlFor="tyreWidth">Tyre Width</label>
            <div className={styles.select}>
              <select
                id="tyreWidth"
                name="tyreWidth"
                value={product.tyreWidth}
                onChange={(e) => {
                  setProduct((prevProductData) => ({
                    ...prevProductData,
                    tyreWidth: e.target.value,
                  })), setNotSaved(true)
                }
                }
                required
              >
                {tyreWidth.map((item, key) => (
                  <option key={key}>{item.value}</option>
                ))}
              </select>
              <IoMdAddCircleOutline
                className={styles.addIcon}
                onClick={() => {
                  setPopupActive(true);
                  setPopupData((prevPopupData) => ({
                    ...prevPopupData,
                    id: tyreWidth.length,
                    popupTitle: "Tyre Width",
                    docName: "TyreWidth",
                  }));
                }}
              />
            </div>
          </div>

          <div className={styles.medium}>
            <label htmlFor="tyreAspect">Tyre Aspect</label>
            <div className={styles.select}>
              <select
                id="tyreAspect"
                name="tyreAspect"
                value={product.tyreAspect}
                onChange={(e) => {
                  setProduct((prevProductData) => ({
                    ...prevProductData,
                    tyreAspect: e.target.value,
                  })), setNotSaved(true)
                }
                }
                required
              >
                {tyreAspect.map((item, key) => (
                  <option key={key}>{item.value}</option>
                ))}
              </select>
              <IoMdAddCircleOutline
                className={styles.addIcon}
                onClick={() => {
                  setPopupData((prevPopupData) => ({
                    ...prevPopupData,
                    id: tyreAspect.length,
                    popupTitle: "Tyre Aspect",
                    docName: "TyreAspect",
                  }));
                  setPopupActive(true);
                }}
              />
            </div>
          </div>

          <div className={styles.medium}>
            <label htmlFor="skuCode">SKU Code</label>
            <input
              type="text"
              id="skuCode"
              name="skuCode"
              placeholder="Enter the SKU Code"
              value={product.skuCode}
              onChange={(e) => {
                setProduct((prevProductData) => ({
                  ...prevProductData,
                  skuCode: e.target.value,
                })), setNotSaved(true)
              }
              }
              required
            />
          </div>
        </div>




        {
          popupActive ? (
            <AddItemPopup
              id={popupData.id + 1}
              popupTitle={popupData.popupTitle}
              docName={popupData.docName}
            />
          ) : (
            ''
          )
        }

        <div className={styles.rightWrap}>
          <input type="submit" value='Save' className={notSaved ? styles.notSaved : styles.saveBtn} />
          <div className={styles.select}>
            <select
              id="status"
              name="status"
              value={product.status}
              onChange={(e) =>
                setProduct((prevProductData) => ({
                  ...prevProductData,
                  status: e.target.value,
                }))
              }
              required
            >
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

      </div>
    </form >
  );
};

export default AddNewProduct;

