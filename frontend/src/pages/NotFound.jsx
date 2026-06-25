import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100 dark:from-gray-950 dark:to-gray-900 px-4">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-10 text-center max-w-md w-full">

        <h1 className="text-7xl font-bold text-indigo-600">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
          Oops!
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          This page doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-6 py-3 rounded-2xl hover:opacity-90 transition-all duration-200 shadow-[0_20px_50px_rgba(37,99,235,0.25)]"
        >
          Go Home
        </Link>

      </div>
    </div>
  );
}

export default NotFound;