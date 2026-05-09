import { useEffect, useState, useMemo, useRef } from 'react';

import { Search } from 'lucide-react';

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms & Scope',
    content: (
      <>
        <p>
          By downloading, installing, accessing, or using the RepoChat browser extension, the Repochat.at web property, our backend APIs hosted on Supabase, or any other affiliated services (collectively referred to as the "Service"), you acknowledge that you have read, completely understood, and irrevocably agree to be bound by these detailed Terms of Service ("Terms"). These Terms form a legally binding contract between you (the "User") and the operators of RepoChat ("we", "us", "our").
        </p>
        <p>
          If you are entering into these Terms on behalf of an enterprise, corporation, educational institution, or other legal entity, you represent and warrant that you possess the requisite legal authority to bind such entity to these Terms. If you do not agree to every single provision set forth in this document, or if you lack the authority to accept them, you are expressly prohibited from utilizing the Service and must immediately uninstall the extension and cease all access.
        </p>
      </>
    ),
    rawText: "By downloading installing accessing RepoChat browser extension Repochat.at web property backend APIs Supabase Service legally binding contract enterprise corporation educational institution"
  },
  {
    id: 'service',
    title: '2. Description of the RepoChat Platform',
    content: (
      <>
        <p>
          RepoChat operates as an advanced, developer-centric communication layer built as a browser extension designed to embed real-time chat, collaborative environments, and productivity tooling natively within the GitHub DOM structure. The architecture of the Service relies on a PostgreSQL database infrastructure with WebSocket capabilities, provided by Supabase, to facilitate sub-second message delivery.
        </p>
        <p>
          The functionalities provided include, but are not strictly limited to: real-time direct messaging between authenticated users, contextual group chat instances intrinsically linked to specific GitHub repositories (`github_full_name`), localized and cloud-synchronized data artifacts (such as "Pads" and custom task lists), and real-time online status broadcasting. We expressly reserve the right to deploy updates, alter the user interface, impose technical limitations, or permanently discontinue any specific functionality of the Service at our sole discretion, without incurring any liability to you or any third party.
        </p>
      </>
    ),
    rawText: "developer-centric communication browser extension GitHub DOM PostgreSQL database WebSocket Supabase real-time direct messaging group chat repositories github_full_name Pads task lists status broadcasting"
  },
  {
    id: 'registration',
    title: '3. Authentication & Account Security',
    content: (
      <>
        <p>
          RepoChat employs a passwordless authentication model. Access to the Service is granted exclusively via the GitHub OAuth 2.0 protocol. By initiating the authentication flow, you authorize RepoChat to request, retrieve, and store specific programmatic metadata from the GitHub API—specifically your GitHub user ID, username, display name, public avatar URL, and an access token utilized strictly for authenticated proxy requests.
        </p>
        <p>
          You acknowledge and agree that RepoChat never requests, receives, or stores your GitHub password. Consequently, the security of your RepoChat account is entirely contingent upon the security of your underlying GitHub credentials. You are solely responsible for maintaining the confidentiality of your GitHub account, implementing multi-factor authentication (MFA) on GitHub where appropriate, and bearing the full risk of all activities that occur under your session. You agree to notify us immediately via our designated support channels if you suspect any unauthorized access or exfiltration of your session tokens.
        </p>
      </>
    ),
    rawText: "passwordless authentication GitHub OAuth 2.0 protocol user ID username access token proxy requests never requests GitHub password multi-factor MFA security credentials unauthorized access"
  },
  {
    id: 'plans',
    title: '4. Service Tiers, Subscriptions & Billing',
    content: (
      <>
        <h3>4.1 The Free Tier</h3>
        <p>
          RepoChat offers a baseline "Free" tier explicitly designed for individual developers evaluating the platform or managing small-scale collaboration. Users on the Free tier are granted access to core messaging functionalities; however, their usage is strictly bounded by algorithmic rate limits and hard quotas concerning the maximum number of friend connections, concurrent group chat memberships, stored Pad entries, custom list creations, and message pinning/starring capacities. Data for Free tier users may rely more heavily on browser local storage caching and is subject to aggressive retention purging to maintain optimal database performance.
        </p>
        <h3>4.2 The Pro Tier</h3>
        <p>
          Users requiring enterprise-grade capacity may upgrade to the "Pro" tier via a recurring subscription. The Pro tier provides effectively unlimited access to core collaborative features, bypassing the programmatic limitations imposed on Free tier accounts. Pro accounts benefit from prioritized, continuous cloud data synchronization directly to our Supabase clusters, ensuring multi-device continuity without relying on localized browser caches.
        </p>
        <h3>4.3 Billing Logistics & Dodo Payments Integration</h3>
        <p>
          All financial transactions, subscription management, and credit card processing for RepoChat are outsourced to our merchant of record, Dodo Payments. RepoChat's backend architecture (via Supabase Edge Functions such as the `dodo-webhook`) securely communicates with Dodo Payments to provision or revoke Pro access based on webhook events. You agree to provide accurate billing information to Dodo Payments and authorize them to charge your provided payment method on a recurring monthly basis. You may unilaterally cancel your subscription at any time; however, unless explicitly mandated by regional consumer protection laws, RepoChat does not issue prorated refunds for partial months of service.
        </p>
      </>
    ),
    rawText: "Free Tier rate limits quotas friend connections group memberships Pad entries pinned messages local storage caching Pro Tier subscription unlimited access cloud data synchronization Dodo Payments webhook billing refunds"
  },
  {
    id: 'acceptable-use',
    title: '5. Acceptable Use Policy',
    content: (
      <>
        <p>
          The RepoChat infrastructure is engineered exclusively to facilitate legitimate software development collaboration and technical discourse. By accessing the Service, you legally bind yourself to use the platform in strict compliance with all applicable local, national, and international statutes.
        </p>
        <p>
          You are strictly and unequivocally prohibited from utilizing RepoChat to: (a) disseminate unsolicited promotional content, phishing vectors, or spam; (b) distribute malicious payloads, ransomware, trojans, or obfuscated code designed to exploit browser vulnerabilities; (c) engage in targeted harassment, hate speech, doxxing, or the transmission of grossly offensive material; (d) execute SQL injection attempts, brute-force attacks, or otherwise attempt to bypass the Row Level Security (RLS) policies implemented on our PostgreSQL database; (e) impersonate RepoChat engineers, GitHub administrative personnel, or any other legal entity; and (f) deploy automated scraping bots or headless browsers to mass-extract user metadata or message histories. Violation of these parameters will result in immediate, unappealable account termination and potential reporting to relevant cybersecurity authorities.
        </p>
      </>
    ),
    rawText: "Acceptable Use Policy software development spam phishing ransomware trojans harassment hate speech SQL injection Row Level Security RLS scraping bots account termination"
  },
  {
    id: 'data-ownership',
    title: '6. User Data, Telemetry & License',
    content: (
      <>
        <p>
          You, the User, retain total and unencumbered intellectual property ownership of all original text, code snippets, diagnostic notes, and multimedia content that you voluntarily transmit through the RepoChat interface. We assert no ownership rights over your proprietary communications.
        </p>
        <p>
          Notwithstanding the foregoing, in order for the Service to technically function—including routing messages via WebSockets, storing historical logs in our databases, and rendering content across multiple client instances—you must grant us a license. By using RepoChat, you grant us a worldwide, royalty-free, fully paid-up, non-exclusive, sublicensable, and transferable license to host, cache, route, display, and process your content strictly for the operational purpose of delivering the Service to you and your intended recipients.
        </p>
      </>
    ),
    rawText: "intellectual property ownership code snippets messages license worldwide royalty-free non-exclusive WebSockets historical logs"
  },
  {
    id: 'intellectual-property',
    title: '7. Intellectual Property Rights',
    content: (
      <>
        <p>
          The entire structural architecture of RepoChat, including the compiled extension binaries, React frontend components, Supabase edge functions, SQL schema definitions, API endpoints, branding assets, logos, and UI/UX paradigms, are the exclusive intellectual property of the RepoChat operators, protected under international copyright, trademark, and trade secret laws.
        </p>
        <p>
          Subject to your compliance with these Terms, RepoChat grants you a limited, non-exclusive, non-transferable, revocable license to download and install the extension strictly for your personal or internal business collaboration purposes. You are expressly prohibited from reverse-engineering, decompiling, mirroring, framing, or creating derivative competitive works based upon any part of the RepoChat software without explicit, executed written authorization from our executive team.
        </p>
      </>
    ),
    rawText: "Intellectual Property Rights architecture extension binaries React frontend Supabase edge functions reverse-engineering decompiling derivative works copyright trademark"
  },
  {
    id: 'third-party',
    title: '8. Third-Party Integrations & APIs',
    content: (
      <>
        <p>
          RepoChat's functionality is intrinsically dependent upon the structural integrity and continued availability of third-party platforms—primarily GitHub (a subsidiary of Microsoft Corporation) and Supabase. The extension injects UI components directly into the GitHub DOM and proxies requests (e.g., repository fetching, user searches) to the GitHub REST API.
        </p>
        <p>
          You acknowledge that RepoChat has no control over these third-party platforms. If GitHub fundamentally alters its DOM structure, enforces stricter Content Security Policies (CSP), aggressively limits API rate limits, or revokes our OAuth application privileges, RepoChat may suffer degraded performance or total operational failure. We disclaim all liability for service interruptions directly caused by upstream changes implemented by our third-party infrastructure providers.
        </p>
      </>
    ),
    rawText: "Third-Party Integrations GitHub Microsoft Supabase DOM injection REST API Content Security Policies CSP rate limits service interruptions upstream changes"
  },
  {
    id: 'termination',
    title: '9. Suspension and Termination of Access',
    content: (
      <>
        <p>
          We maintain the absolute right, acting at our sole and unreviewable discretion, to temporarily suspend, restrict, or permanently terminate your access to the RepoChat backend infrastructure without prior notice, explanation, or financial liability. Grounds for immediate termination include, but are not limited to, verifiable breaches of our Acceptable Use Policy, non-payment of Pro subscription invoices, or prolonged account inactivity resulting in orphaned database records.
        </p>
        <p>
          If you wish to terminate this agreement voluntarily, you may do so instantly by uninstalling the RepoChat extension, navigating to your GitHub Developer Settings to permanently revoke our OAuth access, and ceasing all interaction with our APIs. Upon the execution of account termination, your localized browser data will be purged, and your database records will be handled in strict accordance with the cryptographic deletion protocols outlined in our Privacy Policy.
        </p>
      </>
    ),
    rawText: "Suspension Termination unreviewable discretion breaches Acceptable Use non-payment inactivity revoke OAuth access cryptographic deletion Privacy Policy"
  },
  {
    id: 'disclaimers',
    title: '10. Disclaimer of Warranties',
    content: (
      <>
        <p>
          THE REPOCHAT SERVICE IS DEPLOYED AND PROVIDED TO YOU STRICTLY ON AN "AS IS," "WHERE IS," AND "AS AVAILABLE" BASIS, WITH ALL INHERENT FAULTS AND WITHOUT ANY WARRANTY OF ANY KIND. TO THE ABSOLUTE MAXIMUM EXTENT PERMITTED BY APPLICABLE JURISPRUDENCE, REPOCHAT AND ITS LICENSORS EXPRESSLY AND CATEGORICALLY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
        </p>
        <p>
          THIS DISCLAIMER INCLUDES, BUT IS NOT LIMITED TO, ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR AND SPECIFIC PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL OPERATE IN AN UNINTERRUPTED MANNER, THAT IT WILL BE COMPLETELY IMPERVIOUS TO CYBERATTACKS, THAT MESSAGES WILL NEVER SUFFER TRANSIT DROPS, OR THAT ANY DEFECTS IN THE EXTENSION CODEBASE WILL BE RECTIFIED WITHIN A SPECIFIC TIMEFRAME. YOU USE REPOCHAT AT YOUR OWN VOLITION AND RISK.
        </p>
      </>
    ),
    rawText: "Disclaimer Warranties AS IS AS AVAILABLE MERCHANTABILITY FITNESS NON-INFRINGEMENT CYBERATTACKS defects risk"
  },
  {
    id: 'limitation-of-liability',
    title: '11. Limitation of Liability',
    content: (
      <>
        <p>
          IN NO EVENT SHALL REPOCHAT, ITS FOUNDERS, ENGINEERS, DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE HELD LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES WHATSOEVER.
        </p>
        <p>
          SUCH DISCLAIMED DAMAGES INCLUDE, WITHOUT LIMITATION, MONETARY LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF BUSINESS OPPORTUNITIES, CATASTROPHIC DATA CORRUPTION, SEVERE DAMAGE TO GOODWILL, OR OTHER INTANGIBLE LOSSES, REGARDLESS OF WHETHER SUCH LOSSES RESULT FROM (I) YOUR ACCESS TO, USE OF, OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT, TRANSMISSION, OR CONTENT OF ANY THIRD PARTY UTILIZING THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; OR (IV) UNAUTHORIZED ACCESS, MANIPULATION, OR ALTERATION OF YOUR TRANSMISSIONS, DATABASES, OR CONTENT, EVEN IF WE HAVE BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN JURISDICTIONS THAT PROHIBIT THE EXCLUSION OF CERTAIN LIABILITIES, OUR TOTAL AGGREGATE LIABILITY SHALL BE STRICTLY LIMITED TO THE GREATER OF ONE HUNDRED US DOLLARS ($100.00 USD) OR THE EXACT AMOUNT YOU HAVE PAID TO US IN THE PAST SIX MONTHS FOR A PRO SUBSCRIPTION.
        </p>
      </>
    ),
    rawText: "Limitation Liability INDIRECT INCIDENTAL SPECIAL CONSEQUENTIAL DAMAGES PROFITS REVENUE DATA CORRUPTION AGGREGATE LIABILITY $100.00 USD"
  },
  {
    id: 'indemnification',
    title: '12. Indemnification',
    content: (
      <>
        <p>
          You agree to aggressively defend, indemnify, and hold completely harmless RepoChat, its licensee and licensors, and their respective employees, contractors, agents, officers, and directors, from and against any and all multifaceted claims, damages, obligations, catastrophic losses, liabilities, costs or debt, and expenses (including but not limited to exhaustive attorney's fees and litigation costs), resulting directly or indirectly from: (a) your use and access of the Service, utilizing your authenticated GitHub session; (b) a verified breach of any specific clause within these Terms; or (c) your violation of any third-party right, including without limitation any copyright, property, or privacy right relating to the code or text you transmit through our architecture.
        </p>
      </>
    ),
    rawText: "Indemnification defend harmless attorney fees litigation costs breach copyright property privacy right"
  },
  {
    id: 'changes',
    title: '13. Modifications to the Service and Terms',
    content: (
      <>
        <p>
          The software landscape is highly volatile. Therefore, we reserve the right, at our sole and unchallengeable discretion, to modify, replace, or append new clauses to these Terms at any given time. If a revision is deemed materially significant, we will make a commercially reasonable effort to provide a minimum of thirty (30) days' notice prior to any new terms taking effect, utilizing in-app broadcasts or direct email notification. 
        </p>
        <p>
          The definition of a "material change" will be determined exclusively by our legal counsel. By continuing to access or use our Service after those revisions have been fully deployed and become effective, you explicitly signal your agreement to be legally bound by the newly revised terms.
        </p>
      </>
    ),
    rawText: "Modifications Service Terms thirty 30 days notice material change legally bound revised terms"
  },
  {
    id: 'governing-law',
    title: '14. Governing Law and Dispute Resolution',
    content: (
      <>
        <p>
          These Terms, and any non-contractual obligations arising out of or in connection with them, shall be governed by, and construed in accordance with, the laws of the Republic of India, expressly excluding the application of its conflict of law principles and the United Nations Convention on Contracts for the International Sale of Goods.
        </p>
        <p>
          Any dispute, controversy, or legal claim arising out of or relating to these Terms, including the validity, invalidity, breach, or termination thereof, shall be exclusively resolved through binding arbitration or by the competent courts located within India. Our failure to aggressively enforce any specific right or provision of these Terms will absolutely not be considered a waiver of those rights in the future.
        </p>
      </>
    ),
    rawText: "Governing Law Dispute Resolution Republic of India conflict of law arbitration courts waiver rights"
  },
  {
    id: 'contact',
    title: '15. Contact Information',
    content: (
      <>
        <p>
          If you require clarification, have substantive legal concerns, or wish to formally serve notice regarding these Terms of Service, you are instructed to contact our administrative team directly via the following channel:
        </p>
        <p>
          <strong>Official Legal Correspondence:</strong> <a href="mailto:alexcj10@yahoo.com">alexcj10@yahoo.com</a>
        </p>
      </>
    ),
    rawText: "Contact Information email legal correspondence alexcj10@yahoo.com"
  }
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState('acceptance');
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
              placeholder="Search Terms..." 
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
        <h1>Terms of Service</h1>
        
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
