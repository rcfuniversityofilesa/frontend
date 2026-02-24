import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'

// Components
import Loader from './components/ui/Loader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import RoleGuard from './components/auth/RoleGuard'

// Public Pages
import Home from './pages/public/Home'
import Contactus from './pages/public/ContactUs'
import Programs from './pages/public/Programs'
import News from './pages/public/News'
import Hymns from './pages/public/Hymns'
import ApplyAsWorker from './pages/public/ApplyAsWorker'
import PageNotFound from './pages/public/PageNotFound'
import ExamLogin from './pages/public/ExamLogin'
import ExamPage from './pages/public/ExamPage'
import ExamResults from './pages/public/ExamResults'

// Admin Layouts
import SideNav from './components/admin/layout/SideNav'
import WorkersInTrainingLayout from './components/admin/layout/WorkersInTrainingLayout'

// Auth
import Register from './pages/admin/auth/Register'
import Login from './pages/admin/auth/Login'
import Unauthorized from './pages/admin/Unauthorized'

// Admin Media Pages
import PostHymn from './pages/admin/pages/PostHymn'
import PostNews from './pages/admin/pages/PostNews'
import PostProgram from './pages/admin/pages/PostProgram'
import PublishedHymn from './pages/admin/pages/PublishedHymn'
import PublishedNews from './pages/admin/pages/PublishedNews'
import PublishedProgram from './pages/admin/pages/PublishedProgram'
import Applicant from './pages/admin/pages/Applicant'
import Inbox from './pages/admin/pages/Inbox'
import Profile from './pages/admin/pages/Profile'

// Workers In Training Pages
import WITOverview from './pages/admin/workersInTraining/Overview'
import WITApplicant from './pages/admin/workersInTraining/Applicant'
import WITInterviewed from './pages/admin/workersInTraining/Interviewed'
import WITExamSettings from './pages/admin/workersInTraining/ExamSettings'
import WITExamResults from './pages/admin/workersInTraining/ExamResults'
import WITProfile from './pages/admin/workersInTraining/Profile'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith('/admin')
  const isExamRoute = location.pathname.startsWith('/exam')

  useEffect(() => {
    if (isAdminRoute || isExamRoute) {
      setLoading(false)
      return
    }

    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)


  }, [isAdminRoute, isExamRoute, location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  if (loading && !isAdminRoute && !isExamRoute) {
    return <Loader fullscreen />
  }

  return (
    <>
      {!isAdminRoute && !isExamRoute && <Navbar />}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/events" element={<Programs />} />
        <Route path="/news" element={<News />} />
        <Route path="/hymns" element={<Hymns />} />
        <Route path="/apply-as-worker" element={<ApplyAsWorker />} />

        {/* EXAM ROUTES */}
        <Route path="/exam/workers" element={<ExamLogin />} />
        <Route path="/exam/workers/start" element={<ExamPage />} />
        <Route path="/exam/workers/results" element={<ExamResults />} />

        {/* AUTH ROUTES */}
        <Route path="/admin/auth/register" element={<Register />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/unauthorized" element={<Unauthorized />} />

        {/* WORKERS IN TRAINING ADMIN */}
        <Route
          path="/admin/workersInTraining"
          element={
            <ProtectedRoute>
              <RoleGuard requiredRole="workersInTraining">
                <WorkersInTrainingLayout
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route path="overview" element={<WITOverview />} />
          <Route path="applicants" element={<WITApplicant />} />
          <Route path="interviewed" element={<WITInterviewed />} />
          <Route path="exam-settings" element={<WITExamSettings />} />
          <Route path="exam-results" element={<WITExamResults />} />
          <Route path="profile" element={<WITProfile />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* MEDIA ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleGuard requiredRole="media">
                <div className="layout">
                  <SideNav
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                  />
                  <div
                    className={`main-content ${isExpanded ? '' : 'collapsed'} ${mobileOpen ? 'shifted' : ''}`}
                    style={{ transition: 'margin-left 300ms ease' }}
                  >
                    <div className="admin-content">
                      {/* This MUST contain <Outlet /> in real layout file */}
                    </div>
                  </div>
                  <div
                    className={`mobile-overlay ${mobileOpen ? 'visible' : ''}`}
                    onClick={() => setMobileOpen(false)}
                    aria-hidden={!mobileOpen}
                  />
                </div>
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route path="upload/hymn" element={<PostHymn />} />
          <Route path="upload/news" element={<PostNews />} />
          <Route path="upload/program" element={<PostProgram />} />
          <Route path="published/hymns" element={<PublishedHymn />} />
          <Route path="published/news" element={<PublishedNews />} />
          <Route path="published/programs" element={<PublishedProgram />} />
          <Route path="applications" element={<Applicant />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>

      {!isAdminRoute && !isExamRoute && <Footer />}
    </>


  )
}