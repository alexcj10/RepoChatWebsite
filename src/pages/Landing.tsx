import { useRef } from 'react'
import { ArrowRight, Shield, Zap, MessageSquare, GitPullRequest, Tag, ClipboardList, Share2 } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import FAQ from '../components/FAQ'
import Logo from '../components/Logo'

/* ─── Horizontal Scroll ─── */
function HorizontalShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-62.5%'])

  const items = [
    { label: 'Context Sharing', title: 'Share PRs & Issues instantly', desc: 'Select any PR or Issue on GitHub, choose a friend or group, and share — with full context attached.', img: '/RC_share_popup.png' },
    { label: 'Comment on GitHub', title: 'Post comments from chat', desc: 'Write comments and post them directly to GitHub Issues. No tab switching needed.', img: '/RC_comment.png' },
    { label: 'Shared via RepoChat', title: 'Perfect context cards', desc: 'Recipients see a formatted context card with PR title, description, and your message — attributed with "Shared via RepoChat".', img: '/RC_shared_via_RC.png' },
  ]

  return (
    <section ref={ref} className="hscroll-outer">
      <div className="hscroll-sticky">
        <motion.div className="hscroll-track" style={{ x }}>
          {items.map((item, i) => (
            <div key={i} className={`hscroll-card ${i % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="hscroll-card-head">
                <div className="badge mb-4">{item.label}</div>
                <h3 className="h3">{item.title}</h3>
                <p className="body-sm mt-2">{item.desc}</p>
              </div>
              <div className="hscroll-card-media">
                <img src={item.img} alt={item.title} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const mockupScale = useTransform(heroProgress, [0, 1], [1, .9])
  const mockupOpacity = useTransform(heroProgress, [0, .8, 1], [1, 1, 0])

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="hero" style={{ minHeight: '115vh' }}>
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="hero-inner">
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Logo size={72} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h1 className="h1 mt-6">
              Chat where the<br /><span className="gradient-text">code lives.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <p className="body-lg">
              Real-time messaging, code context sharing, and smart issue triage — built directly into GitHub.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <div className="hero-actions">
              <a href="#install" className="btn btn-primary btn-lg">
                Add to Chrome — Free
              </a>
              <a href="https://github.com/10lint/RepoChat" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
                Star on GitHub <ArrowRight size={14} />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Hero mockup — contained at max 900px */}
        <motion.div className="hero-mockup" style={{ scale: mockupScale, opacity: mockupOpacity, maxWidth: 900, margin: '64px auto 0', width: 'calc(100% - 48px)' }}>
          <img src="/RC_main_UI.png" alt="RepoChat — Main UI" />
        </motion.div>
      </section>

      {/* ═══ FEATURE ROWS ═══ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div className="badge mb-6"><Zap size={12} /> Core Features</div>
              <h2 className="h2">Everything you need,<br />built into GitHub.</h2>
              <p>No more context switching. Chat, triage, and take notes without leaving your repo.</p>
            </div>
          </ScrollReveal>

          {/* ═══ STACKING CARDS ═══ */}
          <div className="stack-cards">
            {/* 1: Dev DNA */}
            <div className="stack-card">
              <div className="feature-text">
                <div className="badge">Developer Profile</div>
                <h3 className="h3 mt-4">Dev DNA & Power Stats</h3>
                <p className="body-md">View any developer's tech stack, commit pulse, power stats radar chart, and earned badges — all in one beautiful profile card.</p>
              </div>
              <div className="feature-media">
                <img src="/RC_Dev_DNA.png" alt="Dev DNA Profile" />
              </div>
            </div>

            {/* 2: Triage */}
            <div className="stack-card reverse">
              <div className="feature-text">
                <div className="badge">Smart Triage</div>
                <h3 className="h3 mt-4">Triage issues from chat</h3>
                <p className="body-md">Apply labels, close issues, and claim assignments directly from the chat action sheet. Zero context loss.</p>
              </div>
              <div className="feature-media">
                <img src="/RC_triage.png" alt="Smart Triage" />
              </div>
            </div>

            {/* 3: Pad */}
            <div className="stack-card">
              <div className="feature-text">
                <div className="badge">Built-in Notepad</div>
                <h3 className="h3 mt-4">Pad — Notes & Tasks</h3>
                <p className="body-md">Quick notes, code snippets, and task tracking with completion progress. Pro users get cloud sync.</p>
              </div>
              <div className="feature-media">
                <img src="/RC_pad.png" alt="Pad" />
              </div>
            </div>

            {/* 4: View GitHub */}
            <div className="stack-card reverse">
              <div className="feature-text">
                <div className="badge">Deep Integration</div>
                <h3 className="h3 mt-4">Everything connected</h3>
                <p className="body-md">Jump directly from a chat context to the corresponding GitHub page with a single click. Seamless workflow.</p>
              </div>
              <div className="feature-media">
                <img src="/RC_github.png" alt="View on GitHub" />
              </div>
            </div>

            {/* 5: Group Chat */}
            <div className="stack-card">
              <div className="feature-text">
                <div className="badge">Collaboration</div>
                <h3 className="h3 mt-4">Powerful Group Chats</h3>
                <p className="body-md">Create project-specific groups, manage members, and keep your entire team aligned without leaving your repository.</p>
              </div>
              <div className="feature-media">
                <img src="/RC_group.png" alt="Group Chat" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HORIZONTAL SCROLL ═══ */}
      <HorizontalShowcase />

      {/* ═══ MINI FEATURE GRID ═══ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <h2 className="h2">And so much more.</h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: <MessageSquare size={18} />, title: 'DM & Group Chat', desc: 'Real-time messaging with friends and groups.' },
              { icon: <GitPullRequest size={18} />, title: 'GitHub Context', desc: 'Attach PRs, Issues, and branches to any message.' },
              { icon: <Tag size={18} />, title: 'Reactions & Stars', desc: 'React to messages, star them for quick access.' },
              { icon: <ClipboardList size={18} />, title: 'Custom Lists', desc: 'Organize chats by project, team, or context.' },
              { icon: <Share2 size={18} />, title: 'Online Presence', desc: 'See who is online with last-seen timestamps.' },
              { icon: <Zap size={18} />, title: 'Theming', desc: '20+ accent colors, dark/light mode, compact layout.' },
            ].map((f, i) => (
              <ScrollReveal key={i} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, transition: 'border-color .3s', cursor: 'default', height: '100%' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div className="card-icon">{f.icon}</div>
                  <h4 className="h4">{f.title}</h4>
                  <p className="body-sm mt-2">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div className="badge mb-6"><Zap size={12} /> Pricing</div>
              <h2 className="h2">Simple pricing.</h2>
              <p>Start free, upgrade when you need more.</p>
            </div>
          </ScrollReveal>

          <div className="pricing-grid">
            <ScrollReveal delay={1}>
              <div className="price-card">
                <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>Free</p>
                <p className="body-sm">Everything to get started.</p>
                <div className="mt-6 mb-8"><span className="price">$0</span> <span className="period">/mo</span></div>
                <ul className="price-features">
                  <li><span className="ck">✓</span> 15 Friends & 5 Groups</li>
                  <li><span className="ck">✓</span> GitHub Context Sharing</li>
                  <li><span className="ck">✓</span> Smart Triage Actions</li>
                  <li><span className="ck">✓</span> 10 Pad entries</li>
                  <li><span className="no">✗</span> <span className="dis">Unlimited limits</span></li>
                  <li><span className="no">✗</span> <span className="dis">Cloud Data Sync</span></li>
                </ul>
                <a href="#install" className="btn btn-ghost btn-lg mt-8" style={{ width: '100%' }}>Get Started</a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="price-card featured">
                <p style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--accent)' }}>Pro</p>
                <p className="body-sm">Unlimited power.</p>
                <div className="mt-6 mb-8"><span className="price gradient-text">$4.99</span> <span className="period">/mo</span></div>
                <ul className="price-features">
                  <li><span className="ck">✓</span> <strong>Unlimited</strong> Friends & Groups</li>
                  <li><span className="ck">✓</span> <strong>Unlimited</strong> Pad & Lists</li>
                  <li><span className="ck">✓</span> Continuous Cloud Sync</li>
                  <li><span className="ck">✓</span> Priority Feature Access</li>
                  <li><span className="ck">✓</span> Premium Support</li>
                </ul>
                <a href="#install" className="btn btn-accent btn-lg mt-8" style={{ width: '100%' }}>Upgrade to Pro</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ TRUST + FAQ ═══ */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            <ScrollReveal>
              <div className="badge mb-6"><Shield size={12} /> Security</div>
              <h2 className="h3 mb-4">Built on trust.</h2>
              <p className="body-md mb-8">Every table protected with PostgreSQL Row Level Security. Your data is completely isolated.</p>
              <ul className="price-features" style={{ marginTop: 0 }}>
                <li><span className="ck">✓</span> GitHub OAuth — no passwords stored</li>
                <li><span className="ck">✓</span> Complete per-user data isolation</li>
                <li><span className="ck">✓</span> Encrypted in transit & at rest</li>
              </ul>
              <a href="/security" className="btn btn-ghost mt-8">Security Details <ArrowRight size={14} /></a>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h2 className="h3 mb-6">FAQs</h2>
              <FAQ />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section" style={{ borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow hero-glow-1" style={{ top: '50%', opacity: .06 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal>
            <div className="text-center" style={{ maxWidth: 640, margin: '0 auto' }}>
              <Logo size={48} />
              <h2 className="h1 mt-6 mb-6">Chat where the<br /><span className="gradient-text">code lives.</span></h2>
              <p className="body-lg mb-8">Join developers who ship faster by collaborating right where they code.</p>
              <a href="#install" className="btn btn-primary btn-lg">Add to Chrome — Free</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
