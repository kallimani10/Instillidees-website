import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ScrollProgress, Cursor } from './components/Chrome'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function scrollToHashOrTop(hash) {
  if (hash) {
    const el = document.getElementById(hash.slice(1))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
  }
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function Page({ children }) {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } }}
    >
      {children}
    </motion.main>
  )
}

/** Full-screen wipe that plays on every route change. */
function Curtain() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[65] origin-bottom bg-ink"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }}
      exit={{ scaleY: 0 }}
      style={{ transformOrigin: 'top' }}
      aria-hidden="true"
    />
  )
}

export default function App() {
  const location = useLocation()

  // Same-page hash links (e.g. clicking "/#products" while on Home)
  useEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => scrollToHashOrTop(location.hash), 80)
      return () => clearTimeout(t)
    }
  }, [location.hash])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => scrollToHashOrTop(window.location.hash)}>
        <div key={location.pathname}>
          <Curtain />
          <Routes location={location}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/blog" element={<Page><Blog /></Page>} />
            <Route path="/blog/:slug" element={<Page><BlogDetail /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </div>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}
