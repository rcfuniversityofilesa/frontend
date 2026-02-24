import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import {
  getApplicants,
  getExamSettings,
} from '../../services/workersInTrainingService'
import {
  checkExamWindow,
} from '../../utils/examUtils'
import { FaEnvelope, FaUser, FaSpinner } from 'react-icons/fa'
import styles from '../../styles/pages/public/ExamLogin.module.css'
import Button from '../../components/common/Button'


export default function ExamLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .min(2, 'Name is too short')
        .required('Full name is required'),
      email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        // Check if exam is enabled
        const settingsRes =
          await getExamSettings()
        const examSettings =
          settingsRes.data

        const windowCheck =
          checkExamWindow(examSettings)
        if (!windowCheck.isValid) {
          toast.error(windowCheck.message)
          setLoading(false)
          return
        }

        // Check if applicant exists
        const applicantsRes =
          await getApplicants()
        const applicant = applicantsRes.data.find(
          (app) =>
            app.email === values.email &&
            app.fullName === values.fullName
        )

        if (!applicant) {
          toast.error(
            'Applicant not found. Please verify your credentials.'
          )
          setLoading(false)
          return
        }

        // Store exam session data
        sessionStorage.setItem(
          'examSession',
          JSON.stringify({
            fullName: values.fullName,
            email: values.email,
            applicantId: applicant._id,
            startedAt: new Date().toISOString(),
          })
        )

        toast.success('Verification successful!')
        navigate('/exam/workers/start')
      } catch (err) {
        console.error(err)
        toast.error(
          'Failed to verify. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div className={styles.examlogincontainer}>
      <div className={styles.examlogincard}>
        <div className={styles.examloginheader}>
          <h1>Workers In Training Exam</h1>
          <p>Please verify your identity</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.formgroup}>
            <label>Full Name</label>
            <div className={styles.inputwrapper}>
              <FaUser className={styles.inputicon} />
              <input
                type="text"
                placeholder="Enter your full name"
                {...formik.getFieldProps(
                  'fullName'
                )}
              />
            </div>
            {formik.touched.fullName &&
            formik.errors.fullName ? (
              <small className="error">
                {formik.errors.fullName}
              </small>
            ) : null}
          </div>

          <div className={styles.formgroup}>
            <label>Email</label>
            <div className={styles.inputwrapper}>
              <FaEnvelope className={styles.inputicon} />
              <input
                type="email"
                placeholder="Enter your email"
                {...formik.getFieldProps(
                  'email'
                )}
              />
            </div>
            {formik.touched.email &&
            formik.errors.email ? (
              <small className="error">
                {formik.errors.email}
              </small>
            ) : null}
          </div>


          <Button type="submit" disabled={loading} text={loading ? (
              <>
                <FaSpinner className="spinner" />
                Verifying...
              </>
            ) : (
              'Start Exam'
            )} />
        </form>

        <div className={styles.examinfo}>
          <p>
            This exam is only for registered
            applicants.
          </p>
          <p>
            If you are not registered, please{' '}
            <a href="/apply-as-worker">
              apply now
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
