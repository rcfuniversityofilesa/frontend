import React from 'react'
import styles from '../../styles/pages/public/ApplyAsWorker.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Button from '../../components/common/Button'

export default function ApplyAsWorker() {
  const [preview, setPreview] = React.useState(null)

  const formik = useFormik({
    initialValues: {
      passport: null,
      fullName: '',
      gender: '',
      phoneNumber: '',
      DOB: '',
      capAddress: '',
      homeAddress: '',
      programme: '',
      level: '',
      saved: '',
      salvationStory: '',
      baptized: '',
      holySpiritbaptized: '',
      unit: '',
      reason: '',
      relationship: '',
      details: '',
      declaration: false,
    },

    validationSchema: yup.object({
      passport: yup.mixed().required('Passport is required'),
      fullName: yup.string().required('Full Name is required'),
      gender: yup.string().required('Gender is required'),
      phoneNumber: yup.string().required('Phone Number is required'),
      DOB: yup.date().required('Date of Birth is required'),
      capAddress: yup.string().required('Campus Address is required'),
      homeAddress: yup.string().required('Home Address is required'),
      programme: yup.string().required('Programme is required'),
      level: yup.string().required('Level is required'),
      saved: yup.string().required('This field is required'),
      salvationStory: yup.string().required('Salvation Story is required'),
      baptized: yup.string().required('This field is required'),
      holySpiritbaptized: yup.string().required('This field is required'),
      unit: yup.string().required('Unit is required'),
      reason: yup.string().required('Reason is required'),
      relationship: yup.string().required('Relationship Status is required'),
      details: yup.string().required('Extra Details is required'),
      declaration: yup.boolean().oneOf([true], 'You must confirm you will abide to the fellowship rules and regulations'),
    }),

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        Object.keys(values).forEach(key => {
          if (key === 'passport') {
            formData.append('passport', values.passport)
          } else {
            formData.append(key, values[key])
          }
        })

        const res = await axios.post(
          'https://backend-04sy.onrender.com/api/user/apply/workforce',
          formData,
          {
            responseType: "blob",
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )

        toast.success('Application Successfully')

        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `${formik.values.fullName}-application.pdf`)
        document.body.appendChild(link)
        link.click()

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.log(err);
        toast.error(`Error applying: ${err.response?.data?.message || err.message}`)
      }
    }

  })

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    formik.setFieldValue('passport', file);
  };


  return (
    <div className={styles.wrapper}>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <h2 className={styles.title}>Workers Form</h2>

      <form className={styles.formcont} onSubmit={formik.handleSubmit}>

        <div className={styles.profileimage}>
          <img
            src={preview || '/placeholder.png'}
            alt=''
            className={styles.avatar}
          />

          <input
            type='file'
            accept='image/*'
            onChange={handleImage}
          />

          <p>{formik.touched.passport && formik.errors.passport ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.passport}</span> : ''}</p>
        </div><br />

        <div className={styles.form}>
          <div className={styles.group}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.fullName && formik.errors.fullName ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.fullName}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Gender</label>
            <div className={styles.inline}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formik.values.gender === "male"}
                  onChange={formik.handleChange}
                /> Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formik.values.gender === "female"}
                  onChange={formik.handleChange}
                /> Female
              </label>
            </div>
            <p>{formik.touched.gender && formik.errors.gender ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.gender}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.phoneNumber && formik.errors.phoneNumber ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.phoneNumber}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="DOB"
              value={formik.values.DOB}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.DOB && formik.errors.DOB ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.DOB}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Campus Address</label>
            <input
              type="text"
              name="capAddress"
              value={formik.values.capAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.capAddress && formik.errors.capAddress ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.capAddress}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Home Address</label>
            <input
              type="text"
              name="homeAddress"
              value={formik.values.homeAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.homeAddress && formik.errors.homeAddress ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.homeAddress}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Programme</label>
            <input
              type="text"
              name="programme"
              value={formik.values.programme}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.programme && formik.errors.programme ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.programme}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Level</label>
            <input
              type="text"
              name="level"
              value={formik.values.level}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.level && formik.errors.level ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.level}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Are you saved</label>
            <input
              type="text"
              name="saved"
              value={formik.values.saved}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.saved && formik.errors.saved ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.saved}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Your Salvation Story</label>
            <textarea
              name="salvationStory"
              value={formik.values.salvationStory}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            ></textarea>
            <p>{formik.touched.salvationStory && formik.errors.salvationStory ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.salvationStory}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Water Baptized</label>
            <input
              type="text"
              name="baptized"
              value={formik.values.baptized}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.baptized && formik.errors.baptized ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.baptized}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Spirit Baptized</label>
            <input
              type="text"
              name="holySpiritbaptized"
              value={formik.values.holySpiritbaptized}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.holySpiritbaptized && formik.errors.holySpiritbaptized ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.holySpiritbaptized}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Unit you want to join</label>
            <input
              type="text"
              name="unit"
              value={formik.values.unit}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.unit && formik.errors.unit ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.unit}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Why do you want to join</label>
            <textarea
              name="reason"
              value={formik.values.reason}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            ></textarea>
            <p>{formik.touched.reason && formik.errors.reason ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.reason}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Relationship Status</label>
            <input
              type="text"
              name="relationship"
              value={formik.values.relationship}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.relationship && formik.errors.relationship ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.relationship}</span> : ''}</p>
          </div>

          <div className={styles.group}>
            <label>Give Details</label>
            <textarea
              name="details"
              value={formik.values.details}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            ></textarea>
            <p>{formik.touched.details && formik.errors.details ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.details}</span> : ''}</p>
          </div>

          <div className={styles.declaration}>
            <label>
              <input
                type="checkbox"
                name="declaration"
                checked={formik.values.declaration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className={styles.confirm}>I attest that the information above are true and I shall abide with the rules and regulations governing the proper conduct of the REDEEMED CHRISTIAN FELLOWSHIP, UNILESA, ILESA.</span>
            </label>
            <p>{formik.touched.declaration && formik.errors.declaration ? <span style={{ color: 'red', fontSize: '10px' }}>{formik.errors.declaration}</span> : ''}</p>
          </div>

        </div>
        <Button type="submit" text='Submit' />
      </form>
    </div>
  )
}