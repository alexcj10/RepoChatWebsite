import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'about', title: '1. About RepoChat' },
  { id: 'applicability', title: '2. Applicability' },
  { id: 'information-we-collect', title: '3. Information We Collect' },
  { id: 'how-we-use', title: '4. How We Use Information' },
  { id: 'how-we-retain', title: '5. How We Retain Information' },
  { id: 'how-we-disclose', title: '6. How We Disclose Information' },
  { id: 'security', title: '7. How We Secure Information' },
  { id: 'third-party', title: '8. Third-Party Services' },
  { id: 'international', title: '9. International Data Transfers' },
  { id: 'your-rights', title: '10. Your Privacy Rights' },
  { id: 'children', title: '11. Children\'s Privacy' },
  { id: 'changes', title: '12. Changes to This Policy' },
  { id: 'contact', title: '13. Contact Us' },
];

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="legal-layout">
      {/* Sidebar Navigation */}
      <aside className="legal-sidebar">
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            className={`legal-sidebar-link ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
          >
            {section.title}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="legal-content">
        <h1>Privacy Policy</h1>
        
        <div className="legal-meta">
          <span>Effective Date: May 9, 2026</span>
          <span>Last Updated: May 9, 2026</span>
        </div>

        <section id="about" className="legal-section">
          <h2>1. About RepoChat</h2>
          <p>
            RepoChat ("we", "us", "our") provides a browser extension and platform designed to bring 
            real-time communication and collaboration directly into GitHub repositories. Our services 
            include direct messaging, group chats, shared context, and integrations (collectively, the "Services").
          </p>
          <p>
            At RepoChat, we respect your privacy. This Privacy Policy explains our practices regarding 
            the collection, use, disclosure, and processing of your personal information when you use 
            our Services or visit our website.
          </p>
        </section>

        <section id="applicability" className="legal-section">
          <h2>2. Applicability</h2>
          <p>
            This Privacy Policy applies to the personal information we collect when you:
          </p>
          <ul>
            <li>Visit our website (repoch.at) or any affiliated web properties.</li>
            <li>Install and use the RepoChat browser extension.</li>
            <li>Interact with our APIs, servers, and related services.</li>
            <li>Communicate with our support or sales teams.</li>
          </ul>
          <p>
            This policy does not apply to third-party services that integrate with RepoChat (including GitHub), 
            whose privacy practices are governed by their own policies.
          </p>
        </section>

        <section id="information-we-collect" className="legal-section">
          <h2>3. Information We Collect</h2>
          
          <h3>Information You Provide Directly</h3>
          <ul>
            <li><strong>Account Information:</strong> When you authenticate via GitHub OAuth, we collect your GitHub user ID, username, display name, avatar URL, and an OAuth access token. We never receive or store your GitHub password.</li>
            <li><strong>Communication Data:</strong> We store the messages, links, reactions, and notes you send through the Services to ensure they are delivered and synchronized across your devices.</li>
            <li><strong>Support Inquiries:</strong> If you contact us for support, we collect the content of your messages, email address, and any technical information you choose to provide.</li>
          </ul>

          <h3>Information We Collect Automatically</h3>
          <ul>
            <li><strong>Usage Information:</strong> We collect aggregated, non-identifying telemetry data regarding how you interact with the extension (e.g., feature usage frequency, theme preferences).</li>
            <li><strong>Device and Log Data:</strong> Like most online services, we collect standard log data including IP addresses, browser types, operating systems, and timestamps to ensure security and prevent abuse.</li>
            <li><strong>Cookies and Local Storage:</strong> We use local storage purely for functional purposes (such as maintaining your active session and caching offline data). We do not use tracking or advertising cookies.</li>
          </ul>
        </section>

        <section id="how-we-use" className="legal-section">
          <h2>4. How We Use Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li><strong>Service Delivery:</strong> To operate, maintain, and provide the core functionalities of RepoChat, including message routing and synchronization.</li>
            <li><strong>Authentication:</strong> To securely verify your identity via GitHub and manage your session.</li>
            <li><strong>Improvement:</strong> To analyze performance metrics and improve the reliability and user experience of our applications.</li>
            <li><strong>Security:</strong> To detect, investigate, and prevent unauthorized access, abuse, and other technical or security issues.</li>
            <li><strong>Communication:</strong> To send important administrative notices, security alerts, and support responses.</li>
          </ul>
        </section>

        <section id="how-we-retain" className="legal-section">
          <h2>5. How We Retain Information</h2>
          <p>
            We retain your personal information only for as long as your account is active or as necessary 
            to fulfill the purposes outlined in this Privacy Policy.
          </p>
          <p>
            If you request account deletion, your profile data, private notes, and authentication tokens 
            are immediately permanently deleted from our primary databases. Messages sent in group channels 
            may be anonymized and retained to preserve conversation continuity for other users. Backups 
            are purged on a rolling 30-day schedule.
          </p>
        </section>

        <section id="how-we-disclose" className="legal-section">
          <h2>6. How We Disclose Information</h2>
          <p>We do not sell your personal information. We only disclose information under the following circumstances:</p>
          <ul>
            <li><strong>Other Users:</strong> Your username, avatar, and online status are visible to other RepoChat users you interact with. Your messages are visible to the intended recipients.</li>
            <li><strong>Service Providers:</strong> We use trusted third-party services for infrastructure hosting (e.g., Supabase) and payment processing (e.g., Dodo Payments). These providers are bound by strict data processing agreements.</li>
            <li><strong>Legal Compliance:</strong> We may disclose information if legally required to do so to comply with applicable laws, legal processes, or governmental requests, or to protect our rights and the safety of our users.</li>
            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction, subject to the same privacy commitments.</li>
          </ul>
        </section>

        <section id="security" className="legal-section">
          <h2>7. How We Secure Information</h2>
          <p>
            We implement robust administrative, technical, and physical safeguards designed to protect 
            your data. All data is encrypted in transit using TLS/SSL and encrypted at rest in our databases.
          </p>
          <p>
            We utilize strict Row Level Security (RLS) policies within our database infrastructure, 
            ensuring that users can strictly access only their own data or data explicitly shared with them. 
            While we strive to use commercially acceptable means to protect your information, no method 
            of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section id="third-party" className="legal-section">
          <h2>8. Third-Party Services</h2>
          <p>
            RepoChat relies on third-party infrastructure to operate reliably. Our key subprocessors include:
          </p>
          <ul>
            <li><strong>Supabase:</strong> For PostgreSQL database hosting, authentication, and real-time WebSocket infrastructure.</li>
            <li><strong>GitHub:</strong> For OAuth authentication and contextual repository metadata.</li>
            <li><strong>Dodo Payments:</strong> For secure processing of premium subscriptions. (RepoChat does not directly handle or store credit card numbers).</li>
          </ul>
        </section>

        <section id="international" className="legal-section">
          <h2>9. International Data Transfers</h2>
          <p>
            RepoChat is operated globally. Your personal information may be transferred to, and processed in, 
            countries other than the country in which you are resident. These countries may have data 
            protection laws that are different from the laws of your country.
          </p>
          <p>
            When we transfer data internationally, we ensure appropriate safeguards are in place, such as 
            Standard Contractual Clauses, to protect your information in accordance with this Privacy Policy.
          </p>
        </section>

        <section id="your-rights" className="legal-section">
          <h2>10. Your Privacy Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access:</strong> The right to request copies of your personal information.</li>
            <li><strong>Rectification:</strong> The right to request correction of inaccurate information.</li>
            <li><strong>Erasure:</strong> The right to request the deletion of your personal data ("Right to be Forgotten").</li>
            <li><strong>Restriction:</strong> The right to request that we restrict the processing of your data.</li>
            <li><strong>Data Portability:</strong> The right to receive your data in a structured, machine-readable format.</li>
          </ul>
          <p>
            You can exercise these rights by managing your settings directly within the RepoChat extension 
            or by contacting us directly.
          </p>
        </section>

        <section id="children" className="legal-section">
          <h2>11. Children's Privacy</h2>
          <p>
            Our Services are not directed to, and we do not knowingly collect personal information from, 
            children under the age of 16. If we become aware that we have inadvertently received personal 
            information from a child under the age of 16, we will delete such information from our records.
          </p>
        </section>

        <section id="changes" className="legal-section">
          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or 
            relevant laws. We will notify you of any material changes by posting the updated policy on 
            this page and updating the "Last Updated" date. Continued use of our Services after changes 
            take effect constitutes your acceptance of the revised policy.
          </p>
        </section>

        <section id="contact" className="legal-section">
          <h2>13. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
            practices, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:alexcj10@yahoo.com">alexcj10@yahoo.com</a>
          </p>
        </section>
      </main>
    </div>
  );
}
