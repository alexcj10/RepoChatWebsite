import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

// Animated, colorful SVG banner representing "Humanity & Computers"
function AnimatedIllustration() {
  return (
    <div className="auth-modal-banner-illustration">
      <svg width="100%" height="100%" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Human side gradient (warm, organic) */}
          <linearGradient id="humanGrad" x1="0" y1="0" x2="160" y2="140">
            <stop offset="0%" stopColor="#f43f5e" /> {/* Rose */}
            <stop offset="100%" stopColor="#f59e0b" /> {/* Amber */}
          </linearGradient>
          
          {/* Computer side gradient (cool, structured) */}
          <linearGradient id="compGrad" x1="160" y1="0" x2="320" y2="140">
            <stop offset="0%" stopColor="#0ea5e9" /> {/* Sky */}
            <stop offset="100%" stopColor="#8b5cf6" /> {/* Violet */}
          </linearGradient>

          {/* Connection glow */}
          <radialGradient id="glow" cx="160" cy="70" r="80">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Background panel glow */}
        <motion.rect
          x="0" y="0" width="320" height="140" rx="16"
          fill="rgba(255,255,255,0.02)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* ========================================== */}
        {/* LEFT SIDE: Humanity (Organic, Flowing) */}
        {/* ========================================== */}
        
        {/* Organic abstract wave shapes (Brain/Creativity) */}
        <motion.path
          d="M 20 100 Q 40 40 80 50 T 130 70"
          stroke="url(#humanGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 30 120 Q 70 80 100 110 T 140 90"
          stroke="url(#humanGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        />
        
        {/* Floating human "sparks" (Ideas) */}
        {[
          { cx: 40, cy: 60, r: 8 },
          { cx: 80, cy: 30, r: 5 },
          { cx: 110, cy: 50, r: 12 },
        ].map((circle, i) => (
          <motion.circle
            key={`h-${i}`}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill="url(#humanGrad)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 1 + i * 0.2 }}
          />
        ))}

        {/* ========================================== */}
        {/* RIGHT SIDE: Computers (Structured, Code) */}
        {/* ========================================== */}
        
        {/* Abstract Laptop / Screen */}
        <motion.rect
          x="190" y="40" width="100" height="60" rx="4"
          stroke="url(#compGrad)"
          strokeWidth="3"
          fill="rgba(14, 165, 233, 0.1)"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.rect
          x="180" y="100" width="120" height="6" rx="3"
          fill="url(#compGrad)"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        {/* Code elements inside screen */}
        <motion.path
          d="M 205 60 L 215 70 L 205 80"
          stroke="#0ea5e9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        />
        <motion.path
          d="M 230 60 L 220 70 L 230 80"
          stroke="#0ea5e9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        />
        <motion.line
          x1="240" y1="70" x2="270" y2="70"
          stroke="#8b5cf6"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        />

        {/* ========================================== */}
        {/* CENTER: The Connection (Data flow) */}
        {/* ========================================== */}

        {/* Central glowing orb */}
        <motion.circle
          cx="160" cy="70" r="15"
          fill="url(#glow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Data lines connecting human and computer */}
        <motion.path
          d="M 120 70 L 200 70"
          stroke="url(#compGrad)"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        />
        
        {/* Pulsing data packets */}
        <motion.circle
          cx="130" cy="70" r="3"
          fill="#fff"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 60, opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 3 }}
        />
        <motion.circle
          cx="130" cy="70" r="3"
          fill="#fff"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 60, opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 3.75 }}
        />

      </svg>
    </div>
  )
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn } = useAuth()

  const handleSignIn = async () => {
    await signIn()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="auth-modal-overlay" onClick={onClose}>
          <motion.div
            className="auth-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            className="auth-modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="auth-modal-close" onClick={onClose} aria-label="Close">
              <X size={16} />
            </button>

            <AnimatedIllustration />

            <div className="auth-modal-logo">
              <Logo size={24} />
              <span>RepoChat</span>
            </div>

            <h2 className="auth-modal-title">Sign in to continue</h2>
            <p className="auth-modal-desc">
              Connect your GitHub account to upgrade to Pro and unlock all features.
            </p>

            <button className="auth-modal-github-btn" onClick={handleSignIn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>

            <p className="auth-modal-footer">
              We only read your public profile. No repo access required.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
