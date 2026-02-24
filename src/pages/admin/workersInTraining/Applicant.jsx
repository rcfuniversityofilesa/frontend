import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import {
  getApplicants,
  hasApplicantTakenExam,
  moveToInterviewed,
} from '../../../services/workersInTrainingService'
import {
  FaSpinner,
  FaCheck,
  FaTimes,
} from 'react-icons/fa'
import '../../../styles/pages/admin/workersInTraining/Applicant.module.css'

/**
 * Applicants Management Page
 * Lists all applicants and manages interview status
 * Before approving for interview, checks if exam was taken
 */
export default function Applicant() {
  const [applicants, setApplicants] =
    useState([])
  const [loading, setLoading] = useState(true)
  const [examStatusMap, setExamStatusMap] =
    useState({})
  const [selectedApplicant, setSelectedApplicant] =
    useState(null)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] =
    useState(false)

  useEffect(() => {
    fetchApplicants()
  }, [])

  const fetchApplicants = async () => {
    try {
      setLoading(true)
      const response = await getApplicants()
      setApplicants(response.data)

      // Check exam status for each applicant
      const statusMap = {}
      for (const applicant of response.data) {
        try {
          const examCheck =
            await hasApplicantTakenExam(
              applicant.email
            )
          statusMap[applicant._id] =
            examCheck.data.hasTaken
        } catch (err) {
          statusMap[applicant._id] = false
        }
      }
      setExamStatusMap(statusMap)
    } catch (err) {
      toast.error(
        'Failed to fetch applicants'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleMoveToInterview = (
    applicant
  ) => {
    // Check if exam was taken
    if (!examStatusMap[applicant._id]) {
      toast.error(
        'Applicant must take exam first'
      )
      return
    }

    setSelectedApplicant(applicant)
    setShowModal(true)
  }

  const confirmInterview = async () => {
    setSubmitting(true)
    try {
      await moveToInterviewed(
        selectedApplicant._id,
        { interviewedDate: new Date() }
      )
      toast.success('Applicant moved to interviewed')
      setShowModal(false)
      setSelectedApplicant(null)
      await fetchApplicants()
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Failed to move applicant'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="applicants-loading">
        <FaSpinner className="spinner-icon" />
        <p>Loading applicants...</p>
      </div>
    )
  }

  return (
    <div className="applicants-container">
      <div className="applicants-header">
        <h1>Manage Applicants</h1>
        <p>
          Review applications and manage interviews
        </p>
      </div>

      <div className="applicants-table-wrapper">
        {applicants.length === 0 ? (
          <div className="no-data">
            <p>No applicants found</p>
          </div>
        ) : (
          <table className="applicants-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Exam Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr key={app._id}>
                  <td>{app.fullName}</td>
                  <td>{app.email}</td>
                  <td>
                    <span
                      className={`badge badge-${app.status?.toLowerCase()}`}
                    >
                      {app.status ||
                        'pending'}
                    </span>
                  </td>
                  <td>
                    {examStatusMap[app._id] ? (
                      <span className="badge badge-success">
                        <FaCheck /> Exam Taken
                      </span>
                    ) : (
                      <span className="badge badge-danger">
                        <FaTimes /> Exam Not Taken
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleMoveToInterview(
                          app
                        )
                      }
                      disabled={
                        !examStatusMap[
                          app._id
                        ]
                      }
                      title={
                        !examStatusMap[
                          app._id
                        ]
                          ? 'Applicant must take exam first'
                          : ''
                      }
                    >
                      Interview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Confirm Interview</h2>
              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                Move{' '}
                <strong>
                  {
                    selectedApplicant
                      ?.fullName
                  }
                </strong>{' '}
                to interviewed list?
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={confirmInterview}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FaSpinner className="btn-spinner" />
                    Processing...
                  </>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
