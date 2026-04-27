import { Shield, Lock, Eye, Database, Key, Bug, Server, Fingerprint, Layers, GitBranch, Webhook, CreditCard } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { useState } from 'react'

/* ─── Security Architecture Layers ─── */
const architectureLayers = [
  {
    icon: <Database size={22} />,
    title: 'PostgreSQL Row Level Security',
    desc: 'Every table — profiles, messages, friend_requests, groups, group_members, notifications, chat_clears, and user_notes — has RLS enabled with granular policies. Users can only SELECT, INSERT, UPDATE, or DELETE their own data. Even with a leaked database URL, cross-user access is impossible.',
    details: [
      'Unique SECURITY DEFINER helper functions (is_group_member, is_group_admin, is_accepted_group_member) prevent RLS policy recursion',
      'Partial unique indexes (e.g. unique_pending_friend_request) enforce data integrity at the database level',
      'Group message policies require accepted membership status — pending/rejected users cannot read messages',
      'DM policies enforce auth.uid() = sender_id OR auth.uid() = receiver_id on every query',
    ],
    color: '#10b981',
  },
  {
    icon: <Key size={22} />,
    title: 'GitHub OAuth 2.0 Authentication',
    desc: 'We never see, store, or process your GitHub password. Authentication is handled entirely through Supabase Auth + GitHub OAuth 2.0 flow. Your credentials stay with GitHub at all times.',
    details: [
      'OAuth tokens are handled via Supabase\'s auth.setSession() — never stored in plaintext',
      'Provider tokens (for GitHub API calls) are stored locally in browser localStorage only',
      'Token cleanup: URL hash tokens are removed immediately after session setup via history.replaceState()',
      'No server-side credential storage — auth state lives in Supabase JWT tokens',
    ],
    color: '#8b5cf6',
  },
  {
    icon: <Lock size={22} />,
    title: 'Encryption in Transit & at Rest',
    desc: 'All data transmitted between your browser and Supabase is encrypted using TLS 1.2+. All data stored in the PostgreSQL database is encrypted at rest via Supabase\'s infrastructure-level AES-256 encryption.',
    details: [
      'All Supabase API calls use HTTPS with TLS 1.2+',
      'GitHub API calls use Bearer token auth over HTTPS',
      'Supabase Realtime channels (WebSocket) are encrypted end-to-end',
      'Storage buckets (avatars, chat_images) use encrypted object storage',
    ],
    color: '#6366f1',
  },
  {
    icon: <Eye size={22} />,
    title: 'Complete Data Isolation',
    desc: 'Your messages, notes, friend lists, groups, and settings are completely isolated from other users. RLS policies ensure database queries can never return another user\'s data, even in the event of an application-level bug.',
    details: [
      'Group visibility requires is_group_member() check — non-members cannot see group data',
      'Secure RPC function get_secure_group_members() uses SECURITY DEFINER with explicit auth.uid() validation',
      'Friend request queries scoped to sender_id/receiver_id matching auth.uid()',
      'Notification policies: auth.uid() = user_id on all SELECT, INSERT, DELETE operations',
    ],
    color: '#f59e0b',
  },
]

/* ─── Extension Security ─── */
const extensionSecurity = {
  title: 'Minimal Chrome Extension Permissions',
  permissions: [
    { name: 'storage', desc: 'Saves your preferences (theme, accent color, layout) locally in Chrome — never sent to external servers', icon: <Server size={16} /> },
    { name: 'activeTab', desc: 'Reads the current GitHub URL context (PR number, issue, branch) to attach contextual metadata to messages', icon: <GitBranch size={16} /> },
    { name: 'scripting', desc: 'Injects the RepoChat chat UI sidebar into GitHub pages — required for the extension to function', icon: <Layers size={16} /> },
  ],
  hostPermissions: 'https://github.com/* — The extension only runs on GitHub pages. It does not request access to your browsing history, bookmarks, downloads, or any other website.',
}

/* ─── Server-Side Security ─── */
const serverSecurity = [
  {
    icon: <Webhook size={22} />,
    title: 'Webhook Signature Verification',
    desc: 'Payment webhooks from Dodo Payments are verified using standardwebhooks cryptographic signature validation. Invalid signatures are rejected with a 401 response — preventing spoofed payment events.',
  },
  {
    icon: <Fingerprint size={22} />,
    title: 'JWT Authentication on Edge Functions',
    desc: 'Supabase Edge Functions (create-checkout, dodo-webhook) authenticate users via JWT tokens. The checkout flow validates auth.getUser() before creating payment sessions, ensuring only authenticated users can initiate purchases.',
  },
  {
    icon: <Server size={22} />,
    title: 'SECURITY DEFINER Functions',
    desc: 'Database triggers (handle_new_friend_request, handle_friend_request_update, handle_new_group_invitation) use SECURITY DEFINER to run with elevated privileges while maintaining strict input validation — ensuring automated actions cannot be exploited.',
  },
  {
    icon: <CreditCard size={22} />,
    title: 'Zero Payment Data Storage',
    desc: 'All payment processing is handled by Dodo Payments. We never see, store, or process credit card numbers, CVVs, or billing details. The service role key used for webhook processing is stored as an environment variable, never in client-side code.',
  },
]

/* ─── RLS Policy Stats ─── */
const rlsStats = [
  { label: 'Tables Protected', value: '8+', sub: 'profiles, messages, groups, group_members, friend_requests, notifications, chat_clears, user_notes' },
  { label: 'RLS Policies Active', value: '20+', sub: 'SELECT, INSERT, UPDATE, DELETE per table' },
  { label: 'SECURITY DEFINER', value: '6+', sub: 'Helper functions to prevent recursion & enforce auth' },
  { label: 'DB Triggers', value: '3', sub: 'Auto-notifications, friend sync, group invites' },
]

export default function Security() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null)

  return (
    <div className="legal-page">
      <div className="container">

        {/* ─── Hero Header ─── */}
        <ScrollReveal>
          <div className="section-head" style={{ marginBottom: 'var(--space-m)' }}>
            <div className="badge mb-6"><Shield size={14} /> Security</div>
            <h1 className="h2">Security at<br /><span className="gradient-text">Every Layer</span></h1>
            <p>RepoChat is built with security as a foundational requirement — not an afterthought. Every layer of our stack enforces strict data isolation and authentication.</p>
          </div>
        </ScrollReveal>

        {/* ─── RLS Stats Bar ─── */}
        <ScrollReveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            maxWidth: 900,
            margin: '0 auto var(--space-l)',
          }}>
            {rlsStats.map((s, i) => {
              const hues = ['#10b981', '#8b5cf6', '#3b82f6', '#f59e0b']
              const color = hues[i]
              return (
              <div key={i} className="security-grid-card" style={{
                borderRadius: 16,
                padding: '24px 20px',
                textAlign: 'center',
                '--card-glow': `${color}40`,
                '--card-glow-bg': `${color}10`,
              } as React.CSSProperties}>
                <div style={{ 
                  fontSize: '2rem', fontWeight: 800, 
                  background: `linear-gradient(135deg, #fff 0%, ${color} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.04em', lineHeight: 1 
                }}>{s.value}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 6 }}>{s.label}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{s.sub}</div>
              </div>
              )
            })}
          </div>
        </ScrollReveal>

        {/* ─── Architecture Layers ─── */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-m)', paddingTop: 'var(--space-m)' }}>
            <h2 className="h3">Security Architecture</h2>
            <p className="body-md" style={{ marginTop: 8 }}>Four layers of defense protecting your data</p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 860, margin: '0 auto var(--space-l)' }}>
          {architectureLayers.map((layer, i) => {
            const isExpanded = expandedLayer === i
            return (
              <ScrollReveal key={i} delay={(i % 3) + 1}>
                <div
                  className={`security-grid-card ${isExpanded ? 'expanded' : ''}`}
                  style={{
                    borderRadius: 20,
                    padding: '28px 32px',
                    cursor: 'pointer',
                    '--card-glow': `${layer.color}50`,
                    '--card-glow-bg': `${layer.color}15`,
                  } as React.CSSProperties}
                  onClick={() => setExpandedLayer(isExpanded ? null : i)}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${layer.color}15`,
                      border: `1px solid ${layer.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: layer.color, flexShrink: 0,
                      transition: 'all 0.4s ease',
                      boxShadow: isExpanded ? `0 0 20px ${layer.color}20` : 'none',
                    }}>
                      {layer.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{layer.title}</h3>
                        <div style={{
                          width: 28, height: 28, borderRadius: 8,
                          background: 'rgba(255,255,255,0.04)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600,
                          transition: 'transform 0.3s ease',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                          flexShrink: 0,
                        }}>
                          ▾
                        </div>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 6 }}>{layer.desc}</p>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <div style={{
                    maxHeight: isExpanded ? 300 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.5s cubic-bezier(.22,1,.36,1), padding 0.5s ease',
                    paddingTop: isExpanded ? 20 : 0,
                    marginTop: isExpanded ? 16 : 0,
                    borderTop: isExpanded ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 64 }}>
                      {layer.details.map((detail, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <span style={{ color: layer.color, fontSize: '0.7rem', marginTop: 5, flexShrink: 0 }}>●</span>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* ─── Chrome Extension Permissions ─── */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-m)', paddingTop: 'var(--space-m)' }}>
            <h2 className="h3">Chrome Extension Permissions</h2>
            <p className="body-md" style={{ marginTop: 8 }}>Only the absolute minimum permissions required</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="security-grid-card" style={{
            maxWidth: 860, margin: '0 auto var(--space-l)',
            borderRadius: 20,
            padding: '32px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {extensionSecurity.permissions.map((perm, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', flexShrink: 0,
                  }}>
                    {perm.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{perm.name}</span>
                      <span style={{
                        fontSize: '0.6rem', fontWeight: 700,
                        padding: '2px 8px', borderRadius: 999,
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.18)',
                        textTransform: 'uppercase', letterSpacing: '0.03em',
                      }}>Required</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 4 }}>{perm.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Host Permissions Note */}
            <div style={{
              marginTop: 24, paddingTop: 20,
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <Shield size={14} style={{ color: 'var(--accent)', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)' }}>Host Permissions: </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{extensionSecurity.hostPermissions}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Server-Side Security ─── */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-m)', paddingTop: 'var(--space-m)' }}>
            <h2 className="h3">Server-Side Protections</h2>
            <p className="body-md" style={{ marginTop: 8 }}>Backend security measures across Supabase Edge Functions and database triggers</p>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
          maxWidth: 860,
          margin: '0 auto var(--space-l)',
        }}>
          {serverSecurity.map((item, i) => {
            const hues = ['#8b5cf6', '#a855f7', '#3b82f6', '#f59e0b']
            const color = hues[i]
            return (
            <ScrollReveal key={i} delay={(i % 3) + 1}>
              <div className="security-grid-card" style={{
                borderRadius: 18,
                padding: '28px 24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                '--card-glow': `${color}40`,
                '--card-glow-bg': `${color}10`,
              } as React.CSSProperties}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${color}15`,
                  border: `1px solid ${color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: color,
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </ScrollReveal>
            )
          })}
        </div>

        {/* ─── Responsible Disclosure ─── */}
        <ScrollReveal>
          <div className="security-grid-card" style={{
            maxWidth: 860, margin: '0 auto var(--space-l)',
            borderRadius: 20,
            padding: '32px',
            display: 'flex',
            gap: 20,
            alignItems: 'flex-start',
            '--card-glow': '#f59e0b50',
            '--card-glow-bg': '#f59e0b15',
          } as React.CSSProperties}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#f59e0b', flexShrink: 0,
            }}>
              <Bug size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Responsible Disclosure</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 }}>
                If you discover a security vulnerability in RepoChat, please report it to us privately. We take all security reports seriously and will respond within 48 hours. We appreciate responsible disclosure and will credit reporters if desired.
              </p>
              <a href="mailto:alexcj10@yahoo.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 20px', borderRadius: 999,
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: '#f59e0b', fontWeight: 600, fontSize: '0.82rem',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
              }}>
                alexcj10@yahoo.com
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Trust Summary ─── */}
        <ScrollReveal>
          <div style={{
            textAlign: 'center', maxWidth: 640, margin: '0 auto',
            paddingTop: 'var(--space-m)', paddingBottom: 'var(--space-l)',
          }}>
            <h2 className="h3">Our Security Promise</h2>
            <p className="body-md" style={{ lineHeight: 1.8, marginTop: 16 }}>
              We believe that developer tools should be trustworthy by default. RepoChat is designed so that even if our application code had a vulnerability, the database-level security (Row Level Security) would still prevent unauthorized access to your data. Every RLS policy, every SECURITY DEFINER function, and every trigger is written with the assumption that the client cannot be trusted.
            </p>
            <p className="body-sm" style={{ marginTop: 20 }}>
              Questions about our security practices? Contact us at{' '}
              <a href="mailto:alexcj10@yahoo.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>alexcj10@yahoo.com</a>
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
