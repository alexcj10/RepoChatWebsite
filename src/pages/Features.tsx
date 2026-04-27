import { MessageSquare, GitPullRequest, Tag, ClipboardList, Pin, Star, Palette, Users, Smile, Eye, FolderOpen, Archive, Zap, Share2, Download, Dna } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const features = [
  {
    icon: <MessageSquare size={22} />,
    title: 'Real-Time DM & Group Chat',
    desc: 'Send messages to friends or create group chats. All conversations happen in real-time with instant delivery and read status indicators.',
    details: ['1-on-1 direct messaging', 'Group chats with admin controls', 'Real-time message delivery', 'Read status & typing indicators'],
    tier: '15 Friends · 5 Groups on Free'
  },
  {
    icon: <GitPullRequest size={22} />,
    title: 'GitHub Context Sharing',
    desc: 'Attach Pull Requests, Issues, Branches, and Code snippets to any message. Share context from the exact page you\'re on with a single click.',
    details: ['PR and Issue context cards', 'Branch and code file references', 'Auto-detected context from current page', 'Personalized messages per recipient'],
    tier: 'All Plans'
  },
  {
    icon: <Tag size={22} />,
    title: 'Smart Triage',
    desc: 'Label and comment on GitHub Issues without ever leaving the chat. Apply labels, add comments, and manage your issue workflow inline.',
    details: ['Apply GitHub labels directly', 'Comment on issues from chat', 'Visual label color matching', 'Action sheet UI for quick actions'],
    tier: 'All Plans'
  },
  {
    icon: <ClipboardList size={22} />,
    title: 'Pad — Notes & Tasks',
    desc: 'A built-in notepad for quick thoughts, code snippets, and task lists. Pin important notes, mark tasks complete, and keep everything organized.',
    details: ['Quick note creation with titles', 'Task completion tracking with progress', 'Pin and star important notes', 'Cloud sync for Pro users'],
    tier: '10 entries on Free'
  },
  {
    icon: <Pin size={22} />,
    title: 'Pin Messages',
    desc: 'Pin important messages to the top of any chat. Set expiry times for temporary pins or pin permanently for critical context.',
    details: ['Pin with optional expiry duration', 'Visual pin indicator on messages', 'Quick unpin from context menu', '5 pins on Free, unlimited on Pro'],
    tier: '5 on Free'
  },
  {
    icon: <Star size={22} />,
    title: 'Star Messages',
    desc: 'Star messages you want to revisit later. View all starred messages in a dedicated panel for quick reference.',
    details: ['Star any message instantly', 'Dedicated starred messages panel', 'Bulk unstar all actions', '50 stars on Free, unlimited on Pro'],
    tier: '50 on Free'
  },
  {
    icon: <Smile size={22} />,
    title: 'Message Reactions',
    desc: 'React to messages with emoji. Full emoji picker with categorized browsing — express yourself without typing a full reply.',
    details: ['Full emoji picker with categories', 'Multiple reactions per message', 'Visual reaction counts with tooltips', 'One-tap to toggle reactions'],
    tier: 'All Plans'
  },
  {
    icon: <FolderOpen size={22} />,
    title: 'Custom Chat Lists',
    desc: 'Organize your chats into custom groups. Create lists for different projects, teams, or contexts and filter by them.',
    details: ['Create named chat lists', 'Add any chat to a list', 'Quick filter by list', '3 lists on Free, unlimited on Pro'],
    tier: '3 on Free'
  },
  {
    icon: <Eye size={22} />,
    title: 'Online Presence',
    desc: 'See who\'s online in real-time. Know when your teammates are available before messaging them.',
    details: ['Real-time online/offline status', 'Last seen timestamps', 'Visual presence indicators', 'Privacy-respecting design'],
    tier: 'All Plans'
  },
  {
    icon: <Archive size={22} />,
    title: 'Archive & Clear',
    desc: 'Archive conversations you\'re done with. Clear chat history for a fresh start without deleting the contact.',
    details: ['Archive completed chats', 'Clear chat history per contact', 'Restore archived chats anytime', '5 archives on Free, unlimited on Pro'],
    tier: '5 on Free'
  },
  {
    icon: <Palette size={22} />,
    title: 'Theming & Personalization',
    desc: 'Make RepoChat yours. Choose from 6 curated accent colors, pick your theme, adjust background effects, and set your preferred density.',
    details: ['6 curated accent colors', 'Light, Dark, and System themes', 'Background blur & dimming controls', 'Default and Compact density modes'],
    tier: 'All Plans'
  },
  {
    icon: <Users size={22} />,
    title: 'Group Management',
    desc: 'Full admin controls for group chats. Promote members, manage roles, update group info, and control who can join.',
    details: ['Admin and member roles', 'Promote/demote members', 'Custom group avatars', 'Group description editing'],
    tier: 'All Plans'
  },
  {
    icon: <Dna size={22} />,
    title: 'Dev DNA & Power Stats',
    desc: 'View any developer\'s tech stack, commit pulse, power stats radar chart, and earned badges — all generated from their GitHub activity.',
    details: ['Radar chart of developer stats', 'Weekly commit pulse visualization', 'Automatic tech stack detection', 'Earned badges and archetype titles'],
    tier: 'All Plans'
  },
  {
    icon: <Share2 size={22} />,
    title: 'Quick Share & Templates',
    desc: 'Share code context in one click. Pin your top 3 contacts for instant access and create up to 6 message templates for rapid sharing.',
    details: ['Solid or Glass share panel style', 'Pin up to 3 users for quick access', 'Up to 6 custom message templates', 'Share via button or keyboard shortcut'],
    tier: 'All Plans'
  },
  {
    icon: <Download size={22} />,
    title: 'Chat Export',
    desc: 'Export any conversation as a clean .txt file. Perfect for archiving decisions, sharing meeting notes, or keeping records offline.',
    details: ['Export as formatted .txt file', 'Includes timestamps and senders', 'Works for DMs and group chats', 'One-click download'],
    tier: 'All Plans'
  },
]

export default function Features() {
  return (
    <div className="legal-page">
      <div className="container">
        <ScrollReveal>
          <div className="section-head" style={{ marginBottom: 'var(--space-m)' }}>
            <div className="badge mb-6"><Zap size={12} /> Features</div>
            <h1 className="h2">Built for the Way<br /><span className="gradient-text">Developers Actually Work</span></h1>
            <p>Every feature designed to keep you in flow on GitHub.</p>
          </div>
        </ScrollReveal>

        <div className="features-grid">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={(i % 3) as 0 | 1 | 2 | 3}>
              <div className="feature-card-full" style={{
                '--card-glow': 'rgba(139, 92, 246, 0.4)',
                '--card-glow-bg': 'rgba(139, 92, 246, 0.3)',
              } as React.CSSProperties}>
                <div className="feature-card-header">
                  <div className="feature-card-icon">{f.icon}</div>
                  <div>
                    <h3 className="feature-card-title">{f.title}</h3>
                    <span className={f.tier === 'All Plans' ? 'feature-tier-badge all' : 'feature-tier-badge limit'}>{f.tier}</span>
                  </div>
                </div>
                <p className="feature-card-desc">{f.desc}</p>
                <ul className="feature-card-details">
                  {f.details.map((d, j) => (
                    <li key={j}>
                      <span className="feature-check">✓</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
