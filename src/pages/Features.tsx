import { MessageSquare, Zap, GitPullRequest, ClipboardList, Dna, Database, AppWindow, Activity } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

export default function Features() {
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
          <div className="feat-arch-panel">
            {/* Architectural Crosshairs */}
            <div className="arch-crosshair tl"></div>
            <div className="arch-crosshair tr"></div>
            <div className="arch-crosshair bl"></div>
            <div className="arch-crosshair br"></div>

            {/* Background glowing effects */}
            <div className="feat-arch-glow feat-arch-glow-left"></div>
            <div className="feat-arch-glow feat-arch-glow-right"></div>

            <div className="feat-arch-pipeline">
              
              {/* Left: The Source */}
              <div className="feat-arch-column feat-arch-source">
                <div className="feat-arch-node node-source">
                  <div className="node-icon"><GitPullRequest size={24} /></div>
                  <div className="node-title">GitHub Repository</div>
                  <div className="node-tags">
                    <span>Commits</span>
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

          {/* ── 3D Card Deck ── */}
          <ScrollReveal>
            <div className="feat-deck-wrapper">
              <div className="feat-deck">

                {/* Card 1: Real-Time DM */}
                <div className="feat-deck-card" style={{ '--deck-i': 0 } as React.CSSProperties}>
                  <div className="feat-deck-visual">
                    <svg viewBox="0 0 160 100" className="feat-deck-svg">
                      {/* Two chat bubbles appearing */}
                      <rect x="10" y="15" rx="10" ry="10" width="90" height="28" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6" strokeWidth="1">
                        <animate attributeName="opacity" values="0;1;1" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <line x1="22" y1="27" x2="75" y2="27" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round">
                        <animate attributeName="opacity" values="0;1;1" dur="3s" repeatCount="indefinite" />
                      </line>
                      <line x1="22" y1="36" x2="55" y2="36" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinecap="round">
                        <animate attributeName="opacity" values="0;1;1" dur="3s" repeatCount="indefinite" />
                      </line>
                      <rect x="60" y="55" rx="10" ry="10" width="90" height="28" fill="rgba(6,182,212,0.12)" stroke="#06B6D4" strokeWidth="1">
                        <animate attributeName="opacity" values="0;0;1" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <line x1="72" y1="67" x2="130" y2="67" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round">
                        <animate attributeName="opacity" values="0;0;1" dur="3s" repeatCount="indefinite" />
                      </line>
                      <line x1="72" y1="76" x2="110" y2="76" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinecap="round">
                        <animate attributeName="opacity" values="0;0;1" dur="3s" repeatCount="indefinite" />
                      </line>
                      {/* Read tick */}
                      <path d="M138 80 L142 84 L148 76" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
                        <animate attributeName="opacity" values="0;0;0.6" dur="3s" repeatCount="indefinite" />
                      </path>
                    </svg>
                  </div>
                  <h4 className="feat-deck-title">Real-Time DMs</h4>
                  <p className="feat-deck-desc">Instant 1-on-1 messaging with read receipts and typing indicators.</p>
                  <span className="feature-tier-badge limit">15 Friends on Free</span>
                </div>

                {/* Card 2: Group Chat */}
                <div className="feat-deck-card" style={{ '--deck-i': 1 } as React.CSSProperties}>
                  <div className="feat-deck-visual">
                    <svg viewBox="0 0 160 100" className="feat-deck-svg">
                      {/* Multiple avatars */}
                      <circle cx="40" cy="30" r="12" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6" strokeWidth="1" />
                      <circle cx="80" cy="30" r="12" fill="rgba(6,182,212,0.15)" stroke="#06B6D4" strokeWidth="1" />
                      <circle cx="120" cy="30" r="12" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1" />
                      {/* Pulse rings on middle avatar */}
                      <circle cx="80" cy="30" r="12" fill="none" stroke="#06B6D4" strokeWidth="0.5" opacity="0.4">
                        <animate attributeName="r" values="12;22" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
                      </circle>
                      {/* Group chat bubble */}
                      <rect x="20" y="55" rx="10" ry="10" width="120" height="30" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
                      <line x1="32" y1="68" x2="90" y2="68" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="32" y1="77" x2="70" y2="77" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h4 className="feat-deck-title">Group Chats</h4>
                  <p className="feat-deck-desc">Create groups with admin roles, custom avatars, and member management.</p>
                  <span className="feature-tier-badge limit">5 Groups on Free</span>
                </div>

                {/* Card 3: Reactions */}
                <div className="feat-deck-card" style={{ '--deck-i': 2 } as React.CSSProperties}>
                  <div className="feat-deck-visual">
                    <svg viewBox="0 0 160 100" className="feat-deck-svg">
                      {/* Message bubble */}
                      <rect x="15" y="10" rx="10" ry="10" width="130" height="40" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
                      <line x1="30" y1="28" x2="120" y2="28" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="30" y1="38" x2="90" y2="38" stroke="rgba(255,255,255,0.07)" strokeWidth="2" strokeLinecap="round" />
                      {/* Emoji reactions bouncing in */}
                      <text x="30" y="75" fontSize="18" opacity="0.9">👍</text>
                      <text x="58" y="75" fontSize="18">
                        <animate attributeName="y" values="85;75" dur="0.5s" begin="0.5s" fill="freeze" />
                        <animate attributeName="opacity" values="0;0.9" dur="0.5s" begin="0.5s" fill="freeze" />
                        🔥
                      </text>
                      <text x="86" y="75" fontSize="18">
                        <animate attributeName="y" values="85;75" dur="0.5s" begin="1s" fill="freeze" />
                        <animate attributeName="opacity" values="0;0.9" dur="0.5s" begin="1s" fill="freeze" />
                        😄
                      </text>
                      <text x="114" y="75" fontSize="18">
                        <animate attributeName="y" values="85;75" dur="0.5s" begin="1.5s" fill="freeze" />
                        <animate attributeName="opacity" values="0;0.9" dur="0.5s" begin="1.5s" fill="freeze" />
                        🚀
                      </text>
                    </svg>
                  </div>
                  <h4 className="feat-deck-title">Reactions</h4>
                  <p className="feat-deck-desc">Full emoji picker with categorized browsing and real-time sync.</p>
                  <span className="feature-tier-badge all">All Plans</span>
                </div>

                {/* Card 4: Threads */}
                <div className="feat-deck-card" style={{ '--deck-i': 3 } as React.CSSProperties}>
                  <div className="feat-deck-visual">
                    <svg viewBox="0 0 160 100" className="feat-deck-svg">
                      {/* Main message */}
                      <rect x="10" y="8" rx="8" ry="8" width="100" height="25" fill="rgba(139,92,246,0.1)" stroke="#8B5CF6" strokeWidth="1" />
                      <line x1="20" y1="19" x2="90" y2="19" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
                      {/* Branch line */}
                      <path d="M60 33 L60 48 Q60 55 67 55 L80 55" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" strokeDasharray="4 3">
                        <animate attributeName="strokeDashoffset" values="14;0" dur="1.5s" fill="freeze" />
                      </path>
                      {/* Thread reply 1 */}
                      <rect x="80" y="44" rx="8" ry="8" width="70" height="22" fill="rgba(6,182,212,0.08)" stroke="#06B6D4" strokeWidth="1" opacity="0">
                        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="0.8s" fill="freeze" />
                      </rect>
                      {/* Thread reply 2 */}
                      <path d="M60 55 L60 78 Q60 85 67 85 L80 85" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="1.5" strokeDasharray="4 3">
                        <animate attributeName="strokeDashoffset" values="14;0" dur="1s" begin="1.2s" fill="freeze" />
                      </path>
                      <rect x="80" y="74" rx="8" ry="8" width="70" height="22" fill="rgba(16,185,129,0.08)" stroke="#10B981" strokeWidth="1" opacity="0">
                        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="1.8s" fill="freeze" />
                      </rect>
                    </svg>
                  </div>
                  <h4 className="feat-deck-title">Threads</h4>
                  <p className="feat-deck-desc">Branch focused discussions from any context card or message.</p>
                  <span className="feature-tier-badge limit">Pro Only</span>
                </div>

                {/* Card 5: Presence */}
                <div className="feat-deck-card" style={{ '--deck-i': 4 } as React.CSSProperties}>
                  <div className="feat-deck-visual">
                    <svg viewBox="0 0 160 100" className="feat-deck-svg">
                      {/* User avatars with presence dots */}
                      <circle cx="35" cy="40" r="16" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.25)" strokeWidth="1.5" />
                      <circle cx="47" cy="52" r="5" fill="#10B981" stroke="rgba(15,15,20,1)" strokeWidth="2">
                        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="80" cy="40" r="16" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.25)" strokeWidth="1.5" />
                      <circle cx="92" cy="52" r="5" fill="#10B981" stroke="rgba(15,15,20,1)" strokeWidth="2">
                        <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="125" cy="40" r="16" fill="rgba(234,179,8,0.1)" stroke="rgba(234,179,8,0.25)" strokeWidth="1.5" />
                      <circle cx="137" cy="52" r="5" fill="rgba(255,255,255,0.2)" stroke="rgba(15,15,20,1)" strokeWidth="2" />
                      {/* Labels */}
                      <text x="35" y="72" textAnchor="middle" fill="rgba(16,185,129,0.5)" fontSize="7" fontWeight="600">Online</text>
                      <text x="80" y="72" textAnchor="middle" fill="rgba(16,185,129,0.5)" fontSize="7" fontWeight="600">Online</text>
                      <text x="125" y="72" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontWeight="600">Away</text>
                    </svg>
                  </div>
                  <h4 className="feat-deck-title">Presence</h4>
                  <p className="feat-deck-desc">See who's online with real-time status and last-seen timestamps.</p>
                  <span className="feature-tier-badge all">All Plans</span>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* ── Screenshot in Device Frame ── */}
          <ScrollReveal>
            <div className="feat-device-showcase">
              <div className="feat-device-frame feat-device-frame--purple">
                <div className="feat-device-dots"><span /><span /><span /></div>
                <img src="/group.png" alt="Real-Time Group Chat" loading="lazy" />
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
