import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getMyToken, cancelToken } from "../utils/api";

function MyToken() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await getMyToken();
        setToken(data || null);
      } catch (err) {
        setToken(null);
        setError("Could not load your token.");
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  const handleCancelToken = async () => {
    try {
      await cancelToken(token.id);
      setToken(null);
    } catch (err) {
      setError("Could not cancel your token. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-300 pt-20">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 pt-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Loading your token...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-300 pt-20">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 pt-12">
        {error && (
          <div className="mb-4 text-center text-sm text-red-500">{error}</div>
        )}

        {!token ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#111827] dark:text-white">
              No Active Token
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              You currently don't have any active queue token.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Your Token
              </p>

              <h1 className="text-6xl font-bold text-indigo-500">
                {token.number}
              </h1>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Service Center
                </span>

                <span className="font-medium text-[#111827] dark:text-white">
                  {token.center}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Counter
                </span>

                <span className="font-medium text-[#111827] dark:text-white">
                  {token.counter}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Position
                </span>

                <span className="font-medium text-[#111827] dark:text-white">
                  {token.position}th in line
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Estimated Wait
                </span>

                <span className="font-medium text-[#111827] dark:text-white">
                  ~{token.wait}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Queue Progress
                </span>

                <span className="text-sm text-indigo-500 font-medium">
                  {token.progress}%
                </span>
              </div>

              <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${token.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                {token.status}
              </span>
            </div>

            <button
              onClick={handleCancelToken}
              className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Cancel Token
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyToken;