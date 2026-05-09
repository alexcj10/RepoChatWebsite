import { Shield, Lock, Eye, Database, Key, Bug, Server, Layers, Webhook, GitBranch } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

/* ─── Security Architecture Layers ─── */
const architectureLayers = [
  {
    icon: <Database size={22} />,
    title: 'PostgreSQL Row Level Security',
    desc: 'Every table — profiles, messages, friend_requests, groups, group_members, notifications, chat_clears, and user_notes — has RLS enabled with granular policies. Users can only SELECT, INSERT, UPDATE, or DELETE their own data. Even with a leaked database URL, cross-user access is impossible.',
    details: [
      'Unique SECURITY DEFINER helper functions (is_group_member, is_group_admin, is_accepted_group_member) prevent RLS policy recursion',
      'Partial unique indexes (e.g. unique_pending_friend_request) enforce data integrity at the database level',
      'Group message policies require accepted membership status — pending/rejected users cannot read messages',
      'DM policies enforce auth.uid() = sender_id OR auth.uid() = receiver_id on every query',
    ],
    color: '#10b981',
  },
  {
    icon: <Key size={22} />,
    title: 'GitHub OAuth 2.0 Authentication',
    desc: 'We never see, store, or process your GitHub password. Authentication is handled entirely through Supabase Auth + GitHub OAuth 2.0 flow. Your credentials stay with GitHub at all times.',
    details: [
      'OAuth tokens are handled via Supabase\'s auth.setSession() — never stored in plaintext',
      'Provider tokens (for GitHub API calls) are stored locally in browser localStorage only',
      'Token cleanup: URL hash tokens are removed immediately after session setup via history.replaceState()',
      'No server-side credential storage — auth state lives in Supabase JWT tokens',
    ],
    color: '#8b5cf6',
  },
  {
    icon: <Lock size={22} />,
    title: 'Encryption in Transit & at Rest',
    desc: 'All data transmitted between your browser and Supabase is encrypted using TLS 1.2+. All data stored in the PostgreSQL database is encrypted at rest via Supabase\'s infrastructure-level AES-256 encryption.',
    details: [
      'All Supabase API calls use HTTPS with TLS 1.2+',
      'GitHub API calls use Bearer token auth over HTTPS',
      'Supabase Realtime channels (WebSocket) are encrypted end-to-end',
      'Storage buckets (avatars, chat_images) use encrypted object storage',
    ],
    color: '#6366f1',
  },
  {
    icon: <Eye size={22} />,
    title: 'Complete Data Isolation',
    desc: 'Your messages, notes, friend lists, groups, and settings are completely isolated from other users. RLS policies ensure database queries can never return another user\'s data, even in the event of an application-level bug.',
    details: [
      'Group visibility requires is_group_member() check — non-members cannot see group data',
      'Secure RPC function get_secure_group_members() uses SECURITY DEFINER with explicit auth.uid() validation',
      'Friend request queries scoped to sender_id/receiver_id matching auth.uid()',
      'Notification policies: auth.uid() = user_id on all SELECT, INSERT, DELETE operations',
    ],
    color: '#f59e0b',
  },
]

/* ─── Extension Security ─── */
const extensionSecurity = {
  title: 'Minimal Chrome Extension Permissions',
  permissions: [
    { name: 'storage', desc: 'Saves your preferences (theme, accent color, layout) locally in Chrome — never sent to external servers', icon: <Server size={16} /> },
    { name: 'activeTab', desc: 'Reads the current GitHub URL context (PR number, issue, branch) to attach contextual metadata to messages', icon: <GitBranch size={16} /> },
    { name: 'scripting', desc: 'Injects the RepoChat chat UI sidebar into GitHub pages — required for the extension to function', icon: <Layers size={16} /> },
  ],
  hostPermissions: 'https://github.com/* and https://api.github.com/* — The extension only runs on GitHub pages and communicates with the GitHub API. It does not request access to your browsing history, bookmarks, downloads, or any other website.',
}




/* ─── RLS Policy Stats ─── */
const rlsStats = [
  { label: 'Tables Protected', value: '8+', sub: 'Profiles, messages, groups & more' },
  { label: 'RLS Policies Active', value: '20+', sub: 'SELECT, INSERT, UPDATE, DELETE' },
  { label: 'SECURITY DEFINER', value: '6+', sub: 'Auth helper functions' },
  { label: 'DB Triggers', value: '3', sub: 'Auto-notifications & sync' },
]

export default function Security() {

  return (
    <div className="legal-page" style={{ paddingTop: 'calc(var(--nav-h) + clamp(64px, 10vh, 100px))' }}>
      <div className="container">

        {/* ─── Hero Header ─── */}
        <ScrollReveal>
          <div className="section-head" style={{ marginBottom: 'var(--space-m)' }}>
            <h1 className="h2">Security at<br /><span className="gradient-text">every layer.</span></h1>
            <p>RepoChat is built with security as a foundational requirement — not an afterthought. Every layer of our stack enforces strict data isolation and authentication.</p>
          </div>
        </ScrollReveal>

        {/* ─── RLS Stats Bar ─── */}
        <ScrollReveal>
          <div className="sec-stats-strip">
            {rlsStats.map((s, i) => (
              <div key={i} className="sec-stat-card">
                <div className="sec-stat-value">{s.value}</div>
                <div className="sec-stat-label">{s.label}</div>
                <div className="sec-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── Architecture Deep-Dive Cards ─── */}
        <ScrollReveal>
          <div className="section-head" style={{ marginBottom: 48 }}>
            <h2 className="h2 ecosystem-h2">Security <span className="gradient-text">architecture.</span></h2>
            <p className="body-md" style={{ opacity: 0.6, marginTop: 8 }}>Four layers of defense protecting your data</p>
          </div>
        </ScrollReveal>

        <div className="sec-deep-cards">

          {/* ──── Card 1: PostgreSQL RLS ──── */}
          <ScrollReveal>
            <div className="sec-deep-card" style={{ '--card-accent': '#10b981' } as React.CSSProperties}>
              <div className="sec-deep-card-header">
                <div className="sec-deep-card-icon" style={{ color: '#10b981' }}>
                  <Database size={22} />
                </div>
                <h3>PostgreSQL Row Level Security</h3>
              </div>
              <div className="sec-deep-card-grid">
                <div className="sec-deep-card-text">
                  <p>
                    Every table — profiles, messages, friend_requests, groups, group_members, notifications, chat_clears, and user_notes — has RLS enabled with granular policies. Users can only SELECT, INSERT, UPDATE, or DELETE their own data. Even with a leaked database URL, cross-user access is impossible.
                  </p>
                  <div className="sec-deep-card-details">
                    {architectureLayers[0].details.map((d, i) => (
                      <div key={i} className="sec-deep-detail-item">
                        <div className="sec-deep-detail-dot" style={{ background: '#10b981' }} />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sec-code-block">
                  <div className="sec-code-block-label">SQL</div>
                  <pre>
{`-- `}<span className="code-comment">RLS policy on user_notes table</span>{`
`}<span className="code-keyword">CREATE POLICY</span>{` `}<span className="code-string">"Users can view their own notes"</span>{`
  `}<span className="code-keyword">ON</span>{` `}<span className="code-table">user_notes</span>{` `}<span className="code-keyword">FOR</span>{` SELECT
  `}<span className="code-keyword">USING</span>{` (`}<span className="code-fn">auth.uid</span>{`() `}<span className="code-op">=</span>{` user_id);

-- `}<span className="code-comment">DM message policy</span>{`
`}<span className="code-keyword">CREATE POLICY</span>{` `}<span className="code-string">"Allow users to view their own messages"</span>{`
  `}<span className="code-keyword">ON</span>{` `}<span className="code-table">messages</span>{` `}<span className="code-keyword">FOR</span>{` SELECT
  `}<span className="code-keyword">USING</span>{` (
    `}<span className="code-fn">auth.uid</span>{`() `}<span className="code-op">=</span>{` sender_id `}<span className="code-keyword">OR</span>{`
    `}<span className="code-fn">auth.uid</span>{`() `}<span className="code-op">=</span>{` receiver_id
  );

-- `}<span className="code-comment">Group membership gate</span>{`
`}<span className="code-keyword">CREATE FUNCTION</span>{` `}<span className="code-fn">is_group_member</span>{`(gid uuid)
  `}<span className="code-keyword">RETURNS</span>{` boolean
  `}<span className="code-keyword">SECURITY DEFINER</span>{` `}<span className="code-keyword">AS</span>{` $$
  `}<span className="code-keyword">BEGIN</span>{`
    `}<span className="code-keyword">RETURN EXISTS</span>{` (
      `}<span className="code-keyword">SELECT</span>{` 1 `}<span className="code-keyword">FROM</span>{` `}<span className="code-table">group_members</span>{`
      `}<span className="code-keyword">WHERE</span>{` group_id `}<span className="code-op">=</span>{` gid
      `}<span className="code-keyword">AND</span>{` user_id `}<span className="code-op">=</span>{` `}<span className="code-fn">auth.uid</span>{`()
    );
  `}<span className="code-keyword">END</span>{`;
  $$ `}<span className="code-keyword">LANGUAGE</span>{` plpgsql;`}
                  </pre>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ──── Card 2: GitHub OAuth 2.0 ──── */}
          <ScrollReveal delay={1}>
            <div className="sec-deep-card" style={{ '--card-accent': '#8b5cf6' } as React.CSSProperties}>
              <div className="sec-deep-card-header">
                <div className="sec-deep-card-icon" style={{ color: '#8b5cf6' }}>
                  <Key size={22} />
                </div>
                <h3>GitHub OAuth 2.0 Authentication</h3>
              </div>
              <div className="sec-deep-card-grid">
                <div className="sec-deep-card-text">
                  <p>
                    We never see, store, or process your GitHub password. Authentication is handled entirely through Supabase Auth + GitHub OAuth 2.0 flow. Your credentials stay with GitHub at all times.
                  </p>
                  <div className="sec-deep-card-details">
                    {architectureLayers[1].details.map((d, i) => (
                      <div key={i} className="sec-deep-detail-item">
                        <div className="sec-deep-detail-dot" style={{ background: '#8b5cf6' }} />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sec-code-block">
                  <div className="sec-code-block-label">Flow</div>
                  <pre>
{`-- `}<span className="code-comment">OAuth 2.0 authentication flow</span>{`

`}<span className="code-fn">1.</span>{` User clicks `}<span className="code-string">"Sign in with GitHub"</span>{`
   Extension → `}<span className="code-fn">supabase.auth.signInWithOAuth</span>{`()

`}<span className="code-fn">2.</span>{` GitHub redirects with tokens in hash
   github.com → `}<span className="code-string">#access_token=...&refresh_token=...</span>{`

`}<span className="code-fn">3.</span>{` Extension captures tokens from hash
   `}<span className="code-fn">supabase.auth.setSession</span>{`({
     `}<span className="code-string">access_token</span>{`, `}<span className="code-string">refresh_token</span>{`
   })

`}<span className="code-fn">4.</span>{` Cleanup (immediate)
   `}<span className="code-fn">localStorage.setItem</span>{`(`}<span className="code-string">'repochat-github-token'</span>{`, provider_token)
   `}<span className="code-fn">history.replaceState</span>{`() `}<span className="code-comment">// strip hash from URL</span>{`

`}<span className="code-comment">-- Result: JWT stored in Supabase session</span>{`
`}<span className="code-comment">-- Password: NEVER leaves GitHub</span>{`
`}<span className="code-comment">-- URL tokens: stripped immediately</span>
                  </pre>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ──── Card 3: Encryption ──── */}
          <ScrollReveal delay={2}>
            <div className="sec-deep-card" style={{ '--card-accent': '#6366f1' } as React.CSSProperties}>
              <div className="sec-deep-card-header">
                <div className="sec-deep-card-icon" style={{ color: '#6366f1' }}>
                  <Lock size={22} />
                </div>
                <h3>Encryption in Transit & at Rest</h3>
              </div>
              <div className="sec-deep-card-grid">
                <div className="sec-deep-card-text">
                  <p>
                    All data transmitted between your browser and Supabase is encrypted using TLS 1.2+. All data stored in the PostgreSQL database is encrypted at rest via Supabase's infrastructure-level AES-256 encryption.
                  </p>
                  <div className="sec-deep-card-details">
                    {architectureLayers[2].details.map((d, i) => (
                      <div key={i} className="sec-deep-detail-item">
                        <div className="sec-deep-detail-dot" style={{ background: '#6366f1' }} />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sec-code-block">
                  <div className="sec-code-block-label">Layers</div>
                  <pre>
{`-- `}<span className="code-comment">Encryption coverage across RepoChat</span>{`

`}<span className="code-fn">IN TRANSIT</span>{`
  ├─ `}<span className="code-string">HTTPS / TLS 1.2+</span>{`   All API calls
  ├─ `}<span className="code-string">WSS (encrypted)</span>{`    Realtime channels
  └─ `}<span className="code-string">Bearer token</span>{`       GitHub API auth

`}<span className="code-fn">AT REST</span>{`
  ├─ `}<span className="code-string">AES-256</span>{`            PostgreSQL storage
  ├─ `}<span className="code-string">Encrypted volumes</span>{`  Database backups
  └─ `}<span className="code-string">Encrypted buckets</span>{`  avatars, chat_images

`}<span className="code-fn">KEY MANAGEMENT</span>{`
  ├─ `}<span className="code-comment">Service role keys → env variables</span>{`
  └─ `}<span className="code-comment">Anon key → client-safe, RLS-gated</span>
                  </pre>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ──── Card 4: Data Isolation ──── */}
          <ScrollReveal delay={3}>
            <div className="sec-deep-card" style={{ '--card-accent': '#f59e0b' } as React.CSSProperties}>
              <div className="sec-deep-card-header">
                <div className="sec-deep-card-icon" style={{ color: '#f59e0b' }}>
                  <Eye size={22} />
                </div>
                <h3>Complete Data Isolation</h3>
              </div>
              <div className="sec-deep-card-grid">
                <div className="sec-deep-card-text">
                  <p>
                    Your messages, notes, friend lists, groups, and settings are completely isolated from other users. RLS policies ensure database queries can never return another user's data, even in the event of an application-level bug.
                  </p>
                  <div className="sec-deep-card-details">
                    {architectureLayers[3].details.map((d, i) => (
                      <div key={i} className="sec-deep-detail-item">
                        <div className="sec-deep-detail-dot" style={{ background: '#f59e0b' }} />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sec-code-block">
                  <div className="sec-code-block-label">Query</div>
                  <pre>
{`-- `}<span className="code-comment">What User A sees</span>{`
`}<span className="code-keyword">SELECT</span>{` * `}<span className="code-keyword">FROM</span>{` `}<span className="code-table">messages</span>{`;
`}<span className="code-comment">-- → Returns ONLY rows where</span>{`
`}<span className="code-comment">--   sender_id OR receiver_id = User A</span>{`

-- `}<span className="code-comment">What User B sees (same query)</span>{`
`}<span className="code-keyword">SELECT</span>{` * `}<span className="code-keyword">FROM</span>{` `}<span className="code-table">messages</span>{`;
`}<span className="code-comment">-- → Returns ONLY rows where</span>{`
`}<span className="code-comment">--   sender_id OR receiver_id = User B</span>{`

`}<span className="code-comment">-- User A's data is INVISIBLE to B</span>{`
`}<span className="code-comment">-- User B's data is INVISIBLE to A</span>{`
`}<span className="code-comment">-- Even with leaked DB credentials,</span>{`
`}<span className="code-comment">-- RLS still enforces boundaries</span>
                  </pre>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* ─── Chrome Extension Permissions — Deep-Dive Card (Option A) ─── */}
        <ScrollReveal>
          <div className="section-head" style={{ paddingTop: 'var(--space-l)', marginBottom: 48 }}>
            <h2 className="h2 ecosystem-h2">Extension <span className="gradient-text">permissions.</span></h2>
            <p className="body-md" style={{ opacity: 0.6, marginTop: 8 }}>Only the absolute minimum Chrome permissions required</p>
          </div>
        </ScrollReveal>

        <div className="sec-deep-cards">
          <ScrollReveal>
            <div className="sec-deep-card" style={{ '--card-accent': '#a855f7' } as React.CSSProperties}>
              <div className="sec-deep-card-header">
                <div className="sec-deep-card-icon" style={{ color: '#a855f7' }}>
                  <Shield size={22} />
                </div>
                <h3>Minimal Chrome Extension Permissions</h3>
              </div>
              <div className="sec-deep-card-grid">
                <div className="sec-deep-card-text">
                  <p>
                    RepoChat requests only 3 permissions and 2 host domains — the absolute minimum needed to function. No access to browsing history, bookmarks, downloads, cookies, or any website outside GitHub.
                  </p>
                  <div className="sec-deep-card-details">
                    {extensionSecurity.permissions.map((perm, i) => (
                      <div key={i} className="sec-deep-detail-item">
                        <div className="sec-deep-detail-dot" style={{ background: '#a855f7' }} />
                        <span><strong>{perm.name}</strong> — {perm.desc}</span>
                      </div>
                    ))}
                    <div className="sec-deep-detail-item">
                      <div className="sec-deep-detail-dot" style={{ background: '#a855f7' }} />
                      <span><strong>Host permissions</strong> — {extensionSecurity.hostPermissions}</span>
                    </div>
                  </div>
                </div>
                <div className="sec-code-block">
                  <div className="sec-code-block-label">manifest.json</div>
                  <pre>
{`{
  `}<span className="code-string">"manifest_version"</span>{`: 3,
  `}<span className="code-string">"permissions"</span>{`: [
    `}<span className="code-string">"storage"</span>{`,
    `}<span className="code-string">"activeTab"</span>{`,
    `}<span className="code-string">"scripting"</span>{`
  ],
  `}<span className="code-string">"host_permissions"</span>{`: [
    `}<span className="code-string">"https://github.com/*"</span>{`,
    `}<span className="code-string">"https://api.github.com/*"</span>{`
  ],
  `}<span className="code-string">"content_scripts"</span>{`: [{
    `}<span className="code-string">"matches"</span>{`: [`}<span className="code-string">"https://github.com/*"</span>{`],
    `}<span className="code-string">"run_at"</span>{`: `}<span className="code-string">"document_end"</span>{`
  }],
  `}<span className="code-string">"web_accessible_resources"</span>{`: [{
    `}<span className="code-string">"resources"</span>{`: [`}<span className="code-string">"assets/*"</span>{`],
    `}<span className="code-string">"matches"</span>{`: [`}<span className="code-string">"https://github.com/*"</span>{`]
  }]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ─── Permission Comparison Table (Option B) ─── */}
        <ScrollReveal>
          <div className="sec-perm-table-wrap">
            <table className="sec-perm-table">
              <thead>
                <tr>
                  <th>Permission</th>
                  <th><span className="sec-perm-badge sec-perm-badge--yes">✓ Accesses</span></th>
                  <th><span className="sec-perm-badge sec-perm-badge--no">✕ Cannot Access</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>storage</code></td>
                  <td>Theme, accent color, layout preferences (local only)</td>
                  <td>Browsing history, cookies, passwords, autofill data</td>
                </tr>
                <tr>
                  <td><code>activeTab</code></td>
                  <td>Current GitHub page URL (repo, PR, issue context)</td>
                  <td>Other tabs, other websites, background page tracking</td>
                </tr>
                <tr>
                  <td><code>scripting</code></td>
                  <td>Injects RepoChat sidebar UI into GitHub pages</td>
                  <td>Page content modification, form data, keystrokes</td>
                </tr>
                <tr>
                  <td><code>host_permissions</code></td>
                  <td>github.com/* and api.github.com/* only</td>
                  <td>Any non-GitHub website, Google, social media, email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* ─── Server-Side Security — Deep-Dive Cards (Option C) ─── */}
        <ScrollReveal>
          <div className="section-head" style={{ paddingTop: 'var(--space-l)', marginBottom: 48 }}>
            <h2 className="h2 ecosystem-h2">Server-side <span className="gradient-text">protections.</span></h2>
            <p className="body-md" style={{ opacity: 0.6, marginTop: 8 }}>Backend security across Supabase Edge Functions and database triggers</p>
          </div>
        </ScrollReveal>

        <div className="sec-deep-cards">

          {/* ──── Server Card 1: Edge Function Security ──── */}
          <ScrollReveal>
            <div className="sec-deep-card" style={{ '--card-accent': '#3b82f6' } as React.CSSProperties}>
              <div className="sec-deep-card-header">
                <div className="sec-deep-card-icon" style={{ color: '#3b82f6' }}>
                  <Webhook size={22} />
                </div>
                <h3>Edge Function Security</h3>
              </div>
              <div className="sec-deep-card-grid">
                <div className="sec-deep-card-text">
                  <p>
                    All Supabase Edge Functions enforce authentication and integrity checks before processing any request. Payment webhooks use cryptographic signature verification; checkout sessions require valid JWT authentication.
                  </p>
                  <div className="sec-deep-card-details">
                    <div className="sec-deep-detail-item">
                      <div className="sec-deep-detail-dot" style={{ background: '#3b82f6' }} />
                      <span>Webhook signatures verified via <strong>standardwebhooks</strong> cryptographic library — invalid signatures return 401</span>
                    </div>
                    <div className="sec-deep-detail-item">
                      <div className="sec-deep-detail-dot" style={{ background: '#3b82f6' }} />
                      <span>Checkout sessions require <strong>supabase.auth.getUser()</strong> validation — unauthenticated requests are rejected</span>
                    </div>
                    <div className="sec-deep-detail-item">
                      <div className="sec-deep-detail-dot" style={{ background: '#3b82f6' }} />
                      <span>All payment API keys stored as <strong>Deno.env</strong> environment variables — never in client-side code</span>
                    </div>
                    <div className="sec-deep-detail-item">
                      <div className="sec-deep-detail-dot" style={{ background: '#3b82f6' }} />
                      <span>CORS configured to reject unauthorized origins and methods</span>
                    </div>
                  </div>
                </div>
                <div className="sec-code-block">
                  <div className="sec-code-block-label">dodo-webhook/index.ts</div>
                  <pre>
{`-- `}<span className="code-comment">Webhook signature verification</span>{`
`}<span className="code-keyword">const</span>{` wh = `}<span className="code-keyword">new</span>{` `}<span className="code-fn">WebhookVerifier</span>{`(
  `}<span className="code-fn">Deno.env.get</span>{`(`}<span className="code-string">"DODO_WEBHOOK_SECRET"</span>{`)
);

wh.`}<span className="code-fn">verify</span>{`(rawBody, {
  `}<span className="code-string">"webhook-id"</span>{`:        req.headers.get(...),
  `}<span className="code-string">"webhook-signature"</span>{`: req.headers.get(...),
  `}<span className="code-string">"webhook-timestamp"</span>{`: req.headers.get(...),
});

`}<span className="code-comment">// If verification fails:</span>{`
`}<span className="code-keyword">return new</span>{` `}<span className="code-fn">Response</span>{`(
  `}<span className="code-string">"Invalid signature"</span>{`, { status: `}<span className="code-table">401</span>{` }
);

-- `}<span className="code-comment">JWT auth on create-checkout</span>{`
`}<span className="code-keyword">const</span>{` { data: { user }, error } =
  `}<span className="code-keyword">await</span>{` `}<span className="code-fn">supabase.auth.getUser</span>{`();

`}<span className="code-keyword">if</span>{` (authError || !user)
  `}<span className="code-keyword">return new</span>{` `}<span className="code-fn">Response</span>{`(`}<span className="code-string">"Unauthorized"</span>{`, { status: `}<span className="code-table">401</span>{` });`}
                  </pre>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ──── Server Card 2: Database Triggers & Zero Payment Storage ──── */}
          <ScrollReveal delay={1}>
            <div className="sec-deep-card" style={{ '--card-accent': '#f59e0b' } as React.CSSProperties}>
              <div className="sec-deep-card-header">
                <div className="sec-deep-card-icon" style={{ color: '#f59e0b' }}>
                  <Server size={22} />
                </div>
                <h3>Database Triggers & Zero Payment Storage</h3>
              </div>
              <div className="sec-deep-card-grid">
                <div className="sec-deep-card-text">
                  <p>
                    Automated database triggers handle friend request notifications and group invitations using SECURITY DEFINER functions — running with elevated privileges while maintaining strict input validation. All payment processing is handled externally by Dodo Payments.
                  </p>
                  <div className="sec-deep-card-details">
                    <div className="sec-deep-detail-item">
                      <div className="sec-deep-detail-dot" style={{ background: '#f59e0b' }} />
                      <span><strong>handle_new_friend_request</strong> — Auto-creates notification for target user via SECURITY DEFINER trigger</span>
                    </div>
                    <div className="sec-deep-detail-item">
                      <div className="sec-deep-detail-dot" style={{ background: '#f59e0b' }} />
                      <span><strong>handle_friend_request_update</strong> — Syncs friends table + cleans up notification on accept/reject</span>
                    </div>
                    <div className="sec-deep-detail-item">
                      <div className="sec-deep-detail-dot" style={{ background: '#f59e0b' }} />
                      <span><strong>handle_new_group_invitation</strong> — Notifies invited users with group name and role via SECURITY DEFINER</span>
                    </div>
                    <div className="sec-deep-detail-item">
                      <div className="sec-deep-detail-dot" style={{ background: '#f59e0b' }} />
                      <span><strong>Zero PCI scope</strong> — We never see, store, or process credit card numbers, CVVs, or billing details</span>
                    </div>
                  </div>
                </div>
                <div className="sec-code-block">
                  <div className="sec-code-block-label">SQL</div>
                  <pre>
{`-- `}<span className="code-comment">Auto-notification trigger</span>{`
`}<span className="code-keyword">CREATE FUNCTION</span>{` `}<span className="code-fn">handle_new_friend_request</span>{`()
`}<span className="code-keyword">RETURNS</span>{` TRIGGER `}<span className="code-keyword">AS</span>{` $$
`}<span className="code-keyword">DECLARE</span>{`
  sender_profile `}<span className="code-table">profiles</span>{`%ROWTYPE;
  target_id UUID;
`}<span className="code-keyword">BEGIN</span>{`
  `}<span className="code-keyword">SELECT</span>{` * `}<span className="code-keyword">INTO</span>{` sender_profile
    `}<span className="code-keyword">FROM</span>{` `}<span className="code-table">profiles</span>{`
    `}<span className="code-keyword">WHERE</span>{` id `}<span className="code-op">=</span>{` NEW.sender_id;

  `}<span className="code-keyword">INSERT INTO</span>{` `}<span className="code-table">notifications</span>{`
    (user_id, type, payload)
  `}<span className="code-keyword">VALUES</span>{` (
    target_id,
    `}<span className="code-string">'invite_received'</span>{`,
    `}<span className="code-fn">jsonb_build_object</span>{`(
      `}<span className="code-string">'sender'</span>{`, sender_profile
    )
  );
  `}<span className="code-keyword">RETURN</span>{` NEW;
`}<span className="code-keyword">END</span>{`;
$$ `}<span className="code-keyword">LANGUAGE</span>{` plpgsql `}<span className="code-keyword">SECURITY DEFINER</span>{`;`}
                  </pre>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* ─── Responsible Disclosure ─── */}
        <ScrollReveal>
          <div className="security-grid-card" style={{
            maxWidth: 860, margin: '0 auto var(--space-l)',
            borderRadius: 20,
            padding: '32px',
            '--card-glow': 'rgba(245, 158, 11, 0.4)',
            '--card-glow-bg': 'rgba(245, 158, 11, 0.25)',
          } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#f59e0b', flexShrink: 0,
              }}>
                <Bug size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Responsible Disclosure</h3>
            </div>
            <div style={{ paddingLeft: 0 }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
                If you discover a security vulnerability in RepoChat, please report it to us privately. We take all security reports seriously and will respond within 48 hours. We appreciate responsible disclosure and will credit reporters if desired.
              </p>
              <a href="mailto:alexcj10@yahoo.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 24px', borderRadius: 999,
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: '#f59e0b', fontWeight: 600, fontSize: '0.85rem',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
              }}>
                alexcj10@yahoo.com
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Trust Summary ─── */}
        <ScrollReveal>
          <div style={{
            textAlign: 'center', maxWidth: 640, margin: '0 auto',
            paddingTop: 'var(--space-m)', paddingBottom: 'var(--space-l)',
          }}>
            <h2 className="h3">Our Security Promise</h2>
            <p className="body-md" style={{ lineHeight: 1.8, marginTop: 16 }}>
              We believe that developer tools should be trustworthy by default. RepoChat is designed so that even if our application code had a vulnerability, the database-level security (Row Level Security) would still prevent unauthorized access to your data. Every RLS policy, every SECURITY DEFINER function, and every trigger is written with the assumption that the client cannot be trusted.
            </p>
            <p className="body-sm" style={{ marginTop: 20 }}>
              Questions about our security practices? Contact us at{' '}
              <a href="mailto:alexcj10@yahoo.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>alexcj10@yahoo.com</a>
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
