import { PopupContext } from '@/Context';
import React, { useContext, useState } from 'react';
import styles from '@/styles/Admin/Popup.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import db from '../../FirebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddItemPopup = ({ id, popupTitle, docName }) => {
    const { popupActive, setPopupActive } = useContext(PopupContext);
    const [value, setValue] = useState('');
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const metadata = {
        contentType: 'image/jpeg', // Specify the content type for JPEG images
    };

    const storage = getStorage(); // Initialize the Firebase Storage

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the ID already exists
        const querySnapshot = await getDocs(query(collection(db, docName), where("value", "==", value)));

        if (!querySnapshot.empty) {
            alert(`An item "${value}" already exists.`);
            return; // Do not proceed further
        } else {

            if (docName === "Tyre Brand") {
                const storageRef = ref(storage, `TyreBrand/${image.name}`);
                await uploadBytes(storageRef, image, metadata);

                // Get the download URL of the uploaded image
                const downloadURL = await getDownloadURL(storageRef);

                // Save the download URL in Firestore
                const docRef = await addDoc(collection(db, docName), {
                    value: value,
                    image: downloadURL,
                });
            }
            else {
                // Save the data in Firestore
                const docRef = await addDoc(collection(db, docName), {
                    value: value,
                });
            }
            setPopupActive(false);

        }
    };

    return (
        <div className={popupActive ? styles.popupActive : styles.popupDisabled}>
            <div className={styles.popupWrap}>
                <AiOutlineClose onClick={() => setPopupActive(false)} className={styles.closeBtn} />
                <div className={styles.formWrap}>
                    <h2>Add new {popupTitle}</h2>
                    {/* <div className={styles.inputWrap}>
                        <label htmlFor="">ID</label>
                        <input
                            onChange={(e) => setNumericId(parseInt(e.target.value, 10))}
                            type="number"
                            value={numericId}
                        />
                    </div> */}
                    <div className={styles.inputWrap}>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder={`Enter the ${popupTitle}`} onChange={(e) => setValue(e.target.value)} />
                    </div>
                    {popupTitle === 'Tyre Brand' && (
                        <>
                            <div className={styles.inputWrap}>
                                <label htmlFor="">{popupTitle}</label>
                                <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} required />
                            </div>
                            {image && (
                                <div className={styles.imagePreview}>
                                    <img style={{ width: '200px' }} src={URL.createObjectURL(image)} alt="Uploaded Image" />
                                </div>
                            )}
                        </>
                    )}
                    <div className={styles.inputWrap}>
                        <button type="submit" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItemPopup;
