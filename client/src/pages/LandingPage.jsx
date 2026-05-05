import { motion } from 'motion/react'

const FEATURES = [
  { tag: 'POST', label: 'Push changelog entries', desc: 'version, title, body, tags' },
  { tag: 'GET', label: 'Public paginated API', desc: 'filter by tag & version range' },
  { tag: 'RSS', label: 'Auto-generated feeds', desc: 'one per project, always fresh' },
  { tag: 'KEY', label: 'API key auth', desc: 'rate limited per key' },
]

export default function LandingPage({ onGetStarted }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Nav onGetStarted={onGetStarted} />
      <main style={{ flex: 1, maxWidth: 900, margin: '0 auto', padding: '80px 24px 120px', width: '100%' }}>
        <Hero onGetStarted={onGetStarted} />
        <Features />
        <Footer />
      </main>
    </motion.div>
  )
}

function Nav({ onGetStarted }) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 32px', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, background: 'var(--bg-base)', zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, background: 'var(--accent)', borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#fff',
        }}>C</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          changelog.as
        </span>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onGetStarted} style={styles.btnGhost}>Sign in</button>
        <button onClick={onGetStarted} style={styles.btnAccent}>Get started →</button>
      </div>
    </nav>
  )
}

function Hero({ onGetStarted }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 80 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div style={styles.pill}>Backend-first · API-driven · Developer native</div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 7vw, 80px)',
          fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em',
          margin: '24px 0 20px', color: 'var(--text-primary)',
        }}
      >
        Changelog<br /><span style={{ color: 'var(--accent)' }}>as a Service</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 40px' }}
      >
        Push versioned product changelogs via API. Expose them via a public widget or RSS feed. Built for developers.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <button onClick={onGetStarted} style={{ ...styles.btnAccent, padding: '14px 32px', fontSize: 15 }}>
          Create your project →
        </button>
        <button style={{ ...styles.btnGhost, padding: '14px 24px', fontSize: 14 }}>View API docs</button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ marginTop: 56 }}>
        <CodePreview />
      </motion.div>
    </div>
  )
}

function CodePreview() {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 12, overflow: 'hidden', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        {['#ff5c5c', '#f5a623', '#3ecf8e'].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
        ))}
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>POST /v1/projects/:id/entries</span>
      </div>
      <pre style={{ margin: 0, padding: '20px 24px', fontSize: 12, lineHeight: 1.8, color: 'var(--text-secondary)', overflowX: 'auto' }}>
{`fetch('https://api.changelog.as/v1/projects/my-app/entries', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    `}<span style={{ color: 'var(--accent)' }}>'X-API-Key': 'ck_live_••••••••'</span>{`
  },
  body: JSON.stringify({
    `}<span style={{ color: 'var(--green)' }}>version</span>{`: '2.4.0',
    `}<span style={{ color: 'var(--green)' }}>title</span>{`: 'Dark mode & performance fixes',
    `}<span style={{ color: 'var(--green)' }}>tags</span>{`: [`}<span style={{ color: 'var(--amber)' }}>'feature'</span>{`, `}<span style={{ color: 'var(--amber)' }}>'fix'</span>{`],
    `}<span style={{ color: 'var(--green)' }}>body</span>{`: '## What\\'s new\\n- Added dark mode...',
  })
})`}
      </pre>
    </div>
  )
}

function Features() {
  return (
    <div style={{ marginBottom: 80 }}>
      <p style={styles.sectionLabel}>WHAT IT DOES</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.tag}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
            style={styles.featureCard}
          >
            <span style={styles.methodTag}>{f.tag}</span>
            <p style={{ margin: '12px 0 4px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{f.label}</p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
      <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {['REST API design', 'JWT + API keys', 'rate limiting', 'cursor pagination', 'Zod validation'].map(t => (
          <span key={t} style={styles.techTag}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>changelog.as — built for developers</span>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>v0.1.0 — alpha</span>
    </div>
  )
}

const styles = {
  pill: { display: 'inline-block', padding: '6px 14px', background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)', borderRadius: 100, fontSize: 11, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' },
  btnAccent: { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 500, cursor: 'pointer' },
  btnGhost: { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontFamily: 'var(--font-mono)', cursor: 'pointer' },
  featureCard: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' },
  methodTag: { display: 'inline-block', padding: '2px 8px', background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)', borderRadius: 4, fontSize: 10, color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.06em' },
  techTag: { display: 'inline-block', padding: '4px 10px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 11, color: 'var(--text-muted)' },
  sectionLabel: { fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 16 },
}
