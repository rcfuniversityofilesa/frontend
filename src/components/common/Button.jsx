import React from 'react'
import styles from '../../styles/components/common/Button.module.css'

export default function Button({ text, onClick, type }) {
    return (
        <button className={styles.myBtn} onClick={onClick} type={type}>
            {text}
        </button>
    )
}
