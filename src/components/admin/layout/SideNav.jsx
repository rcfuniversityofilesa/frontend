import React from 'react'
import styles from '../../../styles/components/admin/layout/SideNav.module.css'

import {
    FiHome,
    FiEdit,
    FiUploadCloud,
    FiFileText,
    FiGrid,
    FiMusic,
    FiBookOpen,
    FiClipboard,
    FiUser
} from 'react-icons/fi';
import { FaPoll, FaReadme, FaReply } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SideNav({ isExpanded, setIsExpanded, mobileOpen, setMobileOpen }) {
    const isMobile = window.innerWidth <= 1024;

    // const [navDropdown, setMen] = React.useState(false)
    const [navDropdown, setNavDropdown] = React.useState(false)

    const rootClass = `
    dash-sidenav 
    ${isExpanded ? '' : 'collapsed'} 
    ${mobileOpen ? 'mobile-open' : ''} 
    ${!mobileOpen && isMobile ? 'mobile-hidden' : ''}
  `;

    function toggleExpand() {
        if (isMobile) setMobileOpen(!mobileOpen);
        else setIsExpanded(prev => !prev);
    }

    function closeMobile() {
        if (isMobile) setMobileOpen(false);
    }

    return (
        <div className={rootClass}>
            <div className={styles.menu}>
                <h3 className={styles.menuTitle}>Menu</h3>

                <ul>
                    {/* <Link className={styles.sideLinks} to="/admin/">
                        <li onClick={closeMobile}>
                            <FiHome className={styles.icon} />
                            {isExpanded && <span>Dashboard</span>}
                        </li>
                    </Link> */}

                    <li>
                        <div className={styles.navItem}>
                            <button
                                className='dropdown bg-transparent border-0'
                                type='button'
                                aria-expanded={navDropdown}
                                data-bs-toggle="dropdown"
                                onClick={() => setNavDropdown(!navDropdown)}
                            >
                                <FaPoll className={styles.icon}/>
                                {isExpanded && <span className={styles.sidedropdownToggle}>Post</span>}
                            </button>

                            <div className='dropdown-menu bg-dark'>
                                <div className={styles.navDropdown}>
                                    <Link className={styles.sideLinks} to="/admin/upload/hymn" onClick={() => { setNavDropdown(false) }}>
                                        <li onClick={closeMobile}>
                                            <FiMusic className={styles.icon} />
                                            {isExpanded && <span>Upload Hymn</span>}
                                        </li>
                                    </Link>

                                    <Link className={styles.sideLinks} to="/admin/upload/news" onClick={() => { setNavDropdown(false) }}>
                                        <li onClick={closeMobile}>
                                            <FiEdit className={styles.icon} />
                                            {isExpanded && <span>Upload News</span>}
                                        </li>
                                    </Link>

                                    <Link className={styles.sideLinks} to="/admin/upload/program" onClick={() => { setNavDropdown(false) }}>
                                        <li onClick={closeMobile}>
                                            <FiUploadCloud className={styles.icon} />
                                            {isExpanded && <span>Upload Program</span>}
                                        </li>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className={styles.navItem}>
                            <button
                                className='dropdown bg-transparent border-0'
                                type='button'
                                aria-expanded={navDropdown}
                                data-bs-toggle="dropdown"
                                onClick={() => setNavDropdown(!navDropdown)}
                            >
                                <FaReadme className={styles.icon}/>
                                {isExpanded && <span className={styles.sidedropdownToggle}>Published</span>}
                            </button>

                            <div className='dropdown-menu bg-dark'>
                                <div className={styles.navDropdown}>
                                    <Link className={styles.sideLinks} to="/admin/published/hymns">
                                        <li onClick={closeMobile}>
                                            <FiBookOpen className={styles.icon} />
                                            {isExpanded && <span>Published Hymns</span>}
                                        </li>
                                    </Link>

                                    <Link className={styles.sideLinks} to="/admin/published/news">
                                        <li onClick={closeMobile}>
                                            <FiFileText className={styles.icon} />
                                            {isExpanded && <span>News Published</span>}
                                        </li>
                                    </Link>

                                    <Link className={styles.sideLinks} to="/admin/published/programs">
                                        <li onClick={closeMobile}>
                                            <FiGrid className={styles.icon} />
                                            {isExpanded && <span>Programs Published</span>}
                                        </li>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>

                    <Link className={styles.sideLinks} to="/admin/applications">
                        <li onClick={closeMobile}>
                            <FiClipboard className={styles.icon} />
                            {isExpanded && <span>Applications</span>}
                        </li>
                    </Link>
                    
                    <Link className={styles.sideLinks} to="/admin/inbox">
                        <li onClick={closeMobile}>
                            <FaReply className={styles.icon} />
                            {isExpanded && <span>Feedback</span>}
                        </li>
                    </Link>

                    <Link className={styles.sideLinks} to="/admin/profile">
                        <li onClick={closeMobile}>
                            <FiUser className={styles.icon} />
                            {isExpanded && <span>Profile</span>}
                        </li>
                    </Link>
                </ul>

            </div>
        </div>
    );
}