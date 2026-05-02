import { useRef, useState } from 'react'
import { ArrowRight, Shield, Zap, Check, X, Sparkles } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import FAQ from '../components/FAQ'

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

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeMiniFeature, setActiveMiniFeature] = useState(0)
  
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const mockupScale = useTransform(heroProgress, [0, 1], [1, .9])
  const mockupOpacity = useTransform(heroProgress, [0, .8, 1], [1, 1, 0])

  const handleGridScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const maxScrollLeft = target.scrollWidth - target.clientWidth;
    if (maxScrollLeft <= 0) return;
    const progress = scrollLeft / maxScrollLeft;
    const newIndex = Math.round(progress * 14); // 15 items total, index 0 to 14
    if (newIndex !== activeMiniFeature) {
      setActiveMiniFeature(newIndex);
    }
  };

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
              Turn GitHub into a real-time workspace. Discuss PRs, assign tasks, and triage issues instantly without ever breaking your flow.
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
          <img src="/RC_main_UI.png" alt="RepoChat — Main UI" fetchPriority="high" decoding="async" />
        </motion.div>
      </section>

      {/* ═══ FEATURE ROWS ═══ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div className="badge mb-6"><Zap size={12} /> Core Features</div>
              <h2 className="h2">Your entire workflow,<br />in one sidebar.</h2>
              <p>Eliminate context switching. Chat with your team, manage GitHub issues, and share code context—all without leaving the repository.</p>
            </div>
          </ScrollReveal>

          {/* ═══ STACKING CARDS ═══ */}
          <div className="stack-cards">
            {/* 1: Group Chats */}
            <ScrollReveal>
              <div className="stack-card">
                <div className="feature-text">
                  <div className="badge">Team Collaboration</div>
                  <h3 className="h3 mt-4">Group Chats & Teams</h3>
                  <p className="body-md">Create project-specific group chats. Add team members and collaborate in real-time right next to your codebase.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_group.png" alt="Group Chats" loading="lazy" decoding="async" />
                </div>
              </div>
            </ScrollReveal>

            {/* 2: Repo-Linked Channels */}
            <ScrollReveal>
              <div className="stack-card reverse">
                <div className="feature-text">
                  <div className="badge">Repo Integration</div>
                  <h3 className="h3 mt-4">Repo-Linked Channels</h3>
                  <p className="body-md">Link group chats to specific repositories. Automatically context-sync your channel with the repository's activity and updates.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_RLC.png" alt="Repo-Linked Channels" loading="lazy" decoding="async" />
                </div>
              </div>
            </ScrollReveal>

            {/* 3: Attach PR Context */}
            <ScrollReveal>
              <div className="stack-card">
                <div className="feature-text">
                  <div className="badge">Context Sharing</div>
                  <h3 className="h3 mt-4">Attach PR Context</h3>
                  <p className="body-md">Instantly share PR details. Just click the share icon to attach the current PR or search for any PR/Issue in the repo.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_share_popup.png" alt="Pull Request Context" loading="lazy" decoding="async" />
                </div>
              </div>
            </ScrollReveal>

            {/* 4: Conversation Threads */}
            <ScrollReveal>
              <div className="stack-card reverse">
                <div className="feature-text">
                  <div className="badge">Threaded Chats</div>
                  <h3 className="h3 mt-4">Conversation Threads</h3>
                  <p className="body-md">Keep discussions organized. Start threaded conversations directly on PR and Issue context cards to keep main chats clutter-free.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_CTG.png" alt="Conversation Threads" loading="lazy" decoding="async" />
                </div>
              </div>
            </ScrollReveal>

            {/* 5: Smart Triage */}
            <ScrollReveal>
              <div className="stack-card">
                <div className="feature-text">
                  <div className="badge">Smart Triage</div>
                  <h3 className="h3 mt-4">Smart GitHub Triage</h3>
                  <p className="body-md">Manage issues without leaving your chat. Add labels, assign developers, and close issues with a single click in the sidebar.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_triage.png" alt="Smart Triage" loading="lazy" decoding="async" />
                </div>
              </div>
            </ScrollReveal>

            {/* 6: Smart Task Assignments */}
            <ScrollReveal>
              <div className="stack-card reverse">
                <div className="feature-text">
                  <div className="badge">Task Management</div>
                  <h3 className="h3 mt-4">Smart Task Assignments</h3>
                  <p className="body-md">Assign reviewers to PRs or owners to Issues directly in chat. Track task status from pending to resolved without context switching.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_STA.png" alt="Smart Task Assignments" loading="lazy" decoding="async" />
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
                  <img src="/RC_comment.png" alt="Comment on GitHub" loading="lazy" decoding="async" />
                </div>
              </div>
            </ScrollReveal>

            {/* 8: Shared via RepoChat */}
            <ScrollReveal>
              <div className="stack-card reverse">
                <div className="feature-text">
                  <div className="badge">Shared via RepoChat</div>
                  <h3 className="h3 mt-4">Clear Comment Attribution</h3>
                  <p className="body-md">Comments sync directly to GitHub PRs and Issues, featuring a "Shared via RepoChat" tag so your team knows their origin.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_shared_via_RC.png" alt="Shared via RepoChat" loading="lazy" decoding="async" />
                </div>
              </div>
            </ScrollReveal>

            {/* 9: Dev DNA */}
            <ScrollReveal>
              <div className="stack-card">
                <div className="feature-text">
                  <div className="badge">Developer Profile</div>
                  <h3 className="h3 mt-4">Dev DNA & Power Stats</h3>
                  <p className="body-md">View any developer's tech stack, commit pulse, power stats radar chart, and earned badges — all in one beautiful profile card.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_Dev_DNA.png" alt="Dev DNA & Power Stats" loading="lazy" decoding="async" />
                </div>
              </div>
            </ScrollReveal>

            {/* 10: GitHub Profiles */}
            <ScrollReveal>
              <div className="stack-card reverse">
                <div className="feature-text">
                  <div className="badge">GitHub Profiles</div>
                  <h3 className="h3 mt-4">View GitHub Profiles</h3>
                  <p className="body-md">Instantly view your own or any group member's GitHub profile details and profile picture directly within the chat interface.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_github.png" alt="GitHub Profiles" loading="lazy" decoding="async" />
                </div>
              </div>
            </ScrollReveal>

            {/* 11: Pad */}
            <ScrollReveal>
              <div className="stack-card">
                <div className="feature-text">
                  <div className="badge">Built-in Notepad</div>
                  <h3 className="h3 mt-4">Pad — Notes & Tasks</h3>
                  <p className="body-md">Quick notes, code snippets, and task tracking with completion progress. Pro users get cloud sync.</p>
                </div>
                <div className="feature-media">
                  <img src="/RC_pad.png" alt="Notes & Tasks" loading="lazy" decoding="async" />
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

          <div className="mini-features-grid" onScroll={handleGridScroll}>
            {[
              { 
                title: 'Message Reactions', 
                desc: 'React with emojis to any message in real-time.', 
                hue: '320deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M50 10 Q52 25 65 25 Q52 25 50 40 Q48 25 35 25 Q48 25 50 10" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.9" />
                    <path d="M48 15 L52 15 M48 20 L52 20 M48 30 L52 30" stroke="white" strokeWidth="0.5" opacity="0.3" />
                    <circle cx="20" cy="15" r="5" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" />
                    <path d="M17 13 L18 13 M22 13 L23 13" stroke="white" strokeWidth="1" strokeLinecap="round" />
                    <path d="M17 18 Q20 21 23 18" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="80" cy="45" r="5" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" />
                    <path d="M77 43 L78 43 M82 43 L83 43" stroke="white" strokeWidth="1" strokeLinecap="round" />
                    <path d="M77 48 Q80 51 83 48" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                )
              },
              { 
                title: 'Starred Messages', 
                desc: 'Star important messages for quick access later.', 
                hue: '45deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M50 15 L55 30 L70 30 L58 40 L62 55 L50 45 L38 55 L42 40 L30 30 L45 30 Z" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
                    <path d="M50 15 L55 30 L70 30 L58 40" fill="none" stroke="white" strokeWidth="1" strokeLinejoin="round" opacity="0.4" />
                    <circle cx="20" cy="20" r="1" fill="white" opacity="0.2" />
                    <circle cx="80" cy="40" r="1" fill="white" opacity="0.2" />
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
                hue: '0deg',
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
                title: 'Pinned & Archived Chats', 
                desc: 'Keep the sidebar clean by managing your chat list.', 
                hue: '110deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M25 20 L50 10 L75 20 L75 45 L50 55 L25 45 Z" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.9" />
                    <path d="M25 20 L50 30 L75 20 M50 30 V55" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.7" />
                    <path d="M30 25 L45 35 M55 35 L70 25" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <circle cx="50" cy="15" r="2" fill="white" opacity="0.6" />
                    <path d="M40 16 L65 26" stroke="white" strokeWidth="1" opacity="0.3" />
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
                title: 'Cloud Data Sync', 
                desc: 'Seamlessly sync chats and settings across devices.', 
                hue: '190deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 35 Q30 20 45 20 Q50 10 65 15 Q75 20 75 35 Z" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
                    <path d="M45 40 L50 30 L55 40" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
                    <path d="M50 30 V50" stroke="white" strokeWidth="1.5" opacity="0.6" />
                    <path d="M35 45 H65" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                  </svg>
                )
              },
              { 
                title: 'Chat Export', 
                desc: 'Download your group discussions in markdown format.', 
                hue: '170deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M30 15 H60 L75 30 V50 H30 Z" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.8" />
                    <path d="M60 15 V30 H75" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.8" />
                    <path d="M45 25 L52.5 35 L60 25" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
                    <path d="M52.5 15 V35" stroke="#06B6D4" strokeWidth="2" opacity="0.9" />
                    <path d="M40 45 H65" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                  </svg>
                )
              },
              { 
                title: 'Pinned Messages', 
                desc: 'Pin crucial decisions to the top of any group chat.', 
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
                title: 'Notification Center', 
                desc: 'A dedicated inbox for mentions and friend requests.', 
                hue: '340deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <path d="M40 25 Q50 15 60 25 V40 L65 45 H35 L40 40 V25 Z" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
                    <path d="M45 45 Q50 55 55 45" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                    <circle cx="65" cy="20" r="4" fill="#8B5CF6" opacity="0.9" />
                    <path d="M63 20 H67 M65 18 V22" stroke="white" strokeWidth="1" />
                    <path d="M25 25 H30 M25 35 H35" stroke="white" strokeWidth="0.5" opacity="0.3" strokeLinecap="round" />
                  </svg>
                )
              },
              { 
                title: 'Friend System', 
                desc: 'Add colleagues to see their status and quick-message.', 
                hue: '80deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <circle cx="35" cy="25" r="8" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.9" />
                    <path d="M20 50 Q35 35 50 50" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                    <circle cx="65" cy="25" r="8" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.7" />
                    <path d="M50 50 Q65 35 80 50" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    <circle cx="42" cy="18" r="3" fill="#8B5CF6" opacity="0.9" />
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
              },
              { 
                title: 'Smart Mentions', 
                desc: 'Notify team members with context-aware @mentions.', 
                hue: '300deg',
                visual: (
                  <svg viewBox="0 0 100 60" className="visual-svg">
                    <circle cx="50" cy="30" r="15" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.8" />
                    <path d="M50 22 V38 M42 30 H58" stroke="white" strokeWidth="1.5" opacity="0.4" />
                    <path d="M50 30 L65 45" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    <text x="44" y="34" fill="white" fontSize="14" fontWeight="bold" opacity="0.9">@</text>
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

          <div className="mini-features-pagination">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                className={`pagination-dot ${i === activeMiniFeature ? 'active' : ''}`}
              />
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

          {/* ===== FULL COMPARISON TABLE ONLY ===== */}
          <div style={{ marginTop: 'var(--space-m)' }}>
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
                <Link to="/security" className="btn btn-ghost mt-8">Security Details <ArrowRight size={14} /></Link>
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
