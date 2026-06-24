import { useEffect, useState } from "react";
import { getAdminOverview, toggleCounter } from "../utils/api";
import Navbar from "../components/Navbar";

function AdminOverview() {
  const [center, setCenter] = useState(null);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await getAdminOverview();
        setCenter(data.center || null);
        setSummary(data.summary || {});
      } catch (err) {
        console.error(err);
        setError("Failed to load admin overview");
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  const handleToggle = async (counterId, newStatus) => {
    try {
      await toggleCounter(center._id, counterId, newStatus);
      setCenter((prev) => ({
        ...prev,
        counters: prev.counters.map((c) =>
          c._id === counterId ? { ...c, status: newStatus } : c
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Admin Overview...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  const summaryCards = [
    { label: "Waiting", value: summary.totalWaiting ?? 0 },
    { label: "Served", value: summary.totalServed ?? 0 },
    { label: "Counters", value: summary.totalCounters ?? 0 },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 font-poppins transition-colors duration-300">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-8">
        <h1 className="text-2xl font-semibold text-[#111827] dark:text-white mb-1">
          Admin Overview
        </h1>
        {center && (
          <p className="text-sm text-[#6B7280] dark:text-gray-400 mb-6">
            {center.name} — {center.location}
          </p>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {summaryCards.map((item) => (
            <div
              key={item.label}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5"
            >
              <p className="text-2xl font-semibold text-[#6366F1]">{item.value}</p>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Counters list */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-base font-medium text-[#111827] dark:text-white mb-4">
            Counters
          </h2>
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {center?.counters.map((counter) => (
              <li key={counter._id} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium text-[#111827] dark:text-white">
                    {counter.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        counter.status === "open"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-[#F59E0B]/10 text-[#F59E0B]"
                      }`}
                    >
                      {counter.status === "open" ? "Open" : "Closed"}
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      {counter.currentToken ?? 0} serving
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(counter._id, "open")}
                    disabled={counter.status === "open"}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#6366F1] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#4F46E5] transition-colors"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleToggle(counter._id, "closed")}
                    disabled={counter.status === "closed"}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-[#111827] dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default AdminOverview;