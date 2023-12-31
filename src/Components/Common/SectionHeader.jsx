import React from 'react';
import styles from '@/styles/Common/sectionHeader.module.css';

const SectionHeader = ({ title, desc, pad, align, justify }) => {
    return (
        <div className={styles.sectionHeader} style={{padding: pad, textAlign: align, alignItems: align}}>
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