import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-10 py-4 flex items-center justify-between fixed top-0 left-0 z-50">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">Q</span>
        </div>
        <span className="text-xl font-semibold text-gray-800 tracking-tight">
          Queue<span className="text-indigo-500">Less</span>
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Not logged in */}
        {!user && (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-white font-medium bg-indigo-500 px-5 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 shadow-sm"
            >
              Get Started
            </Link>
          </>
        )}

        {/* Logged in as User */}
        {user?.role === 'user' && (
          <>
            <span className="text-sm text-gray-500">
              Hi, {user.name}
            </span>
            <Link
              to="/my-token"
              className="text-sm text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              My Token
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-white font-medium bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 transition-all duration-200"
            >
              Logout
            </button>
          </>
        )}

        {/* Logged in as Operator */}
        {user?.role === 'operator' && (
          <>
            <span className="text-sm text-gray-500">
              Hi, {user.name}
            </span>
            <Link
              to="/operator"
              className="text-sm text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-white font-medium bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 transition-all duration-200"
            >
              Logout
            </button>
          </>
        )}

        {/* Logged in as Admin */}
        {user?.role === 'admin' && (
          <>
            <span className="text-sm text-gray-500">
              Hi, {user.name}
            </span>
            <Link
              to="/admin"
              className="text-sm text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Overview
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-white font-medium bg-red-400 px-4 py-2 rounded-lg hover:bg-red-500 transition-all duration-200"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar