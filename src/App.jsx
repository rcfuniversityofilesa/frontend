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
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
