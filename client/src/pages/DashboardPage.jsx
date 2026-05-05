import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const MOCK_PROJECTS = [
  { id: '1', name: 'my-app', slug: 'my-app', entries: 12, apiKey: 'ck_live_x9k2m...', createdAt: '2024-12-01' },
  { id: '2', name: 'design-system', slug: 'design-system', entries: 4, apiKey: 'ck_live_p3n8q...', createdAt: '2025-01-15' },
]

const MOCK_ENTRIES = [
  { id: '1', version: '2.4.0', title: 'Dark mode & performance fixes', tags: ['feature', 'fix'], createdAt: '2025-01-20', body: 'Added system-aware dark mode and fixed scroll jank on mobile.' },
  { id: '2', version: '2.3.1', title: 'Critical auth patch', tags: ['breaking'], createdAt: '2025-01-10', body: 'Fixed a token refresh bug that caused silent logouts.' },
  { id: '3', version: '2.3.0', title: 'New notification system', tags: ['feature'], createdAt: '2024-12-28', body: 'Real-time push notifications via WebSocket.' },
]

const TAG_COLORS = {
  feature: { bg: '#3ecf8e18', border: '#3ecf8e33', text: '#3ecf8e' },
  fix: { bg: '#4a9eff18', border: '#4a9eff33', text: '#4a9eff' },
  breaking: { bg: '#ff5c5c18', border: '#ff5c5c33', text: '#ff5c5c' },
}

export default function DashboardPage({ onLogout }) {
  const [activeProject, setActiveProject] = useState(MOCK_PROJECTS[0])
  const [view, setView] = useState('entries')
  const [copied, setCopied] = useState(false)
  const [showNewProject, setShowNewProject] = useState(false)

  const copyKey = () => {
    navigator.clipboard.writeText(activeProject.apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={styles.logo}>C</div>
          <span style={styles.logoText}>changelog.as</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>marco@company.com</span>
          <button onClick={onLogout} style={styles.btnGhost}>Logout</button>
        </div>
      </header>

      <div style={styles.layout}>
        <aside style={styles.sidebar}>
          <p style={styles.sectionLabel}>PROJECTS</p>
          {MOCK_PROJECTS.map(p => (
            <button key={p.id} onClick={() => setActiveProject(p)} style={{
              ...styles.projectBtn,
              background: activeProject.id === p.id ? 'var(--bg-hover)' : 'transparent',
              color: activeProject.id === p.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              borderLeft: activeProject.id === p.id ? '2px solid var(--accent)' : '2px solid transparent',
            }}>
              <span style={{ fontSize: 13 }}>{p.name}</span>
              <span style={styles.entryCount}>{p.entries}</span>
            </button>
          ))}
          <button onClick={() => setShowNewProject(true)} style={styles.newProjectBtn}>+ New project</button>
        </aside>

        <main style={styles.main}>
          <ProjectHeader project={activeProject} copied={copied} onCopy={copyKey} view={view} setView={setView} />
          <AnimatePresence mode="wait">
            {view === 'entries' && (
              <motion.div key="entries" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <EntriesList entries={MOCK_ENTRIES} />
              </motion.div>
            )}
            {view === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <ProjectSettings project={activeProject} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {showNewProject && <NewProjectModal onClose={() => setShowNewProject(false)} />}
    </motion.div>
  )
}

function ProjectHeader({ project, copied, onCopy, view, setView }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={styles.pageTitle}>{project.name}</h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>slug: <span style={{ color: 'var(--accent)' }}>{project.slug}</span></p>
        </div>
        <button onClick={onCopy} style={styles.apiKeyBtn}>
          <span style={{ color: 'var(--text-muted)' }}>API key: </span>
          <span style={{ color: 'var(--accent)' }}>{project.apiKey}</span>
          <span style={{ marginLeft: 10, fontSize: 11, color: copied ? 'var(--green)' : 'var(--text-muted)' }}>{copied ? '✓ copied' : 'copy'}</span>
        </button>
      </div>
      <div style={{ display: 'flex', gap: 0, marginTop: 20, borderBottom: '1px solid var(--border)' }}>
        {['entries', 'settings'].map(tab => (
          <button key={tab} onClick={() => setView(tab)} style={{
            ...styles.tabBtn,
            color: view === tab ? 'var(--text-primary)' : 'var(--text-muted)',
            borderBottom: view === tab ? '2px solid var(--accent)' : '2px solid transparent',
          }}>{tab}</button>
        ))}
      </div>
    </div>
  )
}

function EntriesList({ entries }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {entries.map((entry, i) => (
        <motion.div key={entry.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} style={styles.entryCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={styles.versionBadge}>v{entry.version}</span>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{entry.title}</h3>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{entry.createdAt}</span>
          </div>
          <p style={{ margin: '10px 0 12px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{entry.body}</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {entry.tags.map(tag => (
              <span key={tag} style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, background: TAG_COLORS[tag]?.bg || '#ffffff10', border: `1px solid ${TAG_COLORS[tag]?.border || '#ffffff20'}`, color: TAG_COLORS[tag]?.text || 'var(--text-muted)' }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ProjectSettings({ project }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
      {[
        { label: 'Project name', value: project.name },
        { label: 'Slug', value: project.slug },
        { label: 'RSS feed URL', value: `https://api.changelog.as/v1/${project.slug}/rss` },
        { label: 'Public entries URL', value: `https://api.changelog.as/v1/${project.slug}/entries` },
      ].map(field => (
        <div key={field.label}>
          <p style={styles.sectionLabel}>{field.label.toUpperCase()}</p>
          <div style={styles.settingsField}>{field.value}</div>
        </div>
      ))}
      <button style={styles.btnDanger}>Delete project</button>
    </div>
  )
}

function NewProjectModal({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} onClick={e => e.stopPropagation()} style={styles.modal}>
        <h2 style={{ ...styles.pageTitle, marginBottom: 20 }}>New project</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <p style={styles.sectionLabel}>PROJECT NAME</p>
            <input placeholder="my-product" style={styles.input} />
          </div>
          <div>
            <p style={styles.sectionLabel}>SLUG</p>
            <input placeholder="my-product" style={styles.input} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button style={{ ...styles.btnAccent, flex: 1 }}>Create project →</button>
          <button onClick={onClose} style={styles.btnGhost}>Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const styles = {
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-base)', position: 'sticky', top: 0, zIndex: 100 },
  logo: { width: 28, height: 28, background: 'var(--accent)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#fff' },
  logoText: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', letterSpacing: '-0.02em' },
  layout: { display: 'flex', flex: 1, minHeight: 'calc(100vh - 61px)' },
  sidebar: { width: 220, minWidth: 220, borderRight: '1px solid var(--border)', padding: '24px 12px', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', position: 'sticky', top: 61, height: 'calc(100vh - 61px)', overflowY: 'auto' },
  main: { flex: 1, padding: '28px 32px', overflowY: 'auto' },
  sectionLabel: { fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-muted)', margin: '0 0 8px' },
  projectBtn: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', transition: 'all 0.15s', marginBottom: 2 },
  entryCount: { fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-hover)', borderRadius: 10, padding: '1px 7px' },
  newProjectBtn: { marginTop: 'auto', background: 'transparent', border: '1px dashed var(--border-strong)', borderRadius: 8, padding: '10px', fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer', width: '100%' },
  pageTitle: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.03em', margin: 0, color: 'var(--text-primary)' },
  apiKeyBtn: { background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '8px 14px', fontSize: 12, cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 2 },
  tabBtn: { background: 'none', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: 13, marginBottom: -1, transition: 'color 0.15s' },
  entryCard: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' },
  versionBadge: { padding: '2px 8px', background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)', borderRadius: 4, fontSize: 11, color: 'var(--accent)' },
  settingsField: { background: 'var(--bg-surface)', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--text-secondary)' },
  input: { background: 'var(--bg-surface)', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--text-primary)', outline: 'none', width: '100%' },
  btnAccent: { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 20px', fontSize: 13, cursor: 'pointer' },
  btnGhost: { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '8px 16px', fontSize: 12, cursor: 'pointer' },
  btnDanger: { background: '#ff5c5c18', color: 'var(--red)', border: '1px solid #ff5c5c33', borderRadius: 8, padding: '10px 16px', fontSize: 13, cursor: 'pointer', width: 'fit-content' },
  modal: { background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 14, padding: '32px 28px', width: '100%', maxWidth: 440 },
}
