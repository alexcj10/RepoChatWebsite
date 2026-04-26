import { useRef } from 'react'
import { ArrowRight, Shield, Zap } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import FAQ from '../components/FAQ'

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const mockupScale = useTransform(heroProgress, [0, 1], [1, .9])
  const mockupOpacity = useTransform(heroProgress, [0, .8, 1], [1, 1, 0])

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="hero">
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
              <h2 className="h2">Everything you need,<br />built into RepoChat.</h2>
              <p>No more context switching. Chat, triage, and take notes without leaving your repo.</p>
            </div>
          </ScrollReveal>

          {/* ═══ STACKING CARDS ═══ */}
          <div className="stack-cards">
            {/* 1: Dev DNA */}
            <ScrollReveal>
              <div className="stack-card">
                <div className="feature-text">
                  <div className="badge">Developer Profile</div>
                  <h3 className="h3 mt-4">Dev DNA & Power Stats</h3>
                  <p className="body-md">View any developer's tech stack, commit pulse, power stats radar chart, and earned badges — all in one beautiful profile card.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_Dev_DNA.png" alt="Dev DNA & Power Stats" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>

            {/* 2: Triage */}
            <ScrollReveal>
              <div className="stack-card reverse">
                <div className="feature-text">
                  <div className="badge">Smart Triage</div>
                  <h3 className="h3 mt-4">Smart GitHub Triage</h3>
                  <p className="body-md">Manage issues without leaving your chat. Add labels, assign developers, and close issues with a single click in the sidebar.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_triage.png" alt="Smart Triage" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>

            {/* 3: Pad */}
            <ScrollReveal>
              <div className="stack-card">
                <div className="feature-text">
                  <div className="badge">Pull Requests</div>
                  <h3 className="h3 mt-4">Attach PR Context</h3>
                  <p className="body-md">Instantly share PR details. Just click the Plus icon to attach the current PR or search for any PR/Issue in the repo.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_main_UI.png" alt="Pull Request Context" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>

            {/* 4: View GitHub */}
            <ScrollReveal>
              <div className="stack-card reverse">
                <div className="feature-text">
                  <div className="badge">Real-time Sync</div>
                  <h3 className="h3 mt-4">Multi-device data sync</h3>
                  <p className="body-md">Your chats, notes, and preferences sync instantly across all your devices. Pro users get unlimited cloud persistence.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_share_popup.png" alt="Real-time Sync" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>

            {/* 5: Group Chat */}
            <ScrollReveal>
              <div className="stack-card">
                <div className="feature-text">
                  <div className="badge">Built-in Notepad</div>
                  <h3 className="h3 mt-4">Pad — Notes & Tasks</h3>
                  <p className="body-md">Quick notes, code snippets, and task tracking with completion progress. Pro users get cloud sync.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_pad.png" alt="Notes & Tasks" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>

            {/* 6: Context Sharing */}
            <ScrollReveal>
              <div className="stack-card reverse">
                <div className="feature-text">
                  <div className="badge">Team Collaboration</div>
                  <h3 className="h3 mt-4">Group Chats & Teams</h3>
                  <p className="body-md">Create project-specific group chats. Add team members and collaborate in real-time right next to your codebase.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_group.png" alt="Group Chats" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>

            {/* 7: Comment on GitHub */}
            <ScrollReveal>
              <div className="stack-card">
                <div className="feature-text">
                  <div className="badge">Comment on GitHub</div>
                  <h3 className="h3 mt-4">Post comments from chat</h3>
                  <p className="body-md">Write comments and post them directly to GitHub Issues. No tab switching needed.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_comment.png" alt="Comment on GitHub" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>

            {/* 8: Shared via RepoChat */}
            <ScrollReveal>
              <div className="stack-card reverse">
                <div className="feature-text">
                  <div className="badge">Shared via RepoChat</div>
                  <h3 className="h3 mt-4">Perfect context cards</h3>
                  <p className="body-md">Recipients see a formatted context card with PR title, description, and your message — attributed with "Shared via RepoChat".</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_shared_via_RC.png" alt="Shared via RepoChat" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>
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
                hue: '0deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M25 15 Q40 12 55 15 Q65 18 65 30 Q65 42 50 45 L40 55 L42 45 Q20 42 20 30 Q20 18 25 15" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <path d="M28 20 L35 20 M28 25 L40 25 M28 30 L38 30" stroke="white" strokeWidth="0.5" opacity="0.3" />
                    <path d="M40 20 Q55 18 70 20 Q80 23 80 35 Q80 47 65 50 L55 58 L57 50 Q35 47 35 35" fill="none" stroke="#8B5CF6" strokeWidth="1.2" opacity="0.6" />
                    <circle cx="35" cy="30" r="1" fill="white" opacity="0.4" />
                    <circle cx="45" cy="30" r="1" fill="white" opacity="0.4" />
                    <circle cx="55" cy="30" r="1" fill="white" opacity="0.4" />
                    <path d="M15 10 L25 15 M85 50 L75 45" stroke="white" strokeWidth="0.5" opacity="0.2" />
                  </svg>
                )
              },
              { 
                title: 'GitHub Context', 
                desc: 'Attach PRs, Issues, and branches to any message.', 
                hue: '190deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M20 10 Q22 30 20 50" fill="none" stroke="#06B6D4" strokeWidth="2.5" opacity="0.9" />
                    <path d="M20 30 Q45 30 50 15" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
                    <path d="M50 15 L55 10 M50 15 L45 10" stroke="white" strokeWidth="1" opacity="0.4" />
                    <path d="M20 40 Q55 40 60 25" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
                    <circle cx="20" cy="10" r="3" fill="#06B6D4" opacity="0.8" />
                    <circle cx="50" cy="15" r="3" fill="white" opacity="0.8" />
                    <circle cx="60" cy="25" r="3" fill="white" opacity="0.8" />
                    <path d="M65 20 L75 15" stroke="white" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
                    <text x="70" y="12" fill="white" fontSize="4" opacity="0.4">HEAD</text>
                  </svg>
                )
              },
              { 
                title: 'Reactions & Stars', 
                desc: 'React to messages, star them for quick access.', 
                hue: '320deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M50 10 Q52 25 65 25 Q52 25 50 40 Q48 25 35 25 Q48 25 50 10" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.9" />
                    <path d="M48 15 L52 15 M48 20 L52 20 M48 30 L52 30" stroke="white" strokeWidth="0.5" opacity="0.3" />
                    <path d="M75 35 Q76 42 82 42 Q76 42 75 50 Q74 42 68 42 Q74 42 75 35" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" />
                    <path d="M25 35 Q26 40 30 40 Q26 40 25 45 Q24 40 20 40 Q24 40 25 35" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
                    <circle cx="10" cy="10" r="1" fill="white" opacity="0.2" />
                    <circle cx="90" cy="50" r="1" fill="white" opacity="0.2" />
                  </svg>
                )
              },
              { 
                title: 'Custom Lists', 
                desc: 'Organize chats by project, team, or context smartly.', 
                hue: '240deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 15 Q50 12 70 15 L72 45 Q50 48 28 45 Z" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.8" />
                    <path d="M32 18 L68 18" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <path d="M35 25 H60 M35 32 H55 M35 39 H50" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    <path d="M20 20 L25 25 M75 40 L80 45" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <rect x="62" y="24" width="4" height="4" rx="1" stroke="white" strokeWidth="0.5" fill="none" opacity="0.4" />
                  </svg>
                )
              },
              { 
                title: 'Online Presence', 
                desc: 'See who is online with last-seen timestamps.', 
                hue: '150deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M50 30 Q55 20 65 20 M50 30 Q45 20 35 20" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.8" />
                    <path d="M50 30 Q65 10 80 15 M50 30 Q35 10 20 15" fill="none" stroke="white" strokeWidth="1.2" opacity="0.4" />
                    <circle cx="50" cy="30" r="4" fill="#06B6D4" opacity="0.9" />
                    <path d="M48 24 L52 24 M50 22 L50 26" stroke="white" strokeWidth="0.5" opacity="0.4" />
                    <circle cx="50" cy="30" r="15" stroke="white" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />
                  </svg>
                )
              },
              { 
                title: 'Theming', 
                desc: '6 accent colors, default and compact view support.', 
                hue: '280deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 20 Q40 10 50 20 Q60 30 70 20 Q80 10 85 25 Q85 45 70 50 Q50 55 30 50 Q15 45 15 25 Q15 10 30 20" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.8" />
                    <path d="M25 25 L35 15 M65 45 L75 35" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <circle cx="35" cy="30" r="3" fill="#06B6D4" opacity="0.8" />
                    <circle cx="50" cy="40" r="4" fill="#8B5CF6" opacity="0.8" />
                    <circle cx="65" cy="30" r="3" fill="#06B6D4" opacity="0.8" />
                    <path d="M45 40 L55 40" stroke="white" strokeWidth="0.5" opacity="0.4" />
                  </svg>
                )
              },
              { 
                title: 'Keyboard Shortcuts', 
                desc: 'Navigate fast with professional keyboard workflows.', 
                hue: '45deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M25 20 Q35 18 45 20 L45 40 Q35 42 25 40 Z" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.9" />
                    <path d="M28 22 L42 22" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <path d="M55 20 Q70 18 85 20 L85 40 Q70 42 55 40 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <text x="29" y="34" fill="#06B6D4" fontSize="12" fontWeight="bold" opacity="0.9">⌘</text>
                    <text x="64" y="34" fill="white" fontSize="12" fontWeight="bold" opacity="0.9">K</text>
                    <path d="M20 50 H80" stroke="white" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
                  </svg>
                )
              },
              { 
                title: 'Pin Users', 
                desc: 'Pin up to 3 users for instant access in the share popup.', 
                hue: '210deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M50 15 L50 45 M35 45 L65 45" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                    <path d="M48 30 L52 30" stroke="white" strokeWidth="1" opacity="0.4" />
                    <path d="M35 25 Q50 20 65 25 L60 45 H40 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
                    <path d="M50 15 Q55 10 50 5" stroke="#06B6D4" strokeWidth="1.5" opacity="0.8" />
                    <path d="M30 10 L35 15 M70 10 L65 15" stroke="white" strokeWidth="0.5" opacity="0.2" />
                  </svg>
                )
              },
              { 
                title: 'Message Templates', 
                desc: 'Save time with up to 6 custom message templates.', 
                hue: '260deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 10 Q50 8 70 10 L72 50 Q50 52 28 50 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                    <path d="M32 15 L68 15" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <path d="M35 25 H65 M35 32 H65 M35 39 H65 M35 46 H50" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    <path d="M80 20 L85 25 M85 20 L80 25" stroke="white" strokeWidth="0.5" opacity="0.4" />
                  </svg>
                )
              },
              { 
                title: 'Notes & Tasks', 
                desc: 'Add notes in Pad, mark as complete, and share easily.', 
                hue: '340deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 35 Q40 45 50 50 Q70 20 85 10" fill="none" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
                    <path d="M30 35 L25 40" stroke="white" strokeWidth="1" opacity="0.4" />
                    <path d="M20 15 Q50 12 80 15 Q82 35 80 55 Q50 58 20 55 Q18 35 20 15" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4" />
                    <path d="M25 20 H50 M25 28 H40" stroke="white" strokeWidth="0.5" opacity="0.2" />
                  </svg>
                )
              },
              { 
                title: 'Smart Archive', 
                desc: 'Archive and pin chats to keep your workspace tidy.', 
                hue: '110deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M25 20 L50 10 L75 20 L75 45 L50 55 L25 45 Z" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.9" />
                    <path d="M25 20 L50 30 L75 20 M50 30 V55" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" />
                    <path d="M30 25 L45 35 M55 35 L70 25" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <path d="M40 16 L65 26" stroke="white" strokeWidth="1" opacity="0.3" />
                  </svg>
                )
              },
              { 
                title: 'Quick Share', 
                desc: 'Share panel via dedicated module or keyboard shortcut.', 
                hue: '20deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M20 30 Q50 10 85 30 L45 40 L20 30" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.9" />
                    <path d="M45 40 L50 55 L55 40" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.7" />
                    <path d="M30 35 L35 38" stroke="white" strokeWidth="1" opacity="0.4" />
                    <path d="M20 30 L55 40" stroke="white" strokeWidth="0.8" opacity="0.3" />
                    <path d="M10 10 L20 20 M90 50 L80 40" stroke="white" strokeWidth="0.5" opacity="0.2" />
                  </svg>
                )
              }
            ].map((f, i) => (
              <ScrollReveal key={i} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <div 
                  className="mini-feature-card" 
                  style={{ '--card-hue': f.hue } as any}
                >
                  <div className="mini-feature-content">
                    <h4 className="h4">{f.title}</h4>
                    <p className="body-sm mt-2" style={{ opacity: 0.7 }}>{f.desc}</p>
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

          <div className="pricing-matrix-container">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th className="feature-col">Feature</th>
                  <th className="tier-col">Free</th>
                  <th className="tier-col pro-col">Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="tier-header">
                  <td className="feature-col">
                    <p className="body-sm">Start your journey with essential features.</p>
                  </td>
                  <td className="tier-col">
                    <span className="price">$0</span>
                    <button className="btn btn-ghost w-full mt-2">Get Started</button>
                  </td>
                  <td className="tier-col pro-col">
                    <span className="price">$4.99</span>
                    <button className="btn btn-accent w-full mt-2" onClick={() => window.open('https://buy.stripe.com/8wM8xM3Tj7Yx608eUU', '_blank')}>Upgrade</button>
                  </td>
                </tr>
                <tr>
                  <td className="feature-col">
                    Direct Messages
                    <span className="feature-info">1-on-1 private messaging</span>
                  </td>
                  <td className="tier-col">15 Friends</td>
                  <td className="tier-col pro-col"><strong>Unlimited</strong></td>
                </tr>
                <tr>
                  <td className="feature-col">
                    Group Chats
                    <span className="feature-info">Collaborative group environments</span>
                  </td>
                  <td className="tier-col">5 Groups</td>
                  <td className="tier-col pro-col"><strong>Unlimited</strong></td>
                </tr>
                <tr>
                  <td className="feature-col">
                    GitHub Context
                    <span className="feature-info">Attach PRs, Issues & Branches</span>
                  </td>
                  <td className="tier-col"><span className="status-icon check">✓</span></td>
                  <td className="tier-col pro-col"><span className="status-icon check">✓</span></td>
                </tr>
                <tr>
                  <td className="feature-col">
                    Smart Triage
                    <span className="feature-info">Custom GitHub actions in chat</span>
                  </td>
                  <td className="tier-col"><span className="status-icon check">✓</span></td>
                  <td className="tier-col pro-col"><span className="status-icon check">✓</span></td>
                </tr>
                <tr>
                  <td className="feature-col">
                    Pad Entries
                    <span className="feature-info">Note and task management</span>
                  </td>
                  <td className="tier-col">10 Entries</td>
                  <td className="tier-col pro-col"><strong>Unlimited</strong></td>
                </tr>
                <tr>
                  <td className="feature-col">
                    Cloud Data Sync
                    <span className="feature-info">Cross-device persistence</span>
                  </td>
                  <td className="tier-col"><span className="status-icon cross">✕</span></td>
                  <td className="tier-col pro-col"><span className="status-icon check">✓</span></td>
                </tr>
                <tr>
                  <td className="feature-col">
                    Custom Accents
                    <span className="feature-info">Personalize your UI colors</span>
                  </td>
                  <td className="tier-col"><span className="status-icon cross">✕</span></td>
                  <td className="tier-col pro-col"><span className="status-icon check">✓</span></td>
                </tr>
                <tr>
                  <td className="feature-col">
                    Support
                    <span className="feature-info">Response time and priority</span>
                  </td>
                  <td className="tier-col">Community</td>
                  <td className="tier-col pro-col">Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ TRUST + FAQ ═══ */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            <ScrollReveal>
              <div className="trust-content">
                <div className="badge mb-6"><Shield size={12} /> Security</div>
                <h2 className="h3 mb-4">Built on trust.</h2>
                <p className="body-md mb-8">Every table protected with PostgreSQL Row Level Security. Your data is completely isolated.</p>
                <ul className="price-features" style={{ marginTop: 0 }}>
                  <li><span className="ck">✓</span> GitHub OAuth — no passwords stored</li>
                  <li><span className="ck">✓</span> Complete per-user data isolation</li>
                  <li><span className="ck">✓</span> Encrypted in transit & at rest</li>
                </ul>
                <a href="/security" className="btn btn-ghost mt-8">Security Details <ArrowRight size={14} /></a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h2 className="h3 mb-6">FAQs</h2>
              <FAQ />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: '40px 0 80px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="h1" style={{ fontSize: 'clamp(3rem, 18vw, 12rem)', fontWeight: 200, letterSpacing: '-0.03em', marginBottom: 0, lineHeight: 1, color: 'rgba(255,255,255,0.9)' }}>RepoChat.</h2>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
