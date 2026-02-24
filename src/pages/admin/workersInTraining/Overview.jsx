import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getOverviewStats } from '../../../services/workersInTrainingService'
import {
  FaUsers,
  FaTrophy,
  FaCheckCircle,
  FaFileAlt,
  FaSpinner,
} from 'react-icons/fa'
import '../../../styles/pages/admin/workersInTraining/Overview.module.css'

/**
 * Workers In Training Overview Dashboard
 * Displays key metrics and statistics
 */
export default function Overview() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await getOverviewStats()
      setStats(response.data)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to fetch statistics'
      )
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    {
      id: 1,
      title: 'Total Applicants',
      value: stats?.totalApplicants || 0,
      icon: <FaUsers />,
      color: '#3498db',
    },
    {
      id: 2,
      title: 'Exam Taken',
      value: stats?.totalExamTaken || 0,
      icon: <FaFileAlt />,
      color: '#f39c12',
    },
    {
      id: 3,
      title: 'Passed',
      value: stats?.totalPassed || 0,
      icon: <FaTrophy />,
      color: '#27ae60',
    },
    {
      id: 4,
      title: 'Interviewed',
      value: stats?.totalInterviewed || 0,
      icon: <FaCheckCircle />,
      color: '#9b59b6',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  if (loading) {
    return (
      <div className="overview-loading">
        <FaSpinner className="spinner-icon" />
        <p>Loading statistics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="overview-error">
        <p>{error}</p>
        <button onClick={fetchStats}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h1>Overview Dashboard</h1>
        <p>
          Monitor key metrics for Workers In
          Training program
        </p>
      </div>

      <motion.div
        className="overview-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="overview-card"
            variants={cardVariants}
            style={{ borderLeftColor: card.color }}
          >
            <div
              className="card-icon"
              style={{ color: card.color }}
            >
              {card.icon}
            </div>
            <div className="card-content">
              <p className="card-title">
                {card.title}
              </p>
              <p
                className="card-value"
                style={{ color: card.color }}
              >
                {card.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="overview-footer">
        <button
          onClick={fetchStats}
          className="refresh-btn"
        >
          Refresh Data
        </button>
      </div>
    </div>
  )
}
