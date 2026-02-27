import React, { useEffect, useState } from 'react';
import styles from '../../../styles/components/admin/layout/TopNav.module.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiUser, FiLogOut, FiX } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

export default function TopNav({ isExpanded, setIsExpanded, mobileOpen, setMobileOpen }) {
const [email, setEmail] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [name, setName] = useState('');
  const [passport, setPassport] = useState(null); 

  const navigate = useNavigate();

  const apiLink = 'http://localhost:9000'

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(
        `${apiLink}/api/admin/profile/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user = res.data.data;
      setEmail(user.email);
      setSerialNumber(user.serialNumber);
      setName(user.firstName + ' ' + user.lastName);
      setPassport(user.passport || null); 
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
      navigate('/admin/auth/login');  
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/admin/auth/login');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.dashTopnav}>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className={styles.left}>
        <button
          className={styles.sidebartoggle}
          onClick={() => {
            if (window.innerWidth <= 1024) {
              setMobileOpen(prev => !prev);
            } else {
              setIsExpanded(prev => !prev);
            }
          }}
        >
          {isExpanded ? <FiX className={styles.sidebarIcon} /> : <FiMenu className={styles.sidebarIcon} />}
        </button>

        <h2 className={styles.title}>{name}</h2>
      </div>

      <div className={styles.right}>
        <div className={styles.profile}>
          <div>
            <p>{serialNumber}</p>
            <p>{email}</p>
          </div>
          {passport ? (
            <img
              src={passport}
              alt="passport"
              className={styles.topPassportImage}
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          ) : (
            <FiUser className={styles.topIcon} />
          )}
        </div>
        <FiLogOut className={styles.topLogoutIcon} onClick={logOut} />
      </div>
    </div>
  );
}