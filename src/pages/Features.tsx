import { useState, useRef, useCallback, useEffect } from 'react'
import { MessageSquare, Zap, GitPullRequest, ClipboardList, Dna, Database, AppWindow, Activity } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

export default function Features() {
  const archPanelRef = useRef<HTMLDivElement>(null)
  const archPipelineRef = useRef<HTMLDivElement>(null)
  const [openAccordion, setOpenAccordion] = useState(0)

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
              <div className="badge mb-6"><Zap size={12} /> Features</div>
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

        {/* ═══ CATEGORY 1: COMMUNICATION ═══ */}
        <section className="feat-section">
          <ScrollReveal>
            <div className="feat-section-label">
              <span className="badge"><MessageSquare size={12} /> Communication</span>
              <h2 className="h3" style={{ marginTop: 20 }}>Talk where you ship.</h2>
              <p className="body-md" style={{ opacity: 0.6, marginTop: 8, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>DMs, groups, threads, reactions — everything your team needs, inside GitHub.</p>
            </div>
          </ScrollReveal>

          {/* ── Split Showcase: Screenshot + Accordion ── */}
          <ScrollReveal>
            <div className="feat-showcase">
              {/* Left: Product Screenshot */}
              <div className="feat-showcase-visual">
                <div className="feat-device-frame feat-device-frame--purple">
                  <div className="feat-device-dots"><span /><span /><span /></div>
                  <img src="/group.png" alt="RepoChat — Communication Features" loading="lazy" />
                </div>
              </div>

              {/* Right: Accordion */}
              <div className="feat-showcase-info">
                {[
                  {
                    title: 'Real-Time DMs',
                    desc: 'Instant 1-on-1 messaging with read receipts, typing indicators, and delivery status — all synced via Supabase Realtime.',
                    tier: '15 Friends on Free'
                  },
                  {
                    title: 'Group Chats',
                    desc: 'Create groups with admin roles, custom avatars, and member management. Link groups directly to repositories for auto-context.',
                    tier: '5 Groups on Free'
                  },
                  {
                    title: 'Reactions',
                    desc: 'Full emoji picker with categorized browsing, skin tone support, and real-time sync across all connected users.',
                    tier: 'All Plans'
                  },
                  {
                    title: 'Threads',
                    desc: 'Branch focused discussions from any message or context card. Keep your main chat clean while diving deep into topics.',
                    tier: 'Pro Only'
                  },
                  {
                    title: 'Presence',
                    desc: 'See who\'s online with real-time status indicators and last-seen timestamps. Know when your team is available.',
                    tier: 'All Plans'
                  }
                ].map((item, i) => (
                  <div key={i} className={`feat-accordion-item${openAccordion === i ? ' is-open' : ''}`}>
                    <button className="feat-accordion-header" onClick={() => setOpenAccordion(openAccordion === i ? -1 : i)}>
                      <span className="feat-accordion-title">{item.title}</span>
                      <span className="feat-accordion-icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </button>
                    <div className="feat-accordion-body">
                      <div className="feat-accordion-inner">
                        <p>{item.desc}</p>
                        <span className={`feature-tier-badge ${item.tier === 'All Plans' ? 'all' : 'limit'}`}>{item.tier}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </section>

        {/* ═══ FINAL CTA ═══ */}
        <ScrollReveal>
          <div className="eco-cta-banner" style={{ marginTop: 'var(--space-xl)' }}>
            <div className="eco-cta-left">
              <h3 className="h3">Start collaborating where your code lives.</h3>
            </div>
            <div className="eco-cta-right">
              <p className="body-sm">No credit card required. Just your GitHub account.</p>
              <a href="#install" className="btn eco-cta-btn">Add to Chrome — Free</a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
