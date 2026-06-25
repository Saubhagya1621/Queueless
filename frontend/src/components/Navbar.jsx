import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { io } from "socket.io-client";

function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const notifRef = useRef(null);
  const dropdownRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }

      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (!user) return;

    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:8000", {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("token:called", (data) => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: "Your token is being called 🔔",
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    });

    socket.on("queue:updated", () => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: "Queue updated",
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    });

    return () => socket.disconnect();
  }, [user]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const getDashboardLink = () => {
    if (user?.role === "operator") return "/operator";
    if (user?.role === "admin") return "/admin";
    return "/home";
  };

  const getDashboardLabel = () => {
    if (user?.role === "operator") return "Dashboard";
    if (user?.role === "admin") return "Overview";
    return "Home";
  };

  return (
    <nav
      className={`w-full px-10 py-4 flex items-center justify-between fixed top-0 left-0 z-50 transition-all duration-300
      backdrop-blur-xl border-b
      ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 border-white/20 dark:border-white/10 shadow-lg shadow-indigo-500/5"
          : "bg-white/70 dark:bg-gray-900/70 border-white/10 dark:border-white/5"
      }`}
    >
      {/* Logo */}
      <Link
        to={user ? getDashboardLink() : "/"}
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/30">
          <span className="text-white font-bold text-sm">Q</span>
        </div>
        <span className="text-xl font-semibold text-gray-800 dark:text-white tracking-tight">
          Queue<span className="text-indigo-500">Less</span>
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
        >
          {isDark ? (
            <span className="text-base">☀️</span>
          ) : (
            <span className="text-base">🌙</span>
          )}
        </button>

        {/* Not logged in */}
        {!user && (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 dark:text-gray-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-white font-medium glow-btn px-5 py-2 rounded-lg transition-all duration-200"
            >
              Get Started
            </Link>
          </>
        )}

        {/* Logged in — nav link */}
        {user && (
          <Link
            to={getDashboardLink()}
            className="text-sm text-gray-600 dark:text-gray-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            {getDashboardLabel()}
          </Link>
        )}

        {/* My Token — only for users */}
        {user?.role === "user" && (
          <Link
            to="/my-token"
            className="text-sm text-gray-600 dark:text-gray-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            My Token
          </Link>
        )}

        {/* Notification Bell — logged in users */}
        {user && (
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-base">🔔</span>

              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 text-[10px] bg-red-500 text-white rounded-full px-1">
                  {notifications.length}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50">
                <div className="p-3 border-b text-sm font-medium">
                  Notifications
                </div>

                {notifications.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">
                    No notifications yet
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-2 text-sm border-b border-gray-100 dark:border-gray-800"
                      >
                        <p>{n.message}</p>
                        <p className="text-xs text-gray-400">{n.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Profile Dropdown — logged in */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {user.name}
              </span>
              <span className="text-xs text-gray-400">▾</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 z-50 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl py-1">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-indigo-500 capitalize">
                    {user.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-150"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
