import React from 'react';
import styles from '@/styles/sectionHeader.module.css';

const SectionHeader = ({ title, desc, pad }) => {
    return (
        <div className={styles.sectionHeader} style={{padding: pad}}>
            <h2>
                {title}
            </h2>
            <p>
                {desc}
            </p>
        </div>
    )
}

export default SectionHeader;