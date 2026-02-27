import React, { useState } from 'react'
import '../../../styles/pages/admin/auth/auth.css'

import "aos/dist/aos.css";
import AOS from "aos";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import logo from '../../../assets/logo.png'
import Button from '../../../components/common/Button';
import { useAuth } from '../../../context/AuthContext'
import { decodeToken } from '../../../utils/jwtUtils'


export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const apiLink = 'https://backend-04sy.onrender.com'

    React.useEffect(() => {
        AOS.init({ duration: 3000 });
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const res = await axios.post(`${apiLink}/api/admin/login`, values, { withCredentials: true })

                localStorage.setItem('token', res.data.token)
                // localStorage.setItem("admin", JSON.stringify(res.data.admin.role));
                
                await login(values.email, values.password)
                
                const decoded = decodeToken(res.data.token)
                
                const userRole = res.data.admin.role
                  ? res.data.admin.role.toString().toLowerCase()
                  : ''
                toast.success(res.data.message)


                setTimeout(() => {
                  if (userRole === 'workersintraining') {
                    navigate('/admin/workersInTraining/overview')
                  } else if (userRole === 'media') {
                    navigate('/admin/profile')
                  } else {
                    navigate('/admin/unauthorized')
                  }
                }, 100)
            } catch (err) {
                // console.log(err)
                toast.error(`Error loggining in: ${err.response?.data?.message || err.message}`)
            } finally{
                setLoading(false)
            }
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email format').required('Email is required'),
            password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        })
    })

return (
    <div className="authPage">
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        
        <div className="authContainer" data-aos="fade-up">
            <img src={logo} alt="logo" className="authLogo" />
            <h2 className="authTitle">Admin Signin</h2>
            <p className="authSubTitle">Welcome back! Please enter your details.</p>

            <form className="authForm" onSubmit={loading ? (e) => e.preventDefault() : formik.handleSubmit}>
                
                {/* Email Field */}
                <div className="inputGroup">
                    <div className="inputFieldWrapper">
                        <FaEnvelope className='inputIcon' />
                        <input
                            type="email"
                            name='email'
                            placeholder="Email Address"
                            className="authInput"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                    </div>
                    <div className="authErr">
                        {formik.touched.email && formik.errors.email && <small>{formik.errors.email}</small>}
                    </div>
                </div>

                {/* Password Field */}
                <div className="inputGroup">
                    <div className="inputFieldWrapper">
                        <FaLock className='inputIcon' />
                        <input
                            type={showPassword ? 'text' : "password"}
                            name='password'
                            placeholder="Password"
                            className="authInput"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <span className='inputIcon' style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="authErr">
                        {formik.touched.password && formik.errors.password && <small>{formik.errors.password}</small>}
                    </div>
                </div>

                {/* Optional: Forget Password Link could go here */}
                {/* <div style={{textAlign: 'right', marginTop: '-10px'}}>
                    <Link className='links' style={{fontSize: '13px'}} to={'/auth/forget-password'}>Forgot Password?</Link>
                </div> */}

                <Button 
                    type="submit" 
                    text={loading ? <FaSpinner className="spin" /> : "Login"} 
                />

                <p className="footerText">
                    I don't have an account? <Link className='links' to={'/admin/auth/register'}>Register</Link>
                </p>
            </form>
        </div>
    </div>
);
};

// huzuwyz@mailinator.com
// Pa$$w0rd!