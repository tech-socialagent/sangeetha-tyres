import { PopupContext } from '@/Context'
import React, { useContext, useEffect, useState } from 'react'
import styles from '@/styles/Admin/Popup.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import { collection, addDoc } from "firebase/firestore";
import db from '../../FirebaseConfig'

const AddItemPopup = ({ id, popupTitle, docName }) => {
    const { popupActive, setPopupActive } = useContext(PopupContext);
    const [value, setValue] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const docRef = await addDoc(collection(db, docName), {
            id: id,
            value: value,
        });
        setPopupActive(false);
    }




    return (
        <div className={popupActive ? styles.popupActive : styles.popupDisabled}>
            <div className={styles.popupWrap}>
                <AiOutlineClose onClick={() => setPopupActive(false)} className={styles.closeBtn} />
                <div className={styles.formWrap}>
                    <h2>Add new {popupTitle}</h2>
                    <div className={styles.inputWrap}>
                        <label htmlFor="">ID</label>
                        <input type="text" value={id} disabled />
                    </div>
                    <div className={styles.inputWrap}>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder={`Enter the ${popupTitle}`} onChange={(e) => setValue(e.target.value)} />
                    </div>
                    <div className={styles.inputWrap}>
                        <button type="submit" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItemPopup
