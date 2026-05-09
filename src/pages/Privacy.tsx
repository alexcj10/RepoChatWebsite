import { useEffect, useState, useMemo, useRef } from 'react';
import { Search } from 'lucide-react';

const SECTIONS = [
  {
    id: 'about',
    title: '1. Introduction & Scope',
    content: (
      <>
        <p>
          RepoChat ("we", "us", "our") provides a developer-centric communication platform built natively into the GitHub interface via a browser extension (collectively, the "Services"). We recognize that as software engineers, you place an absolute premium on data privacy, security, and the sanctity of your proprietary code. 
        </p>
        <p>
          This comprehensive Privacy Policy serves as our legally binding transparent disclosure of exactly how your personal data, metadata, and communications are collected, processed, and cryptographically secured when you interact with our Services, our backend APIs, or our web property (repoch.at). This policy applies to all users universally. If you do not agree with our data practices as outlined below, you must immediately uninstall the extension and revoke our OAuth permissions.
        </p>
      </>
    ),
    rawText: "Introduction Scope developer-centric communication browser extension software engineers data privacy security proprietary code Privacy Policy legally binding transparent disclosure metadata cryptographically secured backend APIs repoch.at OAuth permissions"
  },
  {
    id: 'collection-auth',
    title: '2. Authentication & Profile Data Collection',
    content: (
      <>
        <p>
          RepoChat operates on a strictly passwordless architecture. We do not possess, nor do we want, the capability to handle traditional usernames and passwords. When you authenticate into the Service, we utilize the industry-standard GitHub OAuth 2.0 protocol.
        </p>
        <p>
          Through this protocol, we request read-only access to specific, programmatic metadata from the GitHub API. Specifically, we collect and store: your immutable GitHub user ID, your public username, your display name, your public avatar URL, and an ephemeral OAuth access token. This token is securely utilized by our backend (via `src/lib/githubProxy.ts`) to proxy requests on your behalf, such as fetching repository context or searching for other GitHub users to add as friends. We never request access to your private code repositories.
        </p>
      </>
    ),
    rawText: "Authentication Profile Data passwordless architecture GitHub OAuth 2.0 protocol programmatic metadata immutable GitHub user ID username display name public avatar URL ephemeral OAuth access token githubProxy.ts proxy requests repository context friends private code repositories"
  },
  {
    id: 'collection-ugc',
    title: '3. User-Generated Content & Collaboration Data',
    content: (
      <>
        <p>
          To facilitate real-time communication, we must necessarily process the content you generate within the extension. This includes direct messages sent to peers, messages broadcasted in repository-specific group chats (which are intrinsically linked to a `github_full_name` identifier), diagnostic notes saved in your "Pads," and custom task lists you curate.
        </p>
        <p>
          All such User-Generated Content is transmitted over secure WebSocket connections and persisted in our PostgreSQL databases. We collect timestamps, sender/recipient IDs, and message payload data solely to ensure the reliable delivery, synchronization, and historical retrieval of your collaborative efforts across multiple devices.
        </p>
      </>
    ),
    rawText: "User-Generated Content Collaboration Data real-time communication direct messages repository-specific group chats github_full_name Pads custom task lists secure WebSocket connections PostgreSQL databases timestamps sender recipient IDs payload data synchronization historical retrieval"
  },
  {
    id: 'telemetry',
    title: '4. Telemetry, Analytics, and Tracking',
    content: (
      <>
        <p>
          In an era of rampant surveillance capitalism, RepoChat takes a radically different approach. <strong>We do not integrate any third-party tracking pixels, marketing analytics SDKs, or behavioral profiling tools</strong> into our extension or our web application. We do not use Google Analytics, Mixpanel, or similar services.
        </p>
        <p>
          We strictly collect bare-minimum, non-identifying operational telemetry required to keep our servers running. This includes server-side request logging (IP addresses, user-agent strings, and request timestamps) specifically utilized by our infrastructure to detect DDoS attacks, enforce API rate limits, and debug critical application crashes. We utilize local browser storage purely to cache your offline data and maintain your active session state—not to track you across the internet.
        </p>
      </>
    ),
    rawText: "Telemetry Analytics Tracking surveillance capitalism zero third-party tracking pixels marketing SDKs behavioral profiling Google Analytics Mixpanel non-identifying operational telemetry server-side request logging IP addresses user-agent strings DDoS attacks API rate limits local browser storage cache offline data session state"
  },
  {
    id: 'data-use',
    title: '5. How We Utilize Your Information',
    content: (
      <>
        <p>We process the data we collect under the legal basis of fulfilling our contractual obligations to you. We use your data exclusively to:</p>
        <ul>
          <li><strong>Operate the Service:</strong> Route messages, synchronize your Pads to the cloud, and render the user interface within the GitHub DOM.</li>
          <li><strong>Enforce Security:</strong> Authenticate your identity via GitHub and prevent unauthorized access to your chat history.</li>
          <li><strong>Process Subscriptions:</strong> Validate webhook payloads from our payment processor to automatically upgrade or downgrade your Pro tier status.</li>
          <li><strong>Provide Support:</strong> Investigate bug reports and respond to technical inquiries initiated by you.</li>
        </ul>
      </>
    ),
    rawText: "Utilize Information legal basis contractual obligations Route messages synchronize Pads GitHub DOM Enforce Security Authenticate identity Process Subscriptions webhook payloads payment processor Pro tier Support bug reports technical inquiries"
  },
  {
    id: 'security-rls',
    title: '6. Infrastructure Security & Row Level Security (RLS)',
    content: (
      <>
        <p>
          We implement rigorous, enterprise-grade security protocols. All data in transit between your browser and our servers is encrypted using standard TLS/SSL cryptographic protocols. All data at rest within our databases is encrypted at the volume level.
        </p>
        <p>
          At the application layer, we utilize strict <strong>Row Level Security (RLS)</strong> policies enforced directly at the PostgreSQL database level. This means that access control is deeply embedded in the database schema itself. Cryptographic policies guarantee that an authenticated user can only query, read, or modify database rows (messages, notes, friend requests) that explicitly belong to their authenticated `auth.uid()`. It is mathematically impossible for a user to query another user's private data through our APIs.
        </p>
      </>
    ),
    rawText: "Infrastructure Security Row Level Security RLS enterprise-grade TLS SSL cryptographic protocols encrypted at rest PostgreSQL database schema access control auth.uid private data APIs"
  },
  {
    id: 'subprocessors',
    title: '7. Third-Party Subprocessors & Data Sharing',
    content: (
      <>
        <p>
          We absolutely do not sell your personal data. We only share data with essential third-party infrastructure providers (subprocessors) necessary to run RepoChat. These include:
        </p>
        <ul>
          <li><strong>Supabase:</strong> Our core backend infrastructure provider. They host our PostgreSQL databases, manage WebSocket edge functions, and securely store your chat histories.</li>
          <li><strong>GitHub:</strong> We interface with their API to facilitate OAuth login and fetch public repository context.</li>
          <li><strong>Dodo Payments:</strong> Our merchant of record. If you purchase a Pro subscription, your credit card and billing details are processed securely by Dodo. RepoChat's servers never touch, process, or store your raw financial data; we only receive secure webhook events confirming subscription status.</li>
        </ul>
        <p>We may also disclose data if compelled by a legally binding court order or subpoena originating from a recognized governmental authority.</p>
      </>
    ),
    rawText: "Third-Party Subprocessors Data Sharing infrastructure providers Supabase backend PostgreSQL WebSocket edge functions GitHub OAuth Dodo Payments merchant of record Pro subscription credit card billing details webhook events court order subpoena governmental authority"
  },
  {
    id: 'retention',
    title: '8. Data Retention & Cryptographic Deletion',
    content: (
      <>
        <p>
          We retain your profile metadata and communication history only for as long as your account remains active. If you initiate an account deletion request, your primary database records—including private messages, pads, and lists—are immediately subjected to a hard cryptographic delete command. 
        </p>
        <p>
          Please note that messages you have contributed to public repository group chats may be anonymized rather than deleted, ensuring that the conversational context is not destroyed for remaining participants. Database backups are immutable and are automatically purged on a rolling 30-day schedule. Therefore, it may take up to 30 days for your deleted data to be entirely eradicated from all encrypted backup media.
        </p>
      </>
    ),
    rawText: "Data Retention Cryptographic Deletion profile metadata communication history account deletion request hard cryptographic delete public repository group chats anonymized conversational context Database backups immutable 30-day schedule eradicated encrypted backup media"
  },
  {
    id: 'international',
    title: '9. International Data Transfers',
    content: (
      <>
        <p>
          RepoChat utilizes cloud infrastructure distributed across multiple global regions to ensure low-latency WebSocket connections. Consequently, your data may be routed, processed, and stored in jurisdictions outside your country of residence, including the United States. 
        </p>
        <p>
          By utilizing the Services, you explicitly consent to the transfer of your data across international borders. We ensure that our subprocessors adhere to stringent international data protection frameworks, including the execution of Standard Contractual Clauses (SCCs), to safeguard your privacy rights regardless of the geographic location of the servers.
        </p>
      </>
    ),
    rawText: "International Data Transfers cloud infrastructure global regions low-latency WebSocket United States international borders subprocessors Standard Contractual Clauses SCCs privacy rights geographic location"
  },
  {
    id: 'rights',
    title: '10. Your Global Privacy Rights',
    content: (
      <>
        <p>We believe privacy is a fundamental human right. Regardless of whether you reside in a jurisdiction governed by the GDPR, CCPA, or other regional laws, we extend the following rights to all RepoChat users:</p>
        <ul>
          <li><strong>The Right to Access:</strong> You may request a comprehensive export of all data tied to your GitHub ID.</li>
          <li><strong>The Right to Erasure:</strong> You may request the total deletion of your account and associated data.</li>
          <li><strong>The Right to Rectification:</strong> You may correct inaccurate profile data directly through the GitHub integration.</li>
        </ul>
        <p>To exercise any of these rights, please contact our administrative team. We commit to fulfilling verifiable data requests within 30 calendar days.</p>
      </>
    ),
    rawText: "Global Privacy Rights human right GDPR CCPA Right to Access export data GitHub ID Right to Erasure total deletion Right to Rectification correct profile data verifiable data requests 30 calendar days"
  },
  {
    id: 'changes',
    title: '11. Modifications to This Policy',
    content: (
      <>
        <p>
          As RepoChat evolves, our data processing practices may change. We reserve the right to update this Privacy Policy at any time. Material changes to our data collection architecture will be communicated via in-app notifications or via an update to the "Effective Date" at the top of this document. Continued use of the extension after the effective date of an updated policy constitutes your legally binding acceptance of the revised terms.
        </p>
      </>
    ),
    rawText: "Modifications Policy data processing practices update Privacy Policy Material changes collection architecture in-app notifications Effective Date binding acceptance revised terms"
  },
  {
    id: 'contact',
    title: '12. Legal Contact Information',
    content: (
      <>
        <p>
          If you are a security researcher, a privacy advocate, or a user with specific concerns regarding how your data is handled within the RepoChat ecosystem, you are encouraged to contact our privacy team directly:
        </p>
        <p>
          <strong>Data Privacy Officer / Support:</strong> <a href="mailto:alexcj10@yahoo.com">alexcj10@yahoo.com</a>
        </p>
      </>
    ),
    rawText: "Legal Contact Information security researcher privacy advocate Data Privacy Officer Support alexcj10@yahoo.com"
  }
];

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('about');
  const [searchQuery, setSearchQuery] = useState('');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return SECTIONS;
    const query = searchQuery.toLowerCase();
    return SECTIONS.filter(section => 
      section.title.toLowerCase().includes(query) || 
      section.rawText.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  useEffect(() => {
    // Auto-scroll the sidebar so the active link is always visible
    const activeLink = document.querySelector('.legal-sidebar-link.active');
    if (activeLink) {
      activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeSection]);

  useEffect(() => {
    if (searchQuery) return; // Disable scroll tracking when searching
    
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight
      );
      
      // Highly robust check for reaching the footer
      const isAtBottom = scrollY + innerHeight >= scrollHeight - 300;
      
      if (isAtBottom) {
        setActiveSection(SECTIONS[SECTIONS.length - 1].id);
        return;
      }

      const sections = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200; // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return (
    <div className="legal-layout">
      {/* Sidebar Navigation */}
      <aside className="legal-sidebar">
        
        {/* Search Bar */}
        <div className="legal-search-container" style={{ marginBottom: 16 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 8,
            padding: '8px 12px',
            gap: 8,
            transition: 'border-color 0.2s ease',
          }}
          className="search-input-wrapper">
            <Search size={14} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search Policy..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                width: '100%'
              }}
            />
          </div>
        </div>

        <div className="legal-sidebar-links" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredSections.length === 0 ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '8px 12px' }}>
              No sections found.
            </div>
          ) : (
            filteredSections.map((section) => (
              <div
                key={section.id}
                className={`legal-sidebar-link ${activeSection === section.id && !searchQuery ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="legal-content">
        <h1>Privacy Policy</h1>
        
        <div className="legal-meta">
          <span>Effective Date: May 9, 2026</span>
          <span>Last Updated: May 9, 2026</span>
        </div>

        {filteredSections.length === 0 ? (
          <div className="legal-no-results" style={{
            padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Search size={32} color="var(--text-muted)" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>No results found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>We couldn't find anything matching "{searchQuery}".</p>
          </div>
        ) : (
          filteredSections.map(section => (
            <section key={section.id} id={section.id} className="legal-section">
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))
        )}
      </main>
    </div>
  );
}
