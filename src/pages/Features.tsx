import { useState, useRef, useCallback, useEffect } from 'react'
import { MessageSquare, GitPullRequest, ClipboardList, Dna, Database, AppWindow, Activity, Share2, Bot, Check, Globe, Lock, User } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const featureCards = [
  {
    category: 'Communication',
    img: '/group.png',
    icon: MessageSquare,
    dark: true,
    infoHue: '240',
    description: 'Real-time messaging built into GitHub — DMs, groups, threads, and emoji reactions, powered by Supabase Realtime.',
    features: [
      'Real-time DMs, groups & threaded replies',
      'Emoji reactions with full skin-tone support',
      'Live presence & typing indicators'
    ]
  },
  {
    category: 'Identity',
    img: '/dna.png',
    icon: Dna,
    dark: false,
    infoHue: '160',
    description: 'Dev DNA — a full developer identity card with radar stats, language breakdown, commit pulse, and achievement badges.',
    features: [
      'Radar chart for velocity, impact & OSS scores',
      'Tech DNA language bar from real repo data',
      '14 achievement badges earned from activity'
    ]
  },
  {
    category: 'Productivity',
    img: '/pad.png',
    icon: ClipboardList,
    dark: false,
    infoHue: '90',
    description: 'Personal scratchpads with checklist tracking, star/pin system, and full CRUD — synced via Supabase or stored locally.',
    features: [
      'Create, edit, pin & star personal scratchpads',
      'Interactive checklist tracking for tasks',
      'Cloud sync (Pro) or local browser storage'
    ]
  },
  {
    category: 'Triage',
    img: '/triage.png',
    icon: GitPullRequest,
    dark: true,
    infoHue: '300',
    description: 'Full GitHub triage from the chat sidebar — comment on issues, manage labels & assignees, and close/reopen without leaving the page.',
    features: [
      'Post comments on Issues & PRs directly',
      'Smart Task Assignments & label management',
      'Auto-detects public vs private repo scopes'
    ]
  },
  {
    category: 'Sharing',
    img: '/share.png',
    icon: Share2,
    dark: true,
    infoHue: '30',
    description: 'Select any text on GitHub and share it instantly to friends or groups — with pinned recipients, personal messages, and template chips.',
    features: [
      'Floating share popup on any text selection',
      'Multi-target sharing to friends & groups',
      'Configurable quick-reply template chips'
    ]
  },
  {
    category: 'RepoBot',
    img: '/repobot.png',
    icon: Bot,
    dark: false,
    infoHue: '200',
    description: 'AI-powered repo explainer — choose Quick, Detailed, ELI5, or Architecture mode, then ask follow-up questions with full context.',
    features: [
      'Four explain modes: Quick, Detailed, ELI5 & Arch',
      'BYO keys: Groq, OpenAI, Claude & Gemini',
      'Fetches live repo metadata & file tree context'
    ]
  }
]


export default function Features() {
  const archPanelRef = useRef<HTMLDivElement>(null)
  const archPipelineRef = useRef<HTMLDivElement>(null)
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const toggleCard = (index: number) => {
    setExpandedCards(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  // Fluid architecture graph scaling — same principle as ecosystem diagram.
  // Continuously maps container width to a zoom level so the layout never overflows.
  const updateArchScale = useCallback(() => {
    const panel = archPanelRef.current;
    const pipeline = archPipelineRef.current;
    if (!panel || !pipeline) return;

    const BASE_WIDTH = 1150; // natural unscaled pipeline width + breathing room (matches ecosystem)
    const style = getComputedStyle(panel);
    const padL = parseFloat(style.paddingLeft) || 0;
    const padR = parseFloat(style.paddingRight) || 0;
    const available = panel.clientWidth - padL - padR;

    if (available >= BASE_WIDTH) {
      pipeline.style.zoom = '1';
    } else {
      const scale = Math.max(available / BASE_WIDTH, 0.25);
      pipeline.style.zoom = scale.toString();
    }
  }, []);

  useEffect(() => {
    updateArchScale();
    window.addEventListener('resize', updateArchScale);
    const ro = new ResizeObserver(updateArchScale);
    if (archPanelRef.current) ro.observe(archPanelRef.current);
    return () => {
      window.removeEventListener('resize', updateArchScale);
      ro.disconnect();
    };
  }, [updateArchScale]);

  return (
    <div className="feat-page">
      <div className="container">

        {/* ═══ HERO ═══ */}
        <ScrollReveal>
          <div className="feat-hero-area">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <h1 className="h2">Every feature built<br /><span className="gradient-text">for developer flow.</span></h1>
              <p>Explore the tools that keep your team in sync — right where the code lives.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ═══ FEATURE ARCHITECTURE GRAPH ═══ */}
        <ScrollReveal>
          <div className="feat-arch-panel" ref={archPanelRef}>
            {/* Background glowing effects */}
            <div className="feat-arch-glow feat-arch-glow-left"></div>
            <div className="feat-arch-glow feat-arch-glow-right"></div>

            <div className="feat-arch-pipeline" ref={archPipelineRef}>
              
              {/* Left: The Source */}
              <div className="feat-arch-column feat-arch-source">
                <div className="feat-arch-node node-source">
                  <div className="node-icon"><GitPullRequest size={24} /></div>
                  <div className="node-title">GitHub Repository</div>
                  <div className="node-tags">
                    <span>Code Context</span>
                    <span>PRs</span>
                    <span>Issues</span>
                  </div>
                </div>
              </div>

              {/* SVG Connections: Source to Engine */}
              <div className="feat-arch-connections connections-1">
                <svg preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,50 C50,50 50,50 100,50" className="arch-line" />
                  <path d="M0,50 C50,50 50,50 100,50" className="arch-line-animated" />
                </svg>
              </div>

              {/* Middle: The Engine */}
              <div className="feat-arch-column feat-arch-engine">
                <div className="feat-arch-core">
                  <div className="core-rings">
                    <div className="core-ring cr-1"></div>
                    <div className="core-ring cr-2"></div>
                    <div className="core-ring cr-3"></div>
                  </div>
                  <div className="core-center">
                    <span className="core-logo">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                    </span>
                  </div>

                  {/* Satellite Nodes (Real RepoChat Stack) */}
                  <div className="core-node cn-1">
                    <div className="cn-icon"><Activity size={16} /></div>
                    <div className="cn-label">Supabase Realtime</div>
                  </div>
                  <div className="core-node cn-2">
                    <div className="cn-icon"><Database size={16} /></div>
                    <div className="cn-label">PostgreSQL RLS</div>
                  </div>
                  <div className="core-node cn-3">
                    <div className="cn-icon"><AppWindow size={16} /></div>
                    <div className="cn-label">Chrome Extension API</div>
                  </div>
                </div>
              </div>

              {/* SVG Connections: Engine to Pillars */}
              <div className="feat-arch-connections connections-2">
                <div className="protocol-label pl-1">WSS://</div>
                <div className="protocol-label pl-2">REST API</div>
                <div className="protocol-label pl-3">DOM Sync</div>
                <svg preserveAspectRatio="none" viewBox="0 0 150 200">
                  {/* To Comm (Top) */}
                  <path d="M0,100 C50,100 50,25 150,25" className="arch-line" />
                  <path d="M0,100 C50,100 50,25 150,25" className="arch-line-animated" style={{ animationDelay: '0s' }} />
                  {/* To GitHub (Mid-Top) */}
                  <path d="M0,100 C75,100 75,75 150,75" className="arch-line" />
                  <path d="M0,100 C75,100 75,75 150,75" className="arch-line-animated" style={{ animationDelay: '0.5s' }} />
                  {/* To Prod (Mid-Bottom) */}
                  <path d="M0,100 C75,100 75,125 150,125" className="arch-line" />
                  <path d="M0,100 C75,100 75,125 150,125" className="arch-line-animated" style={{ animationDelay: '1s' }} />
                  {/* To Identity (Bottom) */}
                  <path d="M0,100 C50,100 50,175 150,175" className="arch-line" />
                  <path d="M0,100 C50,100 50,175 150,175" className="arch-line-animated" style={{ animationDelay: '1.5s' }} />
                </svg>
              </div>

              {/* Right: The 4 Pillars */}
              <div className="feat-arch-column feat-arch-pillars">
                
                <div className="arch-pillar-card p-comm">
                  <div className="p-icon"><MessageSquare size={16} /></div>
                  <div className="p-content">
                    <h4>Communication</h4>
                    <p>Real-time chat, threads, & DMs</p>
                  </div>
                </div>

                <div className="arch-pillar-card p-git">
                  <div className="p-icon"><GitPullRequest size={16} /></div>
                  <div className="p-content">
                    <h4>GitHub Integration</h4>
                    <p>Smart PR & Issue triage</p>
                  </div>
                </div>

                <div className="arch-pillar-card p-prod">
                  <div className="p-icon"><ClipboardList size={16} /></div>
                  <div className="p-content">
                    <h4>Productivity</h4>
                    <p>Shared scratchpads & notes</p>
                  </div>
                </div>

                <div className="arch-pillar-card p-id">
                  <div className="p-icon"><Dna size={16} /></div>
                  <div className="p-content">
                    <h4>Identity & Sharing</h4>
                    <p>Custom Dev DNA & presence</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* ═══ WHO IS IT FOR — 3 PILLAR CARDS ═══ */}
        <div className="eco-pillars" style={{ marginTop: 40, marginBottom: 16 }}>
          <ScrollReveal>
            <div className="eco-pillar-card">
              <div className="eco-pillar-header">
                <div className="eco-pillar-icon">
                  <Globe size={24} />
                </div>
                <h4 className="h4">For Open Source</h4>
              </div>
              <div className="eco-pillar-text">
                <p className="body-sm">Manage massive community repositories, triage issues, and talk to contributors — all without leaving GitHub.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="eco-pillar-card">
              <div className="eco-pillar-header">
                <div className="eco-pillar-icon eco-pillar-icon-green">
                  <Lock size={24} />
                </div>
                <h4 className="h4">For Private Startups</h4>
              </div>
              <div className="eco-pillar-text">
                <p className="body-sm">Keep your proprietary code secure while collaborating with your core team at lightning speed via real-time chat.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className="eco-pillar-card">
              <div className="eco-pillar-header">
                <div className="eco-pillar-icon eco-pillar-icon-cyan">
                  <User size={24} />
                </div>
                <h4 className="h4">For Solo Developers</h4>
              </div>
              <div className="eco-pillar-text">
                <p className="body-sm">Use personal scratchpads and AI-powered repo analysis to 10x your learning speed on any new codebase.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ═══ FEATURE CARDS — 2×3 GRID ═══ */}
        <section className="feat-cards-section">
          <ScrollReveal>
            <div className="section-head" style={{ marginBottom: 48 }}>
              <h2 className="h3">Explore every <span className="gradient-text">capability.</span></h2>
              <p className="body-md" style={{ opacity: 0.6, marginTop: 8 }}>Click any card to discover what's inside.</p>
            </div>
          </ScrollReveal>

          <div className="feat-cards-grid">
            {featureCards.map((card, i) => {
              const isExpanded = expandedCards.has(i)
              const isDark = card.dark
              const Icon = card.icon
              return (
                <ScrollReveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div
                    className={`feat-card ${isDark ? 'feat-card--dark' : 'feat-card--light'} ${isExpanded ? 'is-expanded' : ''}`}
                    id={`feat-card-${i}`}
                  >
                    <div className="feat-card-media">
                      <img src={card.img} alt={card.category} className="feat-card-img" loading="lazy" />
                      <div className="feat-card-info" style={{ '--info-hue': `${card.infoHue}deg` } as React.CSSProperties}>
                        <p className="feat-card-desc">{card.description}</p>
                        <ul className="feat-card-features">
                          {card.features.map((f, j) => (
                            <li key={j}><Check size={14} strokeWidth={3} /> <span>{f}</span></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="feat-card-footer">
                      <div className="feat-card-label">
                        <Icon size={18} />
                        <span>{card.category}</span>
                      </div>
                      <button
                        className="feat-card-toggle"
                        onClick={() => toggleCard(i)}
                        aria-label={isExpanded ? 'Close details' : 'Show details'}
                      >
                        <span className="feat-card-toggle-icon">{isExpanded ? '×' : '+'}</span>
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <ScrollReveal>
          <div className="feat-cta-banner">
            <div className="eco-cta-left">
              <h3 className="h3">Every feature you need. Zero context switching.</h3>
            </div>
            <div className="eco-cta-right">
              <p className="body-sm">Free forever. No credit card required.</p>
              <a href="#install" className="btn btn-white">Add to Chrome — Free</a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
