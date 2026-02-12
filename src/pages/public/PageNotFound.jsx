import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import styles from '../../styles/pages/public/PageNotFound.module.css'

export default function PageNotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.ornament} aria-hidden>
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M32 8v48" />
              <path d="M16 32h32" />
            </g>
          </svg>
        </div>

        <div className={styles.content}>
          <h1 className={styles.code}>404</h1>
          <h2 className={styles.title}>Page Not Found</h2>
          <p className={styles.subtitle}>Sorry—we couldn't find the page you were looking for.</p>

          <blockquote className={styles.scripture}>“The Lord will guide you always; He will satisfy your needs.”</blockquote>

          <div className={styles.actions}>
            <Link to="/" className={styles.homeLink}><Button text="Return home" /></Link>
            <Link to="/contactus" className={styles.secondaryLink}>Contact us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}