import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'

// Components
import Loader from './components/ui/Loader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import Home from './pages/public/Home'
import Contactus from './pages/public/ContactUs'
import Programs from './pages/public/Programs'
import News from './pages/public/News'
import Hymns from './pages/public/Hymns'
import ApplyAsWorker from './pages/public/ApplyAsWorker'
import PageNotFound from './pages/public/PageNotFound'
import SideNav from './components/admin/layout/SideNav'
import TopNav from './components/admin/layout/TopNav'

// Auth
import Register from './pages/admin/auth/Register'
import Login from './pages/admin/auth/Login'

// Admin Dashborad
import PostHymn from './pages/admin/pages/PostHymn'
import PostNews from './pages/admin/pages/PostNews'
import PostProgram from './pages/admin/pages/PostProgram'
import PublishedHymn from './pages/admin/pages/PublishedHymn'
import PublishedNews from './pages/admin/pages/PublishedNews'
import PublishedProgram from './pages/admin/pages/PublishedProgram'
import Applicant from './pages/admin/pages/Applicant'
import Inbox from './pages/admin/pages/Inbox'
import Profile from './pages/admin/pages/Profile'

function App() {

  const [loading, setLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/auth')

    useEffect(() => {
    if (isAdminRoute) {
      setLoading(false)
      return
    }
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  if (loading && !isAdminRoute) return <Loader fullscreen />

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/aboutus' element={<AboutUs />} /> */}
        {/* <Route path='/gallery' element={<Gallery />} /> */}
        <Route path='/contactus' element={<Contactus />} />
        <Route path='/events' element={<Programs />} />
        <Route path='/news' element={<News />} />
        <Route path='/hymns' element={<Hymns />} />
        <Route path='/apply-as-worker' element={<ApplyAsWorker />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />

        <Route
          path="/admin/*"
          element={
            <div className="layout">
              <SideNav
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
              />
              <div
                className={`main-content ${isExpanded ? '' : 'collapsed'} ${mobileOpen ? 'shifted' : ''
                  }`}
                style={{ transition: 'margin-left 300ms ease' }}
              >
                {/* <TopNav
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                /> */}
                <div className="admin-content">
                  <Routes>
                    {/* <Route path="" element={<OverView />} /> */}
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
                  </Routes>
                </div>
              </div>
              <div
                className={`mobile-overlay ${mobileOpen ? 'visible' : ''}`}
                onClick={() => setMobileOpen(false)}
                aria-hidden={!mobileOpen}
              />
            </div>
          }
        />

        <Route path='*' element={<PageNotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
