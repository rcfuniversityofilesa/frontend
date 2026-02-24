import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import {
  getAdminProfile,
  updateAdminProfile,
  changePassword,
} from '../../../services/workersInTrainingService'
import { useAuth } from '../../../context/AuthContext'
import {
  FaSpinner,
  FaUser,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
import '../../../styles/pages/admin/workersInTraining/Profile.module.css'

/**
 * Admin Profile Page
 * Allows admin to view and edit their profile
 */
export default function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] =
    useState(false)
  const [submitting, setSubmitting] =
    useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await getAdminProfile()
      setProfile(response.data)
    } catch (err) {
      // If API not available, use context data
      setProfile(
        user || {
          fullName: 'Admin User',
          email: 'admin@example.com',
          phone: '',
          bio: '',
        }
      )
    } finally {
      setLoading(false)
    }
  }

  // Profile Update Form
  const profileFormik = useFormik({
    initialValues: profile || {
      fullName: '',
      phone: '',
      bio: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      fullName: yup
        .string()
        .min(2, 'Name is too short')
        .required('Name is required'),
      phone: yup
        .string()
        .matches(
          /^[0-9\-\+\s\(\)]*$/,
          'Invalid phone number'
        ),
      bio: yup
        .string()
        .max(500, 'Bio is too long'),
    }),
    onSubmit: async (values) => {
      setSubmitting(true)
      try {
        await updateAdminProfile(values)
        setProfile(values)
        setEditing(false)
        toast.success('Profile updated successfully')
      } catch (err) {
        toast.error('Failed to update profile')
      } finally {
        setSubmitting(false)
      }
    },
  })

  // Password Change Form
  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      oldPassword: yup
        .string()
        .required('Current password is required'),
      newPassword: yup
        .string()
        .min(8, 'Password is too short')
        .required('New password is required'),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref('newPassword'), null],
          'Passwords must match'
        )
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      setSubmitting(true)
      try {
        await changePassword(
          values.oldPassword,
          values.newPassword
        )
        passwordFormik.resetForm()
        setShowPasswordForm(false)
        toast.success(
          'Password changed successfully'
        )
      } catch (err) {
        toast.error('Failed to change password')
      } finally {
        setSubmitting(false)
      }
    },
  })

  if (loading) {
    return (
      <div className="profile-loading">
        <FaSpinner className="spinner-icon" />
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </div>

      <div className="profile-grid">
        {/* Profile Information Section */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Account Information</h2>
            {!editing && (
              <button
                className="btn btn-primary"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            )}
          </div>

          <div className="card-content">
            {!editing ? (
              <div className="profile-details">
                <div className="detail-row">
                  <span className="label">
                    <FaUser /> Full Name
                  </span>
                  <span className="value">
                    {profile?.fullName}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">
                    Email
                  </span>
                  <span className="value">
                    {profile?.email || user?.email}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">
                    <FaPhone /> Phone
                  </span>
                  <span className="value">
                    {profile?.phone ||
                      'Not provided'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">
                    Bio
                  </span>
                  <span className="value">
                    {profile?.bio ||
                      'No bio added'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">
                    Role
                  </span>
                  <span className="value badge">
                    Workers In Training Admin
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={profileFormik.handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    {...profileFormik.getFieldProps(
                      'fullName'
                    )}
                  />
                  {profileFormik.touched.fullName &&
                  profileFormik.errors.fullName ? (
                    <small>
                      {profileFormik.errors.fullName}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    {...profileFormik.getFieldProps(
                      'phone'
                    )}
                  />
                  {profileFormik.touched.phone &&
                  profileFormik.errors.phone ? (
                    <small>
                      {profileFormik.errors.phone}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    rows="4"
                    {...profileFormik.getFieldProps(
                      'bio'
                    )}
                  />
                  {profileFormik.touched.bio &&
                  profileFormik.errors.bio ? (
                    <small>
                      {profileFormik.errors.bio}
                    </small>
                  ) : null}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditing(false)
                      profileFormik.resetForm()
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="btn-spinner" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Security Section */}
        <div className="profile-card">
          <div className="card-header">
            <h2>
              <FaLock /> Security
            </h2>
          </div>

          <div className="card-content">
            <button
              className="btn btn-outline"
              onClick={() =>
                setShowPasswordForm(
                  !showPasswordForm
                )
              }
            >
              Change Password
            </button>

            {showPasswordForm && (
              <form onSubmit={passwordFormik.handleSubmit}>
                <div className="form-group">
                  <label>
                    Current Password
                  </label>
                  <input
                    type="password"
                    {...passwordFormik.getFieldProps(
                      'oldPassword'
                    )}
                  />
                  {passwordFormik.touched
                    .oldPassword &&
                  passwordFormik.errors
                    .oldPassword ? (
                    <small>
                      {
                        passwordFormik.errors
                          .oldPassword
                      }
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    {...passwordFormik.getFieldProps(
                      'newPassword'
                    )}
                  />
                  {passwordFormik.touched
                    .newPassword &&
                  passwordFormik.errors
                    .newPassword ? (
                    <small>
                      {
                        passwordFormik.errors
                          .newPassword
                      }
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    {...passwordFormik.getFieldProps(
                      'confirmPassword'
                    )}
                  />
                  {passwordFormik.touched
                    .confirmPassword &&
                  passwordFormik.errors
                    .confirmPassword ? (
                    <small>
                      {
                        passwordFormik.errors
                          .confirmPassword
                      }
                    </small>
                  ) : null}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowPasswordForm(false)
                      passwordFormik.resetForm()
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="btn-spinner" />
                        Updating...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
