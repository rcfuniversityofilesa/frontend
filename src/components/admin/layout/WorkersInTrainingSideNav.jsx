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
import '../../../styles/components/admin/layout/WorkersInTrainingSideNav.module.css'

/**
 * Workers In Training Sidebar Navigation
 */
export default function WorkersInTrainingSideNav({
  isExpanded,
  setIsExpanded,
  mobileOpen,
  setMobileOpen,
}) {
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

  const isActive = (path) =>
    location.pathname === path

  return (
    <nav
      className={`workers-sidenav ${isExpanded ? 'expanded' : 'collapsed'} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="sidenav-header">
        <button
          className="toggle-btn"
          onClick={() =>
            setIsExpanded(!isExpanded)
          }
          aria-label="Toggle sidebar"
        >
          {isExpanded ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>
      </div>

      <ul className="nav-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() =>
                setMobileOpen(false)
              }
              title={
                !isExpanded
                  ? item.label
                  : ''
              }
            >
              <span className="nav-icon">
                {item.icon}
              </span>
              {isExpanded && (
                <span className="nav-label">
                  {item.label}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
