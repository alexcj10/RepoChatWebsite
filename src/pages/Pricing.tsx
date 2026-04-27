import { Zap, Globe, Check, X, Sparkles, Shield, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import FAQ from '../components/FAQ'

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
  { text: 'Unlimited Everything', included: false },
  { text: 'Continuous Cloud Sync', included: false },
  { text: 'Priority Support', included: false },
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
  { text: 'Continuous Cloud Data Sync', highlight: false },
  { text: 'Priority Access to Features', highlight: false },
  { text: 'Premium Developer Support', highlight: false },
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
  { feature: 'Cloud Data Sync', free: false, pro: true },
  { feature: 'Priority Feature Access', free: false, pro: true },
  { feature: 'Premium Developer Support', free: false, pro: true },
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
  return (
    <div className="legal-page">
      <div className="container">
        <ScrollReveal>
          <div className="section-head" style={{ marginBottom: 'var(--space-m)' }}>
            <div className="badge mb-6"><Zap size={12} /> Pricing</div>
            <h1 className="h2">Simple, Transparent<br /><span className="gradient-text">Pricing</span></h1>
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
            <div className="plan-card pro">
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
              <a href="https://chromewebstore.google.com" target="_blank" rel="noopener noreferrer" className="plan-btn pro">
                Upgrade to Pro <ArrowRight size={15} />
              </a>
              <p className="plan-footer-note">
                <Shield size={12} /> Secure checkout via Dodo Payments. Cancel anytime.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* ===== COMPARISON TABLE ===== */}
        <div>
          <ScrollReveal>
            <div className="section-head" style={{ marginTop: 'var(--space-l)', marginBottom: 'var(--space-m)', paddingTop: 'var(--space-m)' }}>
              <h2 className="h3">Full Comparison</h2>
              <p>See exactly what you get on each plan.</p>
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
            <div className="section-head" style={{ marginTop: 'var(--space-l)', marginBottom: 'var(--space-m)', paddingTop: 'var(--space-m)' }}>
              <h2 className="h3">Frequently Asked Questions</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}><FAQ /></ScrollReveal>
        </div>
      </div>
    </div>
  )
}
