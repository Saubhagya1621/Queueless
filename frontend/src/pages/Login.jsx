import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'
import { loginUser } from '../utils/api'

const DEMO_CREDENTIALS = {
  operator: [
    { email: 'op.hospital1@test.com', label: 'City Hospital — Counter 1' },
    { email: 'op.hospital2@test.com', label: 'City Hospital — Counter 2' },
    { email: 'op.sbi1@test.com', label: 'SBI — Counter 1' },
    { email: 'op.sbi2@test.com', label: 'SBI — Counter 2' },
    { email: 'op.passport1@test.com', label: 'Passport Office — Counter 1' },
    { email: 'op.hdfc1@test.com', label: 'HDFC Bank — Counter 1' },
    { email: 'op.disthospital1@test.com', label: 'District Hospital — Counter 1' },
    { email: 'op.rto1@test.com', label: 'RTO Office — Counter 1' },
  ],
  admin: [
    { email: 'admin.hospital@test.com', label: 'City Hospital' },
    { email: 'admin.sbi@test.com', label: 'State Bank of India' },
    { email: 'admin.passport@test.com', label: 'Regional Passport Office' },
    { email: 'admin.hdfc@test.com', label: 'HDFC Bank' },
    { email: 'admin.disthospital@test.com', label: 'District Hospital' },
    { email: 'admin.rto@test.com', label: 'RTO Office' },
  ],
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showCreds, setShowCreds] = useState(false)
  const [activeTab, setActiveTab] = useState('operator')

  const { login } = useAuth()
  const navigate = useNavigate()

  const quickFill = (role) => {
    if (role === 'operator') { setEmail('op.hospital1@test.com'); setPassword('123456') }
    if (role === 'admin') { setEmail('admin.hospital@test.com'); setPassword('123456') }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await loginUser(email, password)
      const userData = response.user
      login(userData)
      toast.success('Login successful!')
      if (userData.role === 'user') navigate('/home')
      if (userData.role === 'operator') navigate('/operator')
      if (userData.role === 'admin') navigate('/admin')
    } catch (err) {
      const message = err?.response?.data?.message || 'Something went wrong'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden transition-colors duration-300">

      {/* Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-400/30 dark:bg-indigo-700/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-400/30 dark:bg-violet-700/30 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="glass-card w-full max-w-md p-8 relative z-10">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/30">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
            Queue<span className="text-indigo-500">Less</span>
          </span>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-500 transition-colors mb-6"
        >
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">Welcome back</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Login to manage your queue</p>

        {/* Quick fill */}
        <div className="flex gap-2 mb-4">
          {['operator', 'admin'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => quickFill(role)}
              className="flex-1 text-xs font-medium py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-500 transition-all capitalize"
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        {/* Demo credentials toggle */}
        <button
          type="button"
          onClick={() => setShowCreds(prev => !prev)}
          className="w-full text-xs text-indigo-500 hover:text-indigo-600 font-medium mb-5 text-left transition-colors"
        >
          {showCreds ? '▲ Hide demo credentials' : '▼ View all demo credentials'}
        </button>

        {/* Credentials card */}
        {showCreds && (
          <div className="mb-6 rounded-xl border border-white/30 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4">
            <div className="flex gap-2 mb-3">
              {['operator', 'admin'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-linear-to-r from-indigo-500 to-violet-600 text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
              Password for all:{' '}
              <span className="font-mono font-semibold text-gray-600 dark:text-gray-300">123456</span>
            </p>
            <ul className="space-y-1.5 max-h-48 overflow-y-auto">
              {DEMO_CREDENTIALS[activeTab].map((cred) => (
                <li key={cred.email}>
                  <button
                    type="button"
                    onClick={() => { setEmail(cred.email); setPassword('123456') }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all group"
                  >
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {cred.label}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">{cred.email}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-4 border border-red-100 dark:border-red-800/30">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="glow-btn text-white font-medium py-2.5 rounded-xl transition-all duration-200 mt-2 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-500 font-medium hover:underline">Register</Link>
        </p>

      </div>
    </div>
  )
}

export default Login