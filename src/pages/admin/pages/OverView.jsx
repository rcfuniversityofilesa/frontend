import React from 'react'
import styles from '../../../styles/pages/admin/pages/OverView.module.css'

import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Button from '../../../components/common/Button'

export default function OverView() {
const navigate = useNavigate()
//   const token = localStorage.getItem('token')

//   if(!token){
//     toast.error('No user signed in yet')
//     navigate('/admin/signin')
//   }

  return (
    <div className="dashboardPage">

    <Toaster position="top-center" toastOptions={{duration: 4000}}/>
      <div className={styles.dashboardHeader}>
        <h2>Dashboard</h2>
        <Button text='Upload Media' />
      </div>

      {/* <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Hymns Upload</h3>
          <p></p>
        </div>

        <div className={styles.statCard}>
          <h3>Total News Upload</h3>
          <p></p>
        </div>

        <div className={styles.statCard}>
          <h3>Total </h3>
          <p></p>
        </div>

        <div className={styles.statCard}>
          <h3>Storage Used</h3>
          <p></p>
        </div>
      </div> */}

      <div className={styles.dashboardSection}>
        <h3>Recent Uploads</h3>
        <div className={styles.recentGrid}>
          
        </div>
      </div>

      <div className={styles.dashboardSection}>
        <h3>Activity</h3>
        <div className={styles.activityBox}>
        </div>
      </div>

    </div>
  )
}
