import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import toast from "react-hot-toast";
import loginIllustration from "../assets/login-illustration.jpeg";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(name, email, phone, password);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-0 py-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-400/30 dark:bg-indigo-700/30 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-400/30 dark:bg-violet-700/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl px-4">
        <div className="rounded-3xl overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-1 ring-indigo-400/30 shadow-[0_0_45px_rgba(99,102,241,0.25)] flex flex-col lg:flex-row">
          {/* Illustration — hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex flex-1 justify-center">
            <img
              src={loginIllustration}
              alt="Person working on laptop"
              className="w-full max-w-lg h-auto animate-float"
            />
          </div>

          <div className="w-full max-w-md lg:max-w-lg p-6 shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/30 ring-1 ring-indigo-300/40">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                Queue<span className="text-indigo-500">Less</span>
              </span>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-500 transition-colors mb-4"
            >
              ← Back to Home
            </Link>

            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
              Create account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Join QueueLess and skip the wait
            </p>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm px-4 py-3 rounded-lg mb-3 border border-red-100 dark:border-red-800/30">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                />
              </div>

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
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  minLength={10}
                  maxLength={10}
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
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
                  minLength={6}
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                />
                <p
                  className={`text-xs mt-1 ${
                    password.length < 6
                      ? "text-red-500"
                      : password.length < 10
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {password.length === 0
                    ? ""
                    : password.length < 6
                      ? "Weak Password"
                      : password.length < 10
                        ? "Medium Password"
                        : "Strong Password"}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-500 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all duration-200 mt-1 disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-500 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
