import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  getInterviewedApplicants,
} from '../../../services/workersInTrainingService'
import { FaSpinner } from 'react-icons/fa'
import '../../../styles/pages/admin/workersInTraining/Interviewed.module.css'

/**
 * Interviewed Applicants Page
 * Displays only applicants marked as interviewed
 * Shows their exam scores and pass/fail status
 */
export default function Interviewed() {
  const [applicants, setApplicants] =
    useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchInterviewedApplicants()
  }, [])

  const fetchInterviewedApplicants =
    async () => {
      try {
        setLoading(true)
        const response =
          await getInterviewedApplicants()
        setApplicants(response.data)
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Failed to fetch interviewed applicants'
        )
        toast.error('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

  if (loading) {
    return (
      <div className="interviewed-loading">
        <FaSpinner className="spinner-icon" />
        <p>Loading interviewed applicants...</p>
      </div>
    )
  }

  return (
    <div className="interviewed-container">
      <div className="interviewed-header">
        <h1>Interviewed Applicants</h1>
        <p>
          View applicants who have been
          interviewed with their exam results
        </p>
      </div>

      <div className="interviewed-table-wrapper">
        {applicants.length === 0 ? (
          <div className="no-data">
            <p>No interviewed applicants yet</p>
          </div>
        ) : (
          <table className="interviewed-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Exam Score</th>
                <th>Percentage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr key={app._id}>
                  <td className="td-fullname">
                    {app.fullName}
                  </td>
                  <td className="td-email">
                    {app.email}
                  </td>
                  <td className="td-score">
                    {app.examScore || 0}
                  </td>
                  <td className="td-percentage">
                    {app.examPercentage || 0}%
                  </td>
                  <td>
                    {app.examPassed ? (
                      <span className="badge badge-passed">
                        PASSED
                      </span>
                    ) : (
                      <span className="badge badge-failed">
                        FAILED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="interviewed-footer">
        <button
          onClick={
            fetchInterviewedApplicants
          }
          className="refresh-btn"
        >
          Refresh Data
        </button>
      </div>
    </div>
  )
}
