import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'service', title: '2. Description of Service' },
  { id: 'registration', title: '3. Account Registration' },
  { id: 'plans', title: '4. Free and Pro Plans' },
  { id: 'acceptable-use', title: '5. Acceptable Use' },
  { id: 'ownership', title: '6. Content Ownership' },
  { id: 'intellectual-property', title: '7. Intellectual Property' },
  { id: 'privacy', title: '8. Privacy' },
  { id: 'termination', title: '9. Termination' },
  { id: 'disclaimers', title: '10. Disclaimers' },
  { id: 'limitation-of-liability', title: '11. Limitation of Liability' },
  { id: 'indemnification', title: '12. Indemnification' },
  { id: 'changes', title: '13. Changes to Terms' },
  { id: 'governing-law', title: '14. Governing Law' },
  { id: 'contact', title: '15. Contact' },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState('acceptance');

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
        <h1>Terms of Service</h1>
        
        <div className="legal-meta">
          <span>Effective Date: May 9, 2026</span>
          <span>Last Updated: May 9, 2026</span>
        </div>

        <section id="acceptance" className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By installing, accessing, or using RepoChat, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, do not use the service.
          </p>
        </section>

        <section id="service" className="legal-section">
          <h2>2. Description of Service</h2>
          <p>
            RepoChat is a Chrome extension that provides real-time messaging, collaboration, and productivity tools directly within the GitHub website. The service includes direct messaging, group chats, GitHub context sharing, issue triage, notes, and other features as described on our website.
          </p>
        </section>

        <section id="registration" className="legal-section">
          <h2>3. Account Registration</h2>
          <p>To use RepoChat, you must sign in with a valid GitHub account. You are responsible for:</p>
          <ul>
            <li>Maintaining the security of your GitHub account</li>
            <li>All activities that occur through your RepoChat account</li>
            <li>Providing accurate and complete information</li>
          </ul>
        </section>

        <section id="plans" className="legal-section">
          <h2>4. Free and Pro Plans</h2>
          
          <h3>4.1 Free Plan</h3>
          <p>
            The Free plan provides limited access to RepoChat features, including up to 15 friends, 5 groups, 10 pad entries, 3 custom lists, 5 pinned messages, and 50 starred messages. Free plan data is stored locally in your browser.
          </p>

          <h3>4.2 Pro Plan</h3>
          <p>
            The Pro plan ($4.99/month) provides unlimited access to all features with continuous cloud data synchronization. Payment is processed securely through Dodo Payments.
          </p>

          <h3>4.3 Billing</h3>
          <ul>
            <li>Pro subscriptions are billed monthly</li>
            <li>You may cancel your subscription at any time</li>
            <li>Upon cancellation, your Pro features remain active until the end of the current billing period</li>
            <li>Refunds are available for the current billing period if requested within 7 days of charge</li>
          </ul>
        </section>

        <section id="acceptable-use" className="legal-section">
          <h2>5. Acceptable Use</h2>
          <p>You agree not to use RepoChat to:</p>
          <ul>
            <li>Send spam, unsolicited messages, or harassing content</li>
            <li>Distribute malware, viruses, or harmful code</li>
            <li>Impersonate other users or entities</li>
            <li>Attempt to access other users' data or accounts</li>
            <li>Circumvent or disable security features</li>
            <li>Use the service for any illegal purpose</li>
            <li>Abuse rate limits or overload the service intentionally</li>
            <li>Scrape, data-mine, or reverse engineer the service</li>
          </ul>
        </section>

        <section id="ownership" className="legal-section">
          <h2>6. Content Ownership</h2>
          <p>
            You retain ownership of all content you create through RepoChat, including messages, notes, and custom lists. By using the service, you grant us a limited license to store, transmit, and display your content solely for the purpose of providing the service.
          </p>
        </section>

        <section id="intellectual-property" className="legal-section">
          <h2>7. Intellectual Property</h2>
          <p>
            The RepoChat name, logo, design, and underlying code are the intellectual property of RepoChat. You may not copy, modify, distribute, or create derivative works without our written permission.
          </p>
        </section>

        <section id="privacy" className="legal-section">
          <h2>8. Privacy</h2>
          <p>
            Your use of RepoChat is also governed by our <Link to="/privacy">Privacy Policy</Link>, which describes how we collect, use, and protect your data.
          </p>
        </section>

        <section id="termination" className="legal-section">
          <h2>9. Termination</h2>
          <p>We reserve the right to suspend or terminate your account if you:</p>
          <ul>
            <li>Violate these Terms of Service</li>
            <li>Engage in abusive or harmful behavior</li>
            <li>Fail to pay for Pro subscription services</li>
          </ul>
          <p>
            You may terminate your account at any time by contacting us. Upon termination, your data will be handled as described in our Privacy Policy.
          </p>
        </section>

        <section id="disclaimers" className="legal-section">
          <h2>10. Disclaimers</h2>
          <p>
            RepoChat is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee:
          </p>
          <ul>
            <li>Uninterrupted or error-free service</li>
            <li>That the service will meet all your requirements</li>
            <li>The accuracy or reliability of any content</li>
          </ul>
        </section>

        <section id="limitation-of-liability" className="legal-section">
          <h2>11. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, RepoChat shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, profits, or business opportunities, arising from your use of the service.
          </p>
        </section>

        <section id="indemnification" className="legal-section">
          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless RepoChat from any claims, damages, or expenses arising from your violation of these Terms or your use of the service.
          </p>
        </section>

        <section id="changes" className="legal-section">
          <h2>13. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of RepoChat after changes constitutes acceptance of the updated Terms. We will notify users of material changes via the extension or email.
          </p>
        </section>

        <section id="governing-law" className="legal-section">
          <h2>14. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
          </p>
        </section>

        <section id="contact" className="legal-section">
          <h2>15. Contact</h2>
          <p>For questions about these Terms, contact us at:</p>
          <p>
            <strong>Email:</strong> <a href="mailto:alexcj10@yahoo.com">alexcj10@yahoo.com</a>
          </p>
        </section>
      </main>
    </div>
  );
}
