import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/components/layout/Footer.module.css'
export default function Footer() {
  return (
            <div className={styles.footer}>
                <div className={styles.footerContainer}>

                    {/* Quick Links */}
                    <div className={styles.footerSection}>
                        <p className={styles.footerTitle}>Quick Links</p>
                        <div className={styles.footerLinksGrid}>
                            <Link to="/" className={styles.footerLink}>Home</Link>
                            <Link to="/aboutus" className={styles.footerLink}>About</Link>
                            <Link to="/gallery" className={styles.footerLink}>Gallery</Link>
                            <Link to="/events" className={styles.footerLink}>Programs</Link>
                            <Link to="/news" className={styles.footerLink}>News</Link>
                            <Link to="/contactus" className={styles.footerLink}>Contact us</Link>
                            <Link to="/hymns" className={styles.footerLink}>Hymn</Link>
                            <Link to="/apply-as-worker" className={styles.footerLink}>Apply as a worker</Link>
                        </div>
                    </div>

                    {/* Address */}
                    <div className={styles.footerSection}>
                        <p className={styles.footerTitle}>Fellowship Address</p>
                        <h6 className={styles.footerText}>
                            Mico Dollar Junction, Oke-Aroni, Ilesa, Osun State, Nigeria
                        </h6>
                    </div>

                    {/* Contact */}
                    <div className={styles.footerSection2}>
                        <div>
                            <p className={styles.footerTitle}>Contact Us</p>
                            <h6 className={styles.footerText}>For more enquiries, reach us:</h6>
                            <div className={styles.footerIconsBlock}>
                                <div className={styles.iconBlock}>
                                    <i className="bi bi-facebook"></i>
                                    <a href="https://www.facebook.com/rcfoscoedilesa" target="_blank" rel="noopener noreferrer">RCF University of ILESA</a>
                                </div>
                                <div className={styles.iconBlock}>
                                    <i className="bi bi-instagram"></i>
                                    <a href="https://www.instagram.com/rcfunilesa/" target="_blank" rel="noopener noreferrer">rcfunilesa</a>
                                </div>
                                <div className={styles.iconBlock}>
                                    <i className="bi bi-tiktok"></i>
                                    <a href="https://www.tiktok.com/@rcfunilesa" target="_blank" rel="noopener noreferrer"><span>@rcfunilesa</span></a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6 className={styles.footerText2}>Or Call:</h6>
                            <div className={styles.footerIconsBlock}>
                                <div className={styles.iconBlock}>
                                    <span>+234 706 901 7453 </span>
                                </div>
                                <div className={styles.iconBlock}>
                                    <span>+234 901 350 0641</span>
                                </div>
                                <div className={styles.iconBlock}>
                                    <span>+234 901 784 4632</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className={styles.footerDivider} />

                <div className={styles.footerBottom}>
                    <p>© <span id="year">2025</span> Transformation Chapel.</p>
                </div>
            </div>
  )
}
