import React, { useState } from 'react'
import '../../../styles/pages/admin/auth/auth.css'

import "aos/dist/aos.css";
import AOS from "aos";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import logo from '../../../assets/logo.png'
import Button from '../../../components/common/Button';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loader, setLoader] = useState(false)

    React.useEffect(() => {
        AOS.init({ duration: 3000 });
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            role: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values, { resetForm }) => {
            setLoader(true)
            try {
                const res = await axios.post('https://localhost:9000//api/admin/reg', values);

                // console.log(res.data)
                toast.success(`${res.data.message}. Check your email to verify your account.`)

                resetForm();
            } catch (err) {
                // console.log(err)
                toast.error(`Error creating account: ${err.response?.data?.message || err.message}`);
            } finally {
                setLoader(false)
            }

        },
        validationSchema: yup.object({
            firstName: yup.string().required('First Name is required'),
            middleName: yup.string().required('Middle Name is required'),
            lastName: yup.string().required('Last Name is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
            role: yup.string().required('Role is required of you '),
            password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match')
        })
    })

    return (
        <div className="authPage">
            <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
            <div className="authContainer" data-aos="fade-down">
                <img src={logo} alt="logo" className="authLogo" />
                <h2 className="authTitle">Admin Signup</h2>

                <form className="authForm" onSubmit={loader ? undefined : formik.handleSubmit}>
                    <div>
                        <div>
                            <FaUser className='inputIcon' />
                            <input type="text"
                                name='firstName'
                                placeholder="First Name"
                                className="authInput"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <p className="authErr">{formik.touched.firstName && formik.errors.firstName ? <small>{formik.errors.firstName}</small> : ''} </p>
                    </div>
                    <div>
                        <div>
                            <FaUser className='inputIcon' />
                            <input
                                type="text"
                                name='middleName'
                                placeholder="Middle Name"
                                className="authInput"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <p className="authErr">{formik.touched.middleName && formik.errors.middleName ? <small>{formik.errors.middleName}</small> : ''} </p>
                    </div>
                    <div>
                        <div>
                            <FaUser className='inputIcon' />
                            <input
                                type="text"
                                name='lastName'
                                placeholder="Last Name"
                                className="authInput"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <p className="authErr">{formik.touched.lastName && formik.errors.lastName ? <small>{formik.errors.lastName}</small> : ''} </p>
                    </div>

                    <div>
                        <div>
                            <FaEnvelope className='inputIcon' />
                            <input
                                type="email"
                                name='email'
                                placeholder="Email"
                                className="authInput"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <p className="authErr">{formik.touched.email && formik.errors.email ? <small>{formik.errors.email}</small> : ''} </p>
                    </div>

                    <div>
                        <div>
                            <FaUser className='inputIcon' />
                            <div className='roleValues'>
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Media"
                                        className="authInput"
                                        checked={formik.values.role === "Media"}
                                        onChange={formik.handleChange}
                                    /> Media Coordinator
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="WorkersInTraining"
                                        className="authInput"
                                        checked={formik.values.role === "WorkersInTraining"}
                                        onChange={formik.handleChange}
                                    /> WorkersInTraining
                                </label>
                            </div>
                        </div>
                            <p>{formik.touched.role && formik.errors.role ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.role}</span> : ''}</p>
                    </div>

                    <div>
                        <div>
                            <FaLock className='inputIcon' />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder="Password"
                                className="authInput"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <span className='inputIcon' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <p className="authErr">{formik.touched.password && formik.errors.password ? <small>{formik.errors.password}</small> : ''} </p>
                    </div>
                    <div>
                        <div>
                            <FaLock className='inputIcon' />
                            <input
                                type={showConfirmPassword ? 'text' : "password"}
                                name='confirmPassword'
                                placeholder="Confirm Password"
                                className="authInput"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <span className='inputIcon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <p className="authErr">{formik.touched.confirmPassword && formik.errors.confirmPassword ? <small>{formik.errors.confirmPassword}</small> : ''} </p>
                    </div>

                    <Button type="submit" text={loader ? (<span className="btnSpinner"><FaSpinner className="spin" /></span>) : "Create Account"} />
                    <p>Already has an account? <Link className='links' to={'/admin/auth/login'}>Login</Link></p>
                </form>
            </div>
        </div>
    );
};