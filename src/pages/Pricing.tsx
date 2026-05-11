import { useState, useEffect, useCallback } from 'react'
import { Globe, Check, X, Sparkles, Shield, ArrowRight, CheckCircle2, Bot, KeyRound } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import FAQ from '../components/FAQ'
import AuthModal from '../components/AuthModal'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const DODO_PRODUCT_ID = 'pdt_0NdACCVTSZEModHr96UOr'

const freeFeatures = [
  { text: 'Up to 15 Friends', included: true },
  { text: 'Up to 5 Groups', included: true },
  { text: 'Up to 10 Pad entries', included: true },
  { text: 'Up to 3 Custom Lists', included: true },
  { text: 'Up to 5 Pinned Messages', included: true },
  { text: 'Up to 50 Starred Messages', included: true },
  { text: 'Up to 5 Archived Chats', included: true },
  { text: 'GitHub Context Sharing', included: true },
  { text: 'Smart Triage & Reactions', included: true },
  { text: 'Interface Personalization', included: true },
  { text: 'RepoBot AI (BYOK)', included: true },
  { text: 'Unlimited Everything', included: false },
  { text: 'Continuous Cloud Sync', included: false },
  { text: 'Priority Support', included: false },
  { text: 'STA (Smart Task Assignments)', included: false },
  { text: 'RLC (Repo-Linked Channels)', included: false },
  { text: 'CTG (Conversation Threads)', included: false },
]

const proFeatures = [
  { text: 'Unlimited Friends', highlight: true },
  { text: 'Unlimited Groups', highlight: true },
  { text: 'Unlimited Pad entries', highlight: true },
  { text: 'Unlimited Custom Lists', highlight: true },
  { text: 'Unlimited Pinned Messages', highlight: true },
  { text: 'Unlimited Starred Messages', highlight: true },
  { text: 'Unlimited Archived Chats', highlight: true },
  { text: 'All Free features included', highlight: false },
  { text: 'RepoBot AI (BYOK)', highlight: false },
  { text: 'Continuous Cloud Data Sync', highlight: false },
  { text: 'Priority Access to Features', highlight: false },
  { text: 'Premium Developer Support', highlight: false },
  { text: 'STA (Smart Task Assignments)', highlight: true },
  { text: 'RLC (Repo-Linked Channels)', highlight: true },
  { text: 'CTG (Conversation Threads)', highlight: true },
]

const comparisonRows = [
  { feature: 'Friends', free: '15', pro: 'Unlimited' },
  { feature: 'Groups', free: '5', pro: 'Unlimited' },
  { feature: 'Pad Entries', free: '10', pro: 'Unlimited' },
  { feature: 'Custom Lists', free: '3', pro: 'Unlimited' },
  { feature: 'Pinned Messages', free: '5', pro: 'Unlimited' },
  { feature: 'Starred Messages', free: '50', pro: 'Unlimited' },
  { feature: 'Pinned Chats', free: '3', pro: '15' },
  { feature: 'Archived Chats', free: '5', pro: 'Unlimited' },
  { feature: 'GitHub Context Sharing', free: true, pro: true },
  { feature: 'Smart Triage', free: true, pro: true },
  { feature: 'Message Reactions', free: true, pro: true },
  { feature: 'Online Presence', free: true, pro: true },
  { feature: 'Dev DNA & Power Stats', free: true, pro: true },
  { feature: 'Quick Share & Templates', free: true, pro: true },
  { feature: 'Chat Export', free: true, pro: true },
  { feature: 'Theming & Personalization', free: true, pro: true },
  { feature: 'Keyboard Shortcuts', free: true, pro: true },
  { feature: 'RepoBot AI (BYOK)', free: true, pro: true },
  { feature: 'Cloud Data Sync', free: false, pro: true },
  { feature: 'Priority Feature Access', free: false, pro: true },
  { feature: 'Premium Developer Support', free: false, pro: true },
  { feature: 'STA (Smart Task Assignments)', free: false, pro: true },
  { feature: 'RLC (Repo-Linked Channels)', free: false, pro: true },
  { feature: 'CTG (Conversation Threads)', free: false, pro: true },
]

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value
      ? <span className="pricing-cell-icon yes"><Check size={15} strokeWidth={3} /></span>
      : <span className="pricing-cell-icon no"><X size={15} strokeWidth={2.5} /></span>
  }
  return <span className="pricing-cell-text">{value}</span>
}

export default function Pricing() {
  const { user, profile, loading, refreshProfile } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const isPro = !!profile?.is_pro

  // After OAuth redirect: if user just signed in and is NOT pro, auto-open checkout
  const openCheckout = useCallback((userId: string) => {
    setCheckoutLoading(true)
    const checkoutUrl = `https://test.checkout.dodopayments.com/buy/${DODO_PRODUCT_ID}?quantity=1&metadata_user_id=${userId}`
    window.open(checkoutUrl, '_blank')

    // Poll for Pro status (same pattern as UpgradeModal.tsx in extension)
    let pollCount = 0
    const maxPolls = 36 // 3 min at 5s intervals
    const pollInterval = setInterval(async () => {
      pollCount++
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', userId)
          .single()

        if (!error && data?.is_pro) {
          clearInterval(pollInterval)
          setCheckoutLoading(false)
          // Refresh the profile in context to update UI without full reload
          await refreshProfile()
          return
        }
      } catch { /* ignore */ }

      if (pollCount >= maxPolls) {
        clearInterval(pollInterval)
        setCheckoutLoading(false)
      }
    }, 5000)

    // Stop loading state after a moment for UX
    setTimeout(() => setCheckoutLoading(false), 3000)
  }, [refreshProfile])

  // Detect post-OAuth redirect: user just signed in, should we auto-open checkout?
  useEffect(() => {
    if (loading) return
    if (!user) return

    // Check if this is an OAuth redirect (URL has hash with access_token or we just signed in)
    const hash = window.location.hash
    const isOAuthRedirect = hash && hash.includes('access_token')

    if (isOAuthRedirect) {
      // Clean the URL
      if (window.history?.replaceState) {
        window.history.replaceState(null, '', window.location.pathname)
      }
    }

    // If user just signed in (from our modal flow) and not Pro, auto-open checkout
    const pendingCheckout = sessionStorage.getItem('repochat_pending_checkout')
    if (pendingCheckout === 'true' && !isPro) {
      sessionStorage.removeItem('repochat_pending_checkout')
      // Small delay to let the page render
      setTimeout(() => openCheckout(user.id), 800)
    }
  }, [user, loading, isPro, openCheckout])

  const handleUpgradeClick = () => {
    if (isPro) return // Already Pro, do nothing

    if (!user) {
      // Not signed in → set flag and open auth modal
      sessionStorage.setItem('repochat_pending_checkout', 'true')
      setAuthModalOpen(true)
    } else {
      // Signed in but not Pro → go straight to checkout
      openCheckout(user.id)
    }
  }

  return (
    <div className="legal-page" style={{ paddingTop: 'calc(var(--nav-h) + clamp(64px, 10vh, 100px))' }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-head" style={{ marginBottom: 'var(--space-m)' }}>
            <h1 className="h2">Simple, Transparent<br /><span className="gradient-text">Pricing.</span></h1>
            <p>Start free. Upgrade when you need more. Cancel anytime.</p>
          </div>
        </ScrollReveal>

        {/* ===== PLAN CARDS ===== */}
        <div className="pricing-cards-row">
          <ScrollReveal delay={1}>
            <div className="plan-card">
              <div className="plan-card-head">
                <div>
                  <h3 className="plan-name">Free</h3>
                  <p className="plan-tagline">For getting started</p>
                </div>
                <div className="plan-price-block">
                  <span className="plan-price">$0</span>
                  <span className="plan-period">/month</span>
                </div>
              </div>
              <ul className="plan-features">
                {freeFeatures.map((f, i) => (
                  <li key={i} className={f.included ? '' : 'excluded'}>
                    {f.included
                      ? <span className="plan-check"><Check size={14} strokeWidth={3} /></span>
                      : <span className="plan-x"><X size={14} strokeWidth={2.5} /></span>
                    }
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <a href="https://chromewebstore.google.com" target="_blank" rel="noopener noreferrer" className="plan-btn free">
                <Globe size={15} /> Get Started Free
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="plan-card pro" style={{
              '--card-glow': 'rgba(139, 92, 246, 0.4)',
              '--card-glow-bg': 'rgba(139, 92, 246, 0.1)',
            } as React.CSSProperties}>
              <div className="plan-badge">Recommended</div>
              <div className="plan-card-head">
                <div>
                  <h3 className="plan-name">Pro <Sparkles size={16} className="pro-sparkle" /></h3>
                  <p className="plan-tagline">For power users</p>
                </div>
                <div className="plan-price-block">
                  <span className="plan-price gradient-text">$4.99</span>
                  <span className="plan-period">/month</span>
                </div>
              </div>
              <ul className="plan-features">
                {proFeatures.map((f, i) => (
                  <li key={i}>
                    <span className="plan-check pro"><Check size={14} strokeWidth={3} /></span>
                    <span>{f.highlight ? <strong>{f.text}</strong> : f.text}</span>
                  </li>
                ))}
              </ul>

              {isPro ? (
                <div className="plan-btn pro-active">
                  <CheckCircle2 size={16} />
                  RepoChat Pro Active
                </div>
              ) : (
                <button
                  className={`plan-btn pro ${checkoutLoading ? 'loading' : ''}`}
                  onClick={handleUpgradeClick}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? 'Opening checkout…' : (
                    <>Upgrade to Pro <ArrowRight size={15} /></>
                  )}
                </button>
              )}

              <p className="plan-footer-note">
                {isPro ? (
                  <><CheckCircle2 size={12} /> Your Pro subscription is active.</>
                ) : (
                  <><Shield size={12} /> Secure checkout via Dodo Payments. Cancel anytime.</>
                )}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* ===== REPOBOT BYOK CALLOUT ===== */}
        <ScrollReveal>
          <div className="repobot-byok-banner">
            <div className="repobot-byok-icon">
              <Bot size={28} />
            </div>
            <div className="repobot-byok-content">
              <h3 className="repobot-byok-title">
                RepoBot AI — <span className="gradient-text">Free for Everyone</span>
              </h3>
              <p className="repobot-byok-desc">
                RepoBot is our built-in AI repo explainer that works with <strong>your own API keys</strong> (BYOK). Get instant repo summaries, architecture deep dives, and code explanations — no subscription required.
              </p>
              <div className="repobot-byok-providers">
                <div className="repobot-byok-provider">
                  <KeyRound size={12} />
                  <span>Groq</span>
                </div>
                <div className="repobot-byok-provider">
                  <KeyRound size={12} />
                  <span>OpenAI</span>
                </div>
                <div className="repobot-byok-provider">
                  <KeyRound size={12} />
                  <span>Claude</span>
                </div>
                <div className="repobot-byok-provider">
                  <KeyRound size={12} />
                  <span>Gemini</span>
                </div>
              </div>
              <p className="repobot-byok-note">
                <Shield size={12} /> Keys are stored locally on your device. We never see or store them.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ===== COMPARISON TABLE ===== */}
        <div>
          <ScrollReveal>
            <div className="section-head" style={{ marginTop: 'var(--space-xl)', marginBottom: 48, paddingTop: 'var(--space-m)' }}>
              <h2 className="h2 ecosystem-h2">Full <span className="gradient-text">Comparison.</span></h2>
              <p className="body-md" style={{ opacity: 0.6, marginTop: 8 }}>See exactly what you get on each plan.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="feature-col">Feature</th>
                    <th className="free-col">Free</th>
                    <th className="pro-col">
                      <span className="pro-col-label">Pro <Sparkles size={12} /></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i}>
                      <td className="feature-col">{row.feature}</td>
                      <td className="free-col"><CellValue value={row.free} /></td>
                      <td className="pro-col"><CellValue value={row.pro} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>

        {/* ===== FAQ ===== */}
        <div style={{ paddingBottom: 'var(--space-l)' }}>
          <ScrollReveal>
            <div className="section-head" style={{ marginTop: 'var(--space-l)', marginBottom: 'var(--space-m)', paddingTop: 'var(--space-l)' }}>
              <h2 className="h3">Frequently Asked Questions</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}><FAQ /></ScrollReveal>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  )
}
