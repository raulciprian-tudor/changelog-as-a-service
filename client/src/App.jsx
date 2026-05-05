import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'

export default function App() {
  const [page, setPage] = useState('landing')

  return (
    <AnimatePresence mode="wait">
      {page === 'landing' && (
        <LandingPage key="landing" onGetStarted={() => setPage('auth')} />
      )}
      {page === 'auth' && (
        <AuthPage key="auth" onSuccess={() => setPage('dashboard')} onBack={() => setPage('landing')} />
      )}
      {page === 'dashboard' && (
        <DashboardPage key="dashboard" onLogout={() => setPage('landing')} />
      )}
    </AnimatePresence>
  )
}
