import React from 'react';
import styles from '@/styles/Home/Rolling.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Rolling = () => {
  return (
    <div className={styles.sectionWrap}>
      <div className={styles.sectionLeft}>
        <Image src='/assests/home/section.png' alt='Banner Image' width={1000} height={1000} className={styles.rollingImage} />
      </div>
      <div className={styles.sectionRight}>
        <div className={styles.rightContainer}>
          <h6>Tire Re-tread center</h6>
          <h1>Rolling Renewal: Tires Reimagined,<span> Roads Rediscovered</span></h1>
          <p>We're redefining the future of tire re-treading. Our cutting-edge technology and expertise ensure that your tires perform like new, delivering safety and performance you can rely on. Click below to discover the innovation that's reshaping the road ahead</p>
          <Link
            href='https://brandshops.jktyre.com/retread-centers/jk-retread-center-sangeetha-tyre-tyre-shop-attibele-bengaluru-175365/Home?utm_source=locator&utm_medium=googleplaces'
            target='_blank'>
            <button>TO KNOW MORE</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Rolling;