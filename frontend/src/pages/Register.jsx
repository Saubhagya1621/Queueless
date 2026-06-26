import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import toast from "react-hot-toast";

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
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-400/30 dark:bg-indigo-700/30 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-400/30 dark:bg-violet-700/30 rounded-full blur-3xl pointer-events-none" />
      <div className="glass-card w-full max-w-lg p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
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

        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
          Create account
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Join QueueLess and skip the wait
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
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
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
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
              minLength={6}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
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
            className="bg-indigo-500 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-600 transition-all duration-200 mt-2 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
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
  );
}

export default Register;
