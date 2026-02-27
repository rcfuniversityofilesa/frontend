import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaChartBar,
  FaUsers,
  FaCheckCircle,
  FaCog,
  FaTrophy,
  FaUser,
  FaBars,
  FaTimes,
} from 'react-icons/fa'
import styles from '../../../styles/components/admin/layout/WorkersInTrainingSideNav.module.css'


export default function WorkersInTrainingSideNav({ isExpanded, setIsExpanded, mobileOpen, setMobileOpen }) {
  const location = useLocation()

  const menuItems = [
    {
      label: 'Overview',
      icon: <FaChartBar />,
      path: '/admin/workersInTraining/overview',
    },
    {
      label: 'Applicants',
      icon: <FaUsers />,
      path: '/admin/workersInTraining/applicants',
    },
    {
      label: 'Interviewed',
      icon: <FaCheckCircle />,
      path: '/admin/workersInTraining/interviewed',
    },
    {
      label: 'Exam Settings',
      icon: <FaCog />,
      path: '/admin/workersInTraining/exam-settings',
    },
    {
      label: 'Exam Results',
      icon: <FaTrophy />,
      path: '/admin/workersInTraining/exam-results',
    },
    {
      label: 'Profile',
      icon: <FaUser />,
      path: '/admin/workersInTraining/profile',
    },
  ]

  const isMobile = window.innerWidth <= 1024;

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
    <>
      <div className={rootClass}>
        <div className={styles.menu}>
          <h3 className={styles.menuTitle}>Menu</h3>

          <ul className={styles.navmenu}> {menuItems.map((item) => (
            <Link
              to={item.path}
              className={styles.sideLinks}
            >
              <li key={item.path} onClick={closeMobile}>
                <span className={styles.icon}>
                  {item.icon}
                </span>
                {isExpanded && (
                  <span>
                    {item.label}
                  </span>
                )}
              </li>
            </Link>
          ))}
          </ul>
        </div>
      </div>
    </>
  )
}