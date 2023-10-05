import AddProduct from '@/Components/Admin/AddNewProduct'
import Head from 'next/head'
import styles from '@/styles/Admin/Dashboard.module.css'
import { DaskboardContext, PopupContext } from '@/Context'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from '@/Components/Admin/Login'
import AddNewProduct from '@/Components/Admin/AddNewProduct'
import ReadProduct from '@/Components/Admin/ReadProduct'


export default function Admin() {
  const [popupActive, setPopupActive] = useState(false)
  const [daskboard, setDaskboard] = useState('products')
  const [user, setUser] = useState(null)
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }, [user])
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        user != null ?
          <PopupContext.Provider value={{ popupActive, setPopupActive }} >
            <DaskboardContext.Provider value={{ daskboard, setDaskboard }} >
              <div className={styles.adminDashboard}>
                <div className={styles.leftFilter}>
                  <div
                    onClick={() => setDaskboard('products')}
                    className={daskboard === 'products' ? styles.filterItemActive : styles.filterItem}>
                    All Product
                  </div>
                  <div
                    onClick={() => setDaskboard('addProduct')}
                    className={daskboard === 'addProduct' ? styles.filterItemActive : styles.filterItem}>
                    Add New
                  </div>
                </div>
                <div className={styles.rightDash}>
                  {
                    daskboard === 'products' ? <ReadProduct /> : daskboard === 'addProduct' ? <AddNewProduct /> : ''
                  }
                </div>
              </div>
            </DaskboardContext.Provider>
          </PopupContext.Provider>
          :
          <Login setUser={setUser} />
      }

    </>
  )
}
