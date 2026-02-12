import React, { useState } from 'react'
import styles from '../../styles/components/layout/Navbar.module.css'
import navLogo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [otherOpen, setOtherOpen] = useState(false)
  
  return (
    <nav className={styles.navbar}>
      <div className={`${styles.container} ${styles.navCont}`}>
        <div className={styles.elements}>
          <img src={navLogo} className={styles.navbarBrand} alt="Logo" />

          <button
            className={`${styles.navbarToggler} ${menuOpen ? styles.active : ''}`}
            type="button"
            onClick={() => { setMenuOpen(!menuOpen); setOtherOpen(false); }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={styles.navbarTogglerIcon}></span>
          </button>

          <div className={`${styles.navMenu} ${menuOpen ? styles.open : ''}`}>
            <Link to="/" className={styles.navLink} onClick={() => { setMenuOpen(false); setOtherOpen(false); }}>Home</Link>
            <Link to="/aboutus" className={styles.navLink} onClick={() => { setMenuOpen(false); setOtherOpen(false); }}>About</Link>
            <Link to="/gallery" className={styles.navLink} onClick={() => { setMenuOpen(false); setOtherOpen(false); }}>Gallery</Link>
            <Link to="/events" className={styles.navLink} onClick={() => { setMenuOpen(false); setOtherOpen(false); }}>Programs</Link>

            <div className={`${styles.navItem} ${otherOpen ? styles.open : ''}`}>
              <button
                className={styles.dropdownToggle}
                type="button"
                aria-haspopup="true"
                aria-expanded={otherOpen}
                onClick={() => setOtherOpen(!otherOpen)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOtherOpen(!otherOpen) } }}
              >
                Other
              </button>

              <div className={`${styles.dropdownMenu} ${otherOpen ? styles.show : ''}`}>
                <Link to="/hymns" className={styles.dropdownItem} onClick={() => { setMenuOpen(false); setOtherOpen(false); }}>Hymns</Link>
                <Link to="/apply-as-worker" className={styles.dropdownItem} onClick={() => { setMenuOpen(false); setOtherOpen(false); }}>Apply as a worker</Link>
              </div>
            </div>

            <Link to="/news" className={styles.navLink} onClick={() => { setMenuOpen(false); setOtherOpen(false); }}>News</Link>
            <Link to="/contactus" className={styles.navLink} onClick={() => { setMenuOpen(false); setOtherOpen(false); }}>Contact us</Link>
          </div>
        </div>
      </div>
    </nav >
  )
}
