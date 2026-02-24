import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import '../../styles/pages/public/ExamResults.module.css'

/**
 * Exam Results Page
 * Display exam performance after submission
 * Route: /exam/workers/results
 */
export default function ExamResults() {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)

  useEffect(() => {
    const savedResults =
      sessionStorage.getItem('examResults')

    if (!savedResults) {
      navigate('/exam/workers')
      return
    }

    setResults(JSON.parse(savedResults))
  }, [navigate])

  if (!results) {
    return <div>Loading results...</div>
  }

  const { passed, percentage, score, totalQuestions, timeSpentSeconds } =
    results

  const minutes = Math.floor(
    timeSpentSeconds / 60
  )
  const seconds =
    timeSpentSeconds % 60

  return (
    <div className="exam-results-container">
      <div className="results-wrapper">
        {/* Result Card */}
        <div className="result-card">
          <div className="result-icon">
            {passed ? (
              <FaCheckCircle className="icon-passed" />
            ) : (
              <FaTimesCircle className="icon-failed" />
            )}
          </div>

          <h1 className="result-title">
            {passed
              ? 'Congratulations!'
              : 'Sorry!'}
          </h1>

          <p className="result-message">
            {passed
              ? 'You have passed the exam. Your application will be reviewed for interview.'
              : 'You did not pass the exam. Please review the topics and try again.'}
          </p>

          {/* Score Display */}
          <div className="score-section">
            <div className="score-item">
              <span className="label">
                Your Score
              </span>
              <span className="value">
                {score}/{totalQuestions}
              </span>
            </div>
            <div className="score-item">
              <span className="label">
                Percentage
              </span>
              <span className={`value ${passed ? 'passed' : 'failed'}`}>
                {percentage}%
              </span>
            </div>
            <div className="score-item">
              <span className="label">
                Time Spent
              </span>
              <span className="value">
                {minutes}m {seconds}s
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="result-details">
            <h3>Exam Summary</h3>
            <ul>
              <li>
                <span>Total Questions:</span>
                <strong>{totalQuestions}</strong>
              </li>
              <li>
                <span>Correct Answers:</span>
                <strong>{score}</strong>
              </li>
              <li>
                <span>Correct Percentage:</span>
                <strong>{percentage}%</strong>
              </li>
              <li>
                <span>Status:</span>
                <strong className={passed ? 'passed' : 'failed'}>
                  {passed ? 'PASSED' : 'FAILED'}
                </strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="results-actions">
          <p className="info-text">
            {passed
              ? 'You will be contacted for interview scheduling.'
              : 'You can attempt the exam again after some time.'}
          </p>

          <div className="button-group">
            <a href="/" className="btn-home">
              Go to Home
            </a>
            <a href="/contactus" className="btn-contact">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
