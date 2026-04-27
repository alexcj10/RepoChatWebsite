import { Shield, Eye, Database, Key, CreditCard, Trash2, UserCheck, Cookie, Baby, RefreshCw, Mail } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

/* ─── Privacy Highlights ─── */
const highlights = [
  { icon: <Key size={20} />, label: 'No Passwords', sub: 'GitHub OAuth only', color: '#8b5cf6' },
  { icon: <Database size={20} />, label: 'RLS Protected', sub: 'Per-user data isolation', color: '#10b981' },
  { icon: <Eye size={20} />, label: 'No Tracking', sub: 'Zero analytics cookies', color: '#3b82f6' },
  { icon: <CreditCard size={20} />, label: 'No Card Storage', sub: 'Dodo Payments handles billing', color: '#f59e0b' },
]

/* ─── Privacy Sections ─── */
const sections = [
  {
    icon: <Database size={22} />,
    title: '1. Information We Collect',
    color: '#10b981',
    subsections: [
      {
        subtitle: '1.1 Information from GitHub OAuth',
        desc: 'When you sign in with GitHub, we receive:',
        items: [
          'Your GitHub username and display name',
          'Your GitHub avatar URL',
          'Your GitHub user ID',
          'An OAuth access token (used to interact with GitHub on your behalf)',
        ],
        note: 'We never receive or store your GitHub password.',
      },
      {
        subtitle: '1.2 Messages & Content',
        desc: 'We store the messages you send through RepoChat, including:',
        items: [
          'Direct messages to other users',
          'Group chat messages',
          'Notes and tasks created in the Pad feature',
          'GitHub context attached to messages (PR/Issue URLs, metadata)',
          'Message reactions and stars',
        ],
      },
      {
        subtitle: '1.3 Usage Data',
        desc: 'We collect minimal usage data including:',
        items: [
          'Online/offline presence status and last seen timestamps',
          'Chat preferences (theme, accent color, layout)',
          'Feature usage patterns (aggregate, non-identifying)',
        ],
      },
    ],
  },
  {
    icon: <Eye size={22} />,
    title: '2. How We Use Your Information',
    color: '#8b5cf6',
    subsections: [
      {
        desc: 'We use the information we collect to:',
        items: [
          'Provide, maintain, and improve the RepoChat service',
          'Deliver messages and notifications to intended recipients',
          'Display your profile to other users (username, avatar)',
          'Manage your subscription and billing (Pro users)',
          'Detect and prevent abuse or violations of our Terms of Service',
        ],
      },
    ],
  },
  {
    icon: <Shield size={22} />,
    title: '3. How We Store Your Data',
    color: '#3b82f6',
    subsections: [
      {
        desc: 'All data is stored securely in Supabase, a PostgreSQL-based cloud database with enterprise-grade security. Key protections include:',
        items: [
          'Row Level Security (RLS) — Every table has RLS policies ensuring users can only access their own data',
          'Encrypted at rest — All database storage is encrypted',
          'Encrypted in transit — All connections use TLS/SSL',
          'Isolated access — No user can read or modify another user\'s messages, notes, or settings',
        ],
      },
    ],
  },
  {
    icon: <CreditCard size={22} />,
    title: '4. Third-Party Services',
    color: '#f59e0b',
    subsections: [
      {
        desc: 'We use the following third-party services:',
        items: [
          'Supabase — Database, authentication, and file storage',
          'Dodo Payments — Payment processing for Pro subscriptions',
          'GitHub OAuth — Authentication',
        ],
        note: 'We do not sell, trade, or share your personal data with any other third parties.',
      },
    ],
  },
  {
    icon: <Trash2 size={22} />,
    title: '5. Data Retention',
    color: '#ef4444',
    subsections: [
      {
        desc: 'We retain your data for as long as your account is active. When you delete your account:',
        items: [
          'Your profile data is permanently deleted',
          'Your messages remain in group chats for continuity but are anonymized',
          'Your notes and custom lists are permanently deleted',
          'Your presence data is removed immediately',
        ],
      },
    ],
  },
  {
    icon: <UserCheck size={22} />,
    title: '6. Your Rights',
    color: '#06b6d4',
    subsections: [
      {
        desc: 'You have the right to:',
        items: [
          'Access your personal data at any time through the extension',
          'Delete your account and associated data by contacting us',
          'Export your data upon request',
          'Withdraw consent for data processing at any time',
        ],
      },
    ],
  },
  {
    icon: <Cookie size={22} />,
    title: '7. Cookies & Local Storage',
    color: '#a855f7',
    subsections: [
      {
        desc: 'RepoChat uses browser localStorage to store:',
        items: [
          'Authentication session tokens',
          'Theme and layout preferences',
          'Cached data for offline functionality (Free tier)',
        ],
        note: 'We do not use tracking cookies or analytics cookies.',
      },
    ],
  },
  {
    icon: <Baby size={22} />,
    title: '8. Children\'s Privacy',
    color: '#ec4899',
    subsections: [
      {
        desc: 'RepoChat is not intended for use by anyone under the age of 13. We do not knowingly collect personal information from children under 13.',
        items: [],
      },
    ],
  },
  {
    icon: <RefreshCw size={22} />,
    title: '9. Changes to This Policy',
    color: '#14b8a6',
    subsections: [
      {
        desc: 'We may update this Privacy Policy from time to time. We will notify users of material changes by posting the updated policy on this page with a revised "Last updated" date.',
        items: [],
      },
    ],
  },
  {
    icon: <Mail size={22} />,
    title: '10. Contact Us',
    color: '#6366f1',
    subsections: [
      {
        desc: 'If you have questions about this Privacy Policy, please contact us at:',
        items: [
          'Email: alexcj10@yahoo.com',
        ],
      },
    ],
  },
]

export default function Privacy() {
  return (
    <div className="legal-page">
      <div className="container">

        {/* ─── Hero Header ─── */}
        <ScrollReveal>
          <div className="section-head" style={{ marginBottom: 'var(--space-m)' }}>
            <div className="badge mb-6"><Shield size={14} /> Privacy</div>
            <h1 className="h2">Your Privacy<br /><span className="gradient-text">Comes First</span></h1>
            <p>We believe in transparency. Here's exactly how RepoChat handles your data — no legalese, no surprises.</p>
            <p className="body-sm" style={{ marginTop: 8, color: 'var(--text-muted)' }}>Last updated: April 24, 2026</p>
          </div>
        </ScrollReveal>

        {/* ─── Highlights Bar ─── */}
        <ScrollReveal>
          <div className="rls-stats-grid" style={{
            maxWidth: 900,
            margin: '0 auto var(--space-l)',
          }}>
            {highlights.map((h, i) => (
              <div key={i} className="security-grid-card" style={{
                borderRadius: 16,
                padding: '24px 20px',
                textAlign: 'center',
                '--card-glow': `${h.color}40`,
                '--card-glow-bg': `${h.color}20`,
                background: `
                  radial-gradient(circle at top left, ${h.color}20 0%, transparent 70%),
                  linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                  rgba(15, 15, 20, 0.5)
                `,
                backgroundSize: '100% 100%, 24px 24px, 24px 24px',
              } as React.CSSProperties}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${h.color}15`,
                  border: `1px solid ${h.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: h.color, margin: '0 auto 12px',
                }}>
                  {h.icon}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{h.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{h.sub}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── Sections ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 860, margin: '0 auto' }}>
          {sections.map((section, i) => (
            <ScrollReveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div
                className="security-grid-card"
                style={{
                  borderRadius: 20,
                  padding: '28px 32px',
                  '--card-glow': `${section.color}40`,
                  '--card-glow-bg': `${section.color}30`,
                } as React.CSSProperties}
              >
                {/* Section Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${section.color}15`,
                    border: `1px solid ${section.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: section.color, flexShrink: 0,
                  }}>
                    {section.icon}
                  </div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                    {section.title}
                  </h2>
                </div>

                {/* Subsections */}
                {section.subsections.map((sub, j) => (
                  <div key={j} style={{ marginBottom: j < section.subsections.length - 1 ? 24 : 0 }}>
                    {sub.subtitle && (
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, opacity: 0.9 }}>
                        {sub.subtitle}
                      </h3>
                    )}
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: sub.items.length > 0 ? 12 : 0 }}>
                      {sub.desc}
                    </p>
                    {sub.items.length > 0 && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {sub.items.map((item, k) => (
                          <li key={k} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            fontSize: '0.84rem', color: 'var(--text-secondary)',
                            lineHeight: 1.6, marginBottom: 6,
                            paddingLeft: 4,
                          }}>
                            <span style={{ color: section.color, flexShrink: 0, fontWeight: 700, fontSize: '0.75rem', marginTop: 3 }}>✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {sub.note && (
                      <p style={{
                        marginTop: 12, fontSize: '0.82rem', fontWeight: 600,
                        color: section.color, opacity: 0.85,
                      }}>
                        {sub.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  )
}
