import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // ----- FAKE DATA — remove this block when backend is ready -----
      const fakeUsers = [
        { id: 1, name: 'Rahul', email: 'user@test.com', password: '123456', role: 'user' },
        { id: 2, name: 'Priya', email: 'operator@test.com', password: '123456', role: 'operator' },
        { id: 3, name: 'Admin', email: 'admin@test.com', password: '123456', role: 'admin' },
      ]
      const foundUser = fakeUsers.find(
        (u) => u.email === email && u.password === password
      )
      if (!foundUser) throw new Error('Invalid email or password')
      const userData = foundUser
      // ----- END FAKE DATA -----

      // ----- REAL API — uncomment this when backend is ready -----
      // const response = await loginUser(email, password)
      // const userData = response.data.user
      // ----- END REAL API -----

      login(userData)

      if (userData.role === 'user') navigate('/home')
      if (userData.role === 'operator') navigate('/operator')
      if (userData.role === 'admin') navigate('/admin')

    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
            Queue<span className="text-indigo-500">Less</span>
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
          Welcome back
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Login to manage your queue
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-600 transition-all duration-200 mt-2 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-500 font-medium hover:underline">
            Register
          </Link>
        </p>

        {/* Test credentials */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-xs text-gray-400">
          <p className="font-medium text-gray-500 dark:text-gray-300 mb-1">Test credentials</p>
          <p>User → user@test.com / 123456</p>
          <p>Operator → operator@test.com / 123456</p>
          <p>Admin → admin@test.com / 123456</p>
        </div>

      </div>
    </div>
  )
}

export default Login