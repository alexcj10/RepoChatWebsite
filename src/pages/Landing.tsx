import { useRef } from 'react'
import { ArrowRight, Shield, Zap } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import FAQ from '../components/FAQ'
import Logo from '../components/Logo'

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


          <ScrollReveal delay={1}>
            <h1 className="h1">
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
              <a href="https://discord.gg/repochat" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
                Join Discord <ArrowRight size={14} />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Hero mockup — fluid scaling */}
        <motion.div className="hero-mockup" style={{ scale: mockupScale, opacity: mockupOpacity, width: 'calc(100% - 48px)' }}>
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

            {/* 6: Context Sharing */}
            <div className="stack-card reverse">
              <div className="feature-text">
                <div className="badge">Context Sharing</div>
                <h3 className="h3 mt-4">Share PRs & Issues instantly</h3>
                <p className="body-md">Select any PR or Issue on GitHub, choose a friend or group, and share — with full context attached.</p>
              </div>
              <div className="feature-media">
                <img src="/RC_share_popup.png" alt="Context Sharing" />
              </div>
            </div>

            {/* 7: Comment on GitHub */}
            <div className="stack-card">
              <div className="feature-text">
                <div className="badge">Comment on GitHub</div>
                <h3 className="h3 mt-4">Post comments from chat</h3>
                <p className="body-md">Write comments and post them directly to GitHub Issues. No tab switching needed.</p>
              </div>
              <div className="feature-media">
                <img src="/RC_comment.png" alt="Comment on GitHub" />
              </div>
            </div>

            {/* 8: Shared via RepoChat */}
            <div className="stack-card reverse">
              <div className="feature-text">
                <div className="badge">Shared via RepoChat</div>
                <h3 className="h3 mt-4">Perfect context cards</h3>
                <p className="body-md">Recipients see a formatted context card with PR title, description, and your message — attributed with "Shared via RepoChat".</p>
              </div>
              <div className="feature-media">
                <img src="/RC_shared_via_RC.png" alt="Shared via RepoChat" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MINI FEATURE GRID ═══ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <h2 className="h2">And so much more.</h2>
            </div>
          </ScrollReveal>

          <div className="mini-features-grid">
            {[
              { 
                title: 'DM & Group Chat', 
                desc: 'Real-time messaging with friends and groups.', 
                bg: '/c2ef792a-71cf-420e-9dc6-39673be2a4ff.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M25 15 Q40 12 55 15 Q65 18 65 30 Q65 42 50 45 L40 55 L42 45 Q20 42 20 30 Q20 18 25 15" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <path d="M40 20 Q55 18 70 20 Q80 23 80 35 Q80 47 65 50 L55 58 L57 50 Q35 47 35 35" fill="none" stroke="white" strokeWidth="1.2" opacity="0.5" />
                  </svg>
                )
              },
              { 
                title: 'GitHub Context', 
                desc: 'Attach PRs, Issues, and branches to any message.', 
                bg: '/5b55f314-eba4-42a9-adae-c25514fe5d5f.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M20 10 Q22 30 20 50" fill="none" stroke="white" strokeWidth="2" opacity="0.8" />
                    <path d="M20 30 Q45 30 50 15" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
                    <path d="M20 40 Q55 40 60 25" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
                    <circle cx="20" cy="10" r="3" fill="none" stroke="white" strokeWidth="1" />
                    <circle cx="50" cy="15" r="3" fill="none" stroke="white" strokeWidth="1" />
                    <circle cx="60" cy="25" r="3" fill="none" stroke="white" strokeWidth="1" />
                  </svg>
                )
              },
              { 
                title: 'Reactions & Stars', 
                desc: 'React to messages, star them for quick access.', 
                bg: '/5d255d44-b559-4630-b0a7-e763dda69fb2.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M50 10 Q52 25 65 25 Q52 25 50 40 Q48 25 35 25 Q48 25 50 10" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <path d="M75 35 Q76 42 82 42 Q76 42 75 50 Q74 42 68 42 Q74 42 75 35" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
                    <path d="M25 35 Q26 40 30 40 Q26 40 25 45 Q24 40 20 40 Q24 40 25 35" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                  </svg>
                )
              },
              { 
                title: 'Custom Lists', 
                desc: 'Organize chats by project, team, or context.', 
                bg: '/b318345d-f5f6-4972-81be-c61b1cd538b1.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 15 Q50 12 70 15 L72 45 Q50 48 28 45 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
                    <path d="M35 25 H60 M35 32 H55 M35 39 H50" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                    <path d="M70 15 L75 10" stroke="white" strokeWidth="1" opacity="0.3" />
                  </svg>
                )
              },
              { 
                title: 'Online Presence', 
                desc: 'See who is online with last-seen timestamps.', 
                bg: '/josiah-rock-7EnvCCL8XGE-unsplash.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M50 30 Q55 20 65 20 M50 30 Q45 20 35 20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <path d="M50 30 Q65 10 80 15 M50 30 Q35 10 20 15" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                    <circle cx="50" cy="30" r="4" fill="white" opacity="0.9" />
                  </svg>
                )
              },
              { 
                title: 'Theming', 
                desc: '6 accent colors, default and compact view support.', 
                bg: '/cfe5d5ef-9b51-4931-a76f-9a817afff2dd.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 20 Q40 10 50 20 Q60 30 70 20 Q80 10 85 25 Q85 45 70 50 Q50 55 30 50 Q15 45 15 25 Q15 10 30 20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <circle cx="35" cy="30" r="3" fill="white" opacity="0.4" />
                    <circle cx="50" cy="40" r="4" fill="white" opacity="0.4" />
                    <circle cx="65" cy="30" r="3" fill="white" opacity="0.4" />
                  </svg>
                )
              },
              { 
                title: 'Keyboard Shortcuts', 
                desc: 'Navigate fast with professional keyboard workflows.', 
                bg: '/ee477f25-3b2a-45a2-8614-f79f0a8c3200.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M25 20 Q35 18 45 20 L45 40 Q35 42 25 40 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <path d="M55 20 Q70 18 85 20 L85 40 Q70 42 55 40 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <text x="30" y="33" fill="white" fontSize="10" fontWeight="bold" opacity="0.6">⌘</text>
                    <text x="65" y="33" fill="white" fontSize="10" fontWeight="bold" opacity="0.6">K</text>
                  </svg>
                )
              },
              { 
                title: 'Pin Users', 
                desc: 'Pin up to 3 users for instant access in the share popup.', 
                bg: '/f6fe7ed3-21ce-4297-9abb-9f41d6779c69.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M50 15 L50 45 M35 45 L65 45" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                    <path d="M35 25 Q50 20 65 25 L60 45 H40 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
                    <path d="M50 15 Q55 10 50 5" stroke="white" strokeWidth="1" opacity="0.4" />
                  </svg>
                )
              },
              { 
                title: 'Message Templates', 
                desc: 'Save time with up to 6 custom message templates.', 
                bg: '/a9cdf66f-befe-413a-bf99-83c54794d266.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 10 Q50 8 70 10 L72 50 Q50 52 28 50 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <path d="M35 20 H65 M35 30 H60 M35 40 H55" stroke="white" strokeWidth="1" opacity="0.4" />
                    <path d="M70 10 L78 5" stroke="white" strokeWidth="1" opacity="0.3" />
                  </svg>
                )
              },
              { 
                title: 'Notes & Tasks', 
                desc: 'Add notes in Pad, mark as complete, and share easily.', 
                bg: '/eve-dFIYU7xOl0w-unsplash.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 35 Q40 45 50 50 Q70 20 85 10" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                    <path d="M20 15 Q50 12 80 15 Q82 35 80 55 Q50 58 20 55 Q18 35 20 15" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
                  </svg>
                )
              },
              { 
                title: 'Smart Archive', 
                desc: 'Archive and pin chats to keep your workspace tidy.', 
                bg: '/513b98f7-9dc5-4844-86ca-379ae723b77f.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M25 20 L50 10 L75 20 L75 45 L50 55 L25 45 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <path d="M25 20 L50 30 L75 20 M50 30 V55" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
                    <path d="M40 16 L65 26" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  </svg>
                )
              },
              { 
                title: 'Quick Share', 
                desc: 'Share panel via dedicated module or keyboard shortcut.', 
                bg: '/cocoloris-co-mTdkTShJMfU-unsplash.jpg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M20 30 Q50 10 85 30 L45 40 L20 30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <path d="M45 40 L50 55 L55 40" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
                    <path d="M20 30 L55 40" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  </svg>
                )
              },
            ].map((f, i) => (
              <ScrollReveal key={i} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <div className="mini-feature-card" style={{ backgroundImage: `url(${f.bg})` }}>
                  <div>
                    <h4 className="h4">{f.title}</h4>
                    <p className="body-sm mt-2">{f.desc}</p>
                  </div>
                  <div className="mini-feature-visual">
                    {f.visual}
                  </div>
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
