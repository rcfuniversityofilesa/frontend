import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import '../../../styles/pages/admin/pages/Profile.css'

import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import Button from '../../../components/common/Button'


export default function Profile() {
  const { user } = useAuth()

  const [preview, setPreview] = useState(null)
    const [initialData, setInitialData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [detailsLoading, setdetailsLoading] = useState(false)

    const apiLink = 'http://localhost:9000'

    const fetchUser = async () => {
        const token = localStorage.getItem('token')
        try {
            setdetailsLoading(true)
            const res = await axios.get(
                `${apiLink}/api/admin/profile/me`,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            const user = res.data.data

            setInitialData({
                serialNumber: user.serialNumber || '',
                firstName: user.firstName || '',
                middleName: user.middleName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                role: user.role || '',
                gender: user.gender || '',
                phoneNumber: user.phoneNumber || '',
                inductionYear: user.inductionYear || '',
                passport: null
            })

            if (user.passport) {
                setPreview(user.passport)
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        } finally{
            setdetailsLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialData || {
            serialNumber: '',
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            role: '',
            gender: '',
            phoneNumber: '',
            passport: null,
            inductionYear: '',
        },
        validationSchema: yup.object({
            passport: yup.mixed().required('Passport required'),
            serialNumber: yup.string().required('Serial number required'),
            firstName: yup.string().required('First name required'),
            middleName: yup.string().required('Middle name required'),
            lastName: yup.string().required('Last name required'),
            email: yup.string().email('Invalid email').required('Email required'),
            role: yup.string().required('Role is required of you '),
            gender: yup.string().required('Gender required'),
            phoneNumber: yup.string().required('Phone number required'),
            inductionYear: yup.string().required('Year required')
        }),
        onSubmit: async values => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                const formData = new FormData()

                Object.keys(values).forEach(key => {
                    formData.append(key, values[key])
                })

                // const admin = JSON.parse(localStorage.getItem('admin'))
                // const adminId = admin._id

                await axios.put(
                    `${apiLink}/api/admin/update/admin/me`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                toast.success('Profile updated')
                fetchUser()
            } catch (err) {
                console.log(err.response?.data?.message || err.message)
                toast.error(err.response?.data?.message || err.message)
            } finally {
                setLoading(false)
            }
        }
    })

    const handleImage = e => {
        const file = e.target.files[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setPreview(url)
        formik.setFieldValue('passport', file)
    }



  return (
    <div className='settings-page-container'>
      <Toaster position='top-center' toastOptions={{ duration: 4000 }} />

      {detailsLoading ? toast.success('Loading details') : undefined}

      <form className='settings-card-container' onSubmit={formik.handleSubmit}>

        <div className='settings-profile-image'>
          <img
            src={preview || '/placeholder.png'}
            alt=''
            className='settings-avatar'
          />

          <input
            type='file'
            accept='image/*'
            onChange={handleImage}
          />

          <small className='err'>
            {formik.touched.passport && formik.errors.passport ? formik.errors.passport : ''}
          </small>
        </div>

        <div className='settings-profile'>

          {/* Serial Number */}
          <div className='settings-profile-group'>
            <div className='settings-field'>
              <input
                type='text'
                placeholder='Serial Number'
                name='serialNumber'
                value={formik.values.serialNumber}
                disabled
              />
              <small className='err'>
                {formik.touched.serialNumber && formik.errors.serialNumber ? formik.errors.serialNumber : ''}
              </small>
            </div>
          </div>

          {/* Names */}
          <div className='settings-profile-group'>

            <div className='settings-field'>
              <input
                type='text'
                placeholder='First Name'
                name='firstName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              <small className='err'>
                {formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''}
              </small>
            </div>

            <div className='settings-field'>
              <input
                type='text'
                placeholder='Middle Name'
                name='middleName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.middleName}
              />
              <small className='err'>
                {formik.touched.middleName && formik.errors.middleName ? formik.errors.middleName : ''}
              </small>
            </div>

            <div className='settings-field'>
              <input
                type='text'
                placeholder='Last Name'
                name='lastName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              <small className='err'>
                {formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''}
              </small>
            </div>

          </div>

          {/* Gender */}
          <div className='settings-profile-group'>
            <div className='settings-field-gender'>
              <label className='radio'>
                <input
                  type='radio'
                  name='gender'
                  value='Male'
                  onChange={formik.handleChange}
                  checked={formik.values.gender === 'Male'}
                />
                Male
              </label>

              <label className='radio'>
                <input
                  type='radio'
                  name='gender'
                  value='Female'
                  onChange={formik.handleChange}
                  checked={formik.values.gender === 'Female'}
                />
                Female
              </label>

            </div>
            <small className='err-gen'>
              {formik.touched.gender && formik.errors.gender ? formik.errors.gender : ''}
            </small>
          </div>

          {/* Email and Phone */}
          <div className='settings-profile-group'>
            <div className='settings-field'>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={formik.values.email}
                disabled
              />
              <small className='err'></small>
            </div>

            <div className='settings-field'>
              <input
                type='text'
                placeholder='Phone Number'
                name='phoneNumber'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              <small className='err'>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ''}
              </small>
            </div>
          </div>

          {/* Year and Position */}
          <div className='settings-profile-group'>
            <div className='settings-field'>
              <input
                type='text'
                placeholder='Year of induction'
                name='inductionYear'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.inductionYear}
              />
              <small className='err'>
                {formik.touched.inductionYear && formik.errors.inductionYear ? formik.errors.inductionYear : ''}
              </small>
            </div>

            <div className='settings-field'>
              <input
                type='text'
                placeholder='Role'
                name='role'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                disabled
                readOnly
              />
              <small className='err'>
                {formik.touched.role && formik.errors.role ? formik.errors.role : ''}
              </small>
            </div>
          </div>

          <Button type='submit' text={loading ? 'Submitting...' : 'Save Changes'} />
        </div>
      </form>
    </div>
  )
}
