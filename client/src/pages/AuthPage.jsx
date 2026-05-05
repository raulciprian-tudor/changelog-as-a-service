import { useState } from 'react'
import { motion } from 'motion/react'

export default function AuthPage({ onSuccess, onBack }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); onSuccess() }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <button onClick={onBack} style={styles.backBtn}>← back</button>

      <div style={styles.card}>
        <div style={{ marginBottom: 28 }}>
          <div style={styles.logo}>C</div>
          <h1 style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
          <p style={styles.subtitle}>{mode === 'login' ? 'Sign in to your changelog dashboard' : 'Start pushing changelogs in minutes'}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && <Field label="Name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" />}
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" />
          <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••••" />
          <button type="submit" style={{ ...styles.btnAccent, marginTop: 8 }}>
            {mode === 'login' ? 'Sign in →' : 'Create account →'}
          </button>
        </form>

        <div style={styles.divider} />

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={styles.linkBtn}>
            {mode === 'login' ? 'Register' : 'Sign in'}
          </button>
        </p>
      </div>

      <p style={{ marginTop: 20, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
        No credit card required · Free during alpha
      </p>
    </motion.div>
  )
}

function Field({ label, name, type, value, onChange, placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</label>
      <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} autoComplete="off" style={styles.input} />
    </div>
  )
}

const styles = {
  card: { background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 14, padding: '36px 32px', width: '100%', maxWidth: 400 },
  logo: { width: 36, height: 36, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 16 },
  title: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.03em', margin: '0 0 6px', color: 'var(--text-primary)' },
  subtitle: { fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 },
  input: { background: 'var(--bg-surface)', border: '1px solid var(--border-strong)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', outline: 'none', width: '100%' },
  btnAccent: { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 500, cursor: 'pointer', width: '100%' },
  divider: { height: 1, background: 'var(--border)', margin: '24px 0' },
  linkBtn: { background: 'none', border: 'none', color: 'var(--accent)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-mono)', padding: 0, textDecoration: 'underline' },
  backBtn: { position: 'fixed', top: 20, left: 24, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-mono)', padding: '6px 10px' },
}
