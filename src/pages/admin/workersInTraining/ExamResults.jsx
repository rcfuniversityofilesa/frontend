import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  getExamResults,
} from '../../../services/workersInTrainingService'
import { FaSpinner, FaSearch } from 'react-icons/fa'
import '../../../styles/pages/admin/workersInTraining/ExamResults.module.css'

/**
 * Exam Results Page
 * Display all submitted exam results
 * No manual editing allowed - read-only view
 */
export default function ExamResults() {
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] =
    useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [passFilter, setPassFilter] = useState('all')

  useEffect(() => {
    fetchResults()
  }, [])

  useEffect(() => {
    filterResults()
  }, [results, searchTerm, passFilter])

  const fetchResults = async () => {
    try {
      setLoading(true)
      const response = await getExamResults()
      setResults(response.data)
    } catch (err) {
      toast.error(
        'Failed to fetch exam results'
      )
    } finally {
      setLoading(false)
    }
  }

  const filterResults = () => {
    let filtered = results

    // Filter by search term (name or email)
    if (searchTerm) {
      filtered = filtered.filter((result) =>
        result.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        result.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    }

    // Filter by pass/fail status
    if (passFilter !== 'all') {
      filtered = filtered.filter(
        (result) =>
          (passFilter === 'passed' &&
            result.passed) ||
          (passFilter === 'failed' &&
            !result.passed)
      )
    }

    setFilteredResults(filtered)
  }

  if (loading) {
    return (
      <div className="exam-results-loading">
        <FaSpinner className="spinner-icon" />
        <p>Loading exam results...</p>
      </div>
    )
  }

  return (
    <div className="exam-results-container">
      <div className="exam-results-header">
        <h1>Exam Results</h1>
        <p>
          View all submitted exam results (read-only)
        </p>
      </div>

      <div className="exam-results-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="filter-group">
          <label>Filter:</label>
          <select
            value={passFilter}
            onChange={(e) =>
              setPassFilter(e.target.value)
            }
          >
            <option value="all">All Results</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="exam-results-table-wrapper">
        {filteredResults.length === 0 ? (
          <div className="no-data">
            <p>No results found</p>
          </div>
        ) : (
          <table className="exam-results-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Date Taken</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result._id}>
                  <td className="td-fullname">
                    {result.fullName}
                  </td>
                  <td className="td-email">
                    {result.email}
                  </td>
                  <td className="td-score">
                    {result.score}/{
                      result.totalQuestions
                    }
                  </td>
                  <td className="td-percentage">
                    <span
                      className={`percentage ${result.percentage >= 50 ? 'high' : 'low'}`}
                    >
                      {result.percentage}%
                    </span>
                  </td>
                  <td>
                    {result.passed ? (
                      <span className="badge badge-passed">
                        PASSED
                      </span>
                    ) : (
                      <span className="badge badge-failed">
                        FAILED
                      </span>
                    )}
                  </td>
                  <td className="td-date">
                    {new Date(
                      result.submittedAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="results-footer">
        <p className="results-count">
          Showing {filteredResults.length} of{' '}
          {results.length} results
        </p>
        <button
          onClick={fetchResults}
          className="refresh-btn"
        >
          Refresh Data
        </button>
      </div>
    </div>
  )
}
