import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { user, profile, signOut, loading } = useAuth()

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
      document.documentElement.classList.add('nav-open-lock');
    } else {
      document.documentElement.classList.remove('nav-open-lock');
    }
    return () => { document.documentElement.classList.remove('nav-open-lock'); };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url

  return (
    <>
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'menu-open' : ''}`}>
      <div className="nav-inner">
        <Link 
          to="/" 
          className="nav-logo" 
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            setMobileOpen(false)
          }}
        >
          <Logo size={28} />
          <span>RepoChat</span>
        </Link>

        {/* Desktop Links — centered */}
        <ul className="nav-links desktop-only">
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/security">Security</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Desktop Avatar — right aligned */}
        <div className="nav-end desktop-only">
          {!loading && user && avatarUrl ? (
            <div className="nav-user-area" ref={dropdownRef}>
              <button
                className="nav-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User menu"
              >
                <img
                  src={avatarUrl}
                  alt={profile?.username || 'User'}
                  className="nav-avatar"
                />
                {profile?.is_pro && (
                  <span className="nav-avatar-pro-dot" />
                )}
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="nav-dropdown"
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="nav-dropdown-header">
                      <img src={avatarUrl} alt="" className="nav-dropdown-avatar" />
                      <div className="nav-dropdown-name-row">
                        <p className="nav-dropdown-name">{profile?.username || 'User'}</p>
                        {profile?.is_pro && (
                          <span className="nav-dropdown-pro-badge">
                            <Sparkles size={10} /> Pro
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="nav-dropdown-divider" />
                    <button
                      className="nav-dropdown-item"
                      onClick={async () => {
                        setDropdownOpen(false)
                        await signOut()
                      }}
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : !loading ? (
            <button
              className="nav-signin-btn"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign in
            </button>
          ) : (
            <div style={{ width: 32 }} />
          )}
        </div>

        {/* Mobile: hamburger only */}
        <div className="nav-right-mobile">
          <button className="nav-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
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

            {!loading && user ? (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  {avatarUrl && <img src={avatarUrl} alt="" className="mobile-user-avatar" />}
                  <div className="nav-dropdown-name-row">
                    <p className="mobile-user-name">{profile?.username || 'User'}</p>
                    {profile?.is_pro && (
                      <span className="nav-dropdown-pro-badge"><Sparkles size={10} /> Pro</span>
                    )}
                  </div>
                </div>
                <button
                  className="mobile-signout-btn"
                  onClick={async () => {
                    setMobileOpen(false)
                    await signOut()
                  }}
                >
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            ) : !loading ? (
              <div className="mobile-signin-section">
                <button
                  className="mobile-signin-btn"
                  onClick={() => {
                    setMobileOpen(false)
                    setAuthModalOpen(true)
                  }}
                >
                  Sign in with GitHub
                </button>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

    <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
