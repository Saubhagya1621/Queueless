import { useEffect, useState } from "react";
import {
  getAdminOverview,
  toggleCounter,
  getOperatorScorecard,
} from "../utils/api";
import Navbar from "../components/Navbar";
import {
  FaUserClock,
  FaCheckCircle,
  FaThLarge,
  FaChartBar,
} from "react-icons/fa";

function AdminOverview() {
  const [center, setCenter] = useState(null);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scorecard, setScorecard] = useState([]);
  const [scorecardLoading, setScorecardLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await getAdminOverview();
        setCenter(data.center || null);
        setSummary(data.summary || {});
        try {
          const scorecardData = await getOperatorScorecard();
          setScorecard(scorecardData.scorecard || []);
        } catch {
          setScorecard([]);
        } finally {
          setScorecardLoading(false);
        }
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
          c._id === counterId ? { ...c, status: newStatus } : c,
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // ---- Skeleton loader ----
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 font-poppins transition-colors duration-300">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 pt-24 pb-8 animate-pulse">
          <div className="h-7 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg mb-2" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900/70 dark:backdrop-blur-xl rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-800 p-6"
              >
                <div className="h-12 w-12 rounded-2xl bg-gray-200 dark:bg-gray-800 mb-4" />
                <div className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg mb-2" />
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg" />
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-900/70 dark:backdrop-blur-xl rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-800 p-6">
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-t border-gray-100 dark:border-gray-800 first:border-t-0"
              >
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  <div className="h-7 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-900/70 dark:backdrop-blur-xl rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-800 p-6 mt-6">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-t border-gray-100 dark:border-gray-800 first:border-t-0"
              >
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                </div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-full" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 font-poppins transition-colors duration-300">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 pt-24 pb-8">
          <div className="bg-white dark:bg-gray-900/70 dark:backdrop-blur-xl rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-red-100 dark:border-red-900/40 p-10 text-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  const summaryCards = [
    {
      label: "Waiting",
      value: summary.totalWaiting ?? 0,
      icon: <FaUserClock size={20} />,
      color: "#F59E0B",
    },
    {
      label: "Served",
      value: summary.totalServed ?? 0,
      icon: <FaCheckCircle size={20} />,
      color: "#10B981",
    },
    {
      label: "Counters",
      value: summary.totalCounters ?? 0,
      icon: <FaThLarge size={20} />,
      color: "#6366F1",
    },
  ];

  const hasCounters = center?.counters && center.counters.length > 0;

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
              className="
              group
              relative
              overflow-hidden

              bg-white
              dark:bg-gray-900/70
              dark:backdrop-blur-xl

              rounded-2xl

              shadow-[0_10px_35px_rgba(0,0,0,0.12)]
              hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)]

              hover:-translate-y-1

              transition-all
              duration-200

              border border-gray-100 dark:border-gray-800
              p-6
              "
            >
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundColor: item.color }}
              />

              <div
                className="
                relative
                h-12 w-12
                rounded-2xl
                flex items-center justify-center
                text-white
                shadow-lg
                mb-4

                group-hover:scale-110
                transition-transform
                duration-200
                "
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>

              <p className="relative text-3xl font-bold text-[#111827] dark:text-white">
                {item.value}
              </p>
              <p className="relative text-xs text-[#6B7280] dark:text-gray-400 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Counters list */}
        <div className="bg-white dark:bg-gray-900/70 dark:backdrop-blur-xl rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-base font-medium text-[#111827] dark:text-white mb-4">
            Counters
          </h2>

          {hasCounters ? (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {center.counters.map((counter) => (
                <li
                  key={counter._id}
                  className="flex items-center justify-between py-4"
                >
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
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="h-14 w-14 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center mb-4">
                <FaThLarge size={22} className="text-[#6366F1]" />
              </div>
              <p className="text-sm font-medium text-[#111827] dark:text-white">
                No counters yet
              </p>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1 max-w-xs">
                Counters will show up here once they are added to this center.
              </p>
            </div>
          )}
        </div>
        {/* Operator Scorecard */}
        <div className="bg-white dark:bg-gray-900/70 dark:backdrop-blur-xl rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-800 p-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <FaChartBar className="text-[#6366F1]" size={16} />
            <h2 className="text-base font-medium text-[#111827] dark:text-white">
              Operator Scorecard
            </h2>
          </div>

          {scorecardLoading ? (
            <div className="animate-pulse space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-800 first:border-t-0"
                >
                  <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-full" />
                </div>
              ))}
            </div>
          ) : scorecard.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="h-14 w-14 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center mb-4">
                <FaChartBar size={22} className="text-[#6366F1]" />
              </div>
              <p className="text-sm font-medium text-[#111827] dark:text-white">
                No operator data yet
              </p>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1 max-w-xs">
                Data appears once operators start serving tokens.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {scorecard.map((op) => (
                <li key={op.operatorId} className="py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-[#111827] dark:text-white">
                        {op.name}
                      </p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-[#6B7280]">
                          Served:{" "}
                          <span className="font-medium text-[#111827] dark:text-white">
                            {op.totalServed}
                          </span>
                        </span>
                        <span className="text-xs text-[#6B7280]">
                          Avg:{" "}
                          <span className="font-medium text-[#111827] dark:text-white">
                            {op.avgServiceTime} min
                          </span>
                        </span>
                        <span className="text-xs text-[#6B7280]">
                          Skip:{" "}
                          <span className="font-medium text-[#111827] dark:text-white">
                            {op.skipRate}%
                          </span>
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        op.performance >= 70
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : op.performance >= 40
                            ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                            : "bg-red-100 text-red-500"
                      }`}
                    >
                      {op.performance}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${op.performance}%`,
                        backgroundColor:
                          op.performance >= 70
                            ? "#10B981"
                            : op.performance >= 40
                              ? "#F59E0B"
                              : "#EF4444",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminOverview;
