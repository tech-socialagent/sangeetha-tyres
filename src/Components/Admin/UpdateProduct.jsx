import React, { useState, useEffect, useContext } from 'react';
import styles from '@/styles/Admin/AddNewProduct.module.css';
import Image from 'next/image';
import db from '../../FirebaseConfig'
import { collection, getDocs, query, where, onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { IoMdAddCircleOutline } from 'react-icons/io'
import { PopupContext } from '@/Context';
import AddItemPopup from './AddItemPopup';
import { GrCloudUpload } from 'react-icons/gr'
import { BiArrowBack } from 'react-icons/bi'

const UpdateProduct = ({ productData, setEditProduct }) => {
    // State for file previews
    const [filePreviews, setFilePreviews] = useState([]);
    const [notSaved, setNotSaved] = useState(false)
    const [loading, setLoading] = useState(false)
    const [notsavedPopup, setNotsavedPopup] = useState(false)

    // State for product data
    const [product, setProduct] = useState(productData);

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
                        break;
                    // case "VehicleBrand":
                    //     setVehicleBrand(array);
                    //     break;

                    case "VehicleType":
                        setVehicleType(array);
                        break;

                    case "TyreRim":
                        setTyreRim(array);
                        break;

                    case "TyrePattern":
                        setTyrePattern(array);
                        break;
                    case "TyreSize":
                        setTyreSize(array);
                        break;
                    case "TyreType":
                        setTyreType(array);
                        break;
                    case "TyreWidth":
                        setTyreWidth(array);
                        break;
                    case "TyreAspect":
                        setTyreAspect(array);
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

        // No product with the same SKU code exists, proceed to add the product

        // Upload images to Firebase Storage
        let imageUrls = [];
        if (filePreviews.length > 0) {
            for (const file of filePreviews) {
                const storageRef = ref(storage, `images/${Math.random().toString(36).substring(7)}`);
                await uploadString(storageRef, file, 'data_url');
                const downloadURL = await getDownloadURL(storageRef);
                imageUrls.push(downloadURL);
            }
        }
        else {
            imageUrls = product.images
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
            images: imageUrls,
            status: product.status,
            updatedTime: currentDateTime.toLocaleString(),
        };

        // Add product data to Firestore
        await updateDoc(doc(db, 'products', product.skuCode), productData);

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
        setEditProduct(false)
        setNotSaved(false)
    };

    const handleBackBtn = () => {
        if (notSaved === true) {
            setNotsavedPopup(true)
        }
        else {
            setEditProduct(false)
        }
    }

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
                    <BiArrowBack onClick={handleBackBtn} className={styles.backIcon} /> {productData.title}
                </div>

                {/*Not saved Pop-up */}
                <div className={notsavedPopup ? styles.notSavedPopup : styles.hide}>
                    <div className={styles.notSavedDialog}>
                        <h3>Changes are Not Saved</h3>
                        <div className={styles.btnWrap}>
                            <input className={styles.notSavedBtn} type="submit" value="Save Changes" />
                            <button className={styles.notSavedBtn} onClick={() => setEditProduct(false)} >Exit</button>
                        </div>
                    </div>
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
                        <label htmlFor="uploadImages">Images</label>
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

                        {/* Preview */}
                        <div className={styles.filePreviews}>
                            {filePreviews.length == 0 && (
                                <div className={styles.filePreviews}>
                                    {product.images.map((preview, index) => (
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

                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            id="uploadImages"
                            name="uploadImages"
                            placeholder="Select image files"
                            multiple
                            required={filePreviews.length === 0 && !product.images}
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className={styles.medium}>
                        <label htmlFor="tyreBrand">Tyre Brand:<div className={styles.currentValue}>{productData.tyreBrand}</div></label>
                        <div className={styles.select}>
                            <select
                                id="tyrebrand"
                                name="tyrebrand"
                                value={product.tyreBrand}
                                onChange={(e) => {
                                    setProduct((prevProductData) => ({
                                        ...prevProductData,
                                        tyreBrand: e.target.value,
                                    })), setNotSaved(true)
                                }
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
                        <label htmlFor="vehicleType">Vehicle Type:<div className={styles.currentValue}>{productData.vehicleType}</div></label>
                        {console.log("product.vehicleType", product)}
                        <div className={styles.select}>
                            <select
                                id="vehicleType"
                                name="vehicleType"
                                value={product.vehicleType}
                                onChange={(e) => {
                                    setProduct((prevProductData) => ({
                                        ...prevProductData,
                                        vehicleType: e.target.value,
                                    })), setNotSaved(true)
                                }
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
                        <label htmlFor="tyreRim">Rim Size:<div className={styles.currentValue}>{productData.tyreRim}</div></label>
                        <div className={styles.select}>
                            <select
                                id="tyreRim"
                                name="tyreRim"
                                value={product.tyreRim}
                                onChange={(e) => {
                                    setProduct((prevProductData) => ({
                                        ...prevProductData,
                                        tyreRim: e.target.value,
                                    })), setNotSaved(true)
                                }
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
                        <label htmlFor="Pattern">Tyre Pattern:<div className={styles.currentValue}>{productData.tyrePattern}</div></label>
                        <div className={styles.select}>
                            <select
                                id="Pattern"
                                name="Pattern"
                                value={product.tyrePattern}
                                onChange={(e) => {
                                    setProduct((prevProductData) => ({
                                        ...prevProductData,
                                        tyrePattern: e.target.value,
                                    })), setNotSaved(true)
                                }
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
                        <label htmlFor="tyreSize">Tyre Size:<div className={styles.currentValue}>{productData.tyreSize}</div></label>
                        <div className={styles.select}>
                            <select
                                id="tyreSize"
                                name="tyreSize"
                                value={product.tyreSize}
                                onChange={(e) => {
                                    setProduct((prevProductData) => ({
                                        ...prevProductData,
                                        tyreSize: e.target.value,
                                    })), setNotSaved(true)
                                }
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
                        <label htmlFor="price">Price:<div className={styles.currentValue}>{productData.price}</div></label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="Enter the Price"
                            value={product.price}
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
                        <label htmlFor="tyreType">Tyre Type:<div className={styles.currentValue}>{productData.tyreType}</div></label>
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
                        <label htmlFor="tyreWidth">Tyre Width:<div className={styles.currentValue}>{productData.tyreWidth}</div></label>
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
                        <label htmlFor="tyreAspect">Tyre Aspect:<div className={styles.currentValue}>{productData.tyreAspect}</div></label>
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
                        <label htmlFor="skuCode">SKU Code:<div className={styles.currentValue}>{productData.skuCode}</div></label>
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
                            disabled
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
                            onChange={(e) => {
                                setProduct((prevProductData) => ({
                                    ...prevProductData,
                                    status: e.target.value,
                                })), setNotSaved(true)
                            }
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

export default UpdateProduct;

