import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'menu-open' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
          <Logo size={28} />
          <span>RepoChat</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links desktop-only">
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/security">Security</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <button className="nav-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ul className="mobile-nav-links">
              <li><Link to="/features" onClick={() => setMobileOpen(false)}>Features</Link></li>
              <li><Link to="/pricing" onClick={() => setMobileOpen(false)}>Pricing</Link></li>
              <li><Link to="/security" onClick={() => setMobileOpen(false)}>Security</Link></li>
              <li><Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
