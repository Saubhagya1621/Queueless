import { useState, useEffect } from "react";
import { getServiceCenterById, joinQueue } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joiningCounterId, setJoiningCounterId] = useState(null);
  const [joinError, setJoinError] = useState("");
  const [joinedToken, setJoinedToken] = useState(null);

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const data = await getServiceCenterById(id);
        setCenter(data.center);
      } catch (err) {
        setError("Failed to load service center");
      } finally {
        setLoading(false);
      }
    };
    fetchCenter();
  }, [id]);

  const handleJoinQueue = async (counterId) => {
    setJoiningCounterId(counterId);
    setJoinError("");
    try {
      const response = await joinQueue(id, counterId);
      setJoinedToken(response.token);
    } catch (err) {
      setJoinError(err?.response?.data?.message || "Failed to join queue");
    } finally {
      setJoiningCounterId(null);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 flex items-center justify-center">
        <Navbar />
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 flex items-center justify-center">
        <Navbar />
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!center)
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 flex items-center justify-center">
        <Navbar />
        <p className="text-gray-500">Service Center Not Found</p>
      </div>
    );

  const openCounters = center.counters.filter((c) => c.status === "open");

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 font-poppins transition-colors duration-300">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 pt-28 pb-7">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#111827] dark:text-white">
            {center.name}
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
            {center.type}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">📍 {center.location}</p>
        </div>

        {/* Queue Status */}
        <div className="bg-white dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-gray-800 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)] transition-all duration-200 p-6 mb-6">
          <h2 className="text-base font-medium text-[#111827] dark:text-white mb-4">
            Current Queue Status
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-semibold text-[#6366F1]">
                {center.totalWaiting}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">People Waiting</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#6366F1]">
                {center.totalWaiting === 0
                  ? "0 min"
                  : `${center.totalWaiting * 5} min`}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">Estimated Wait</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#6366F1]">
                {openCounters.length}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">Active Counters</p>
            </div>
          </div>
        </div>

        {/* Counters */}
        <div className="bg-white dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-gray-800 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)] transition-all duration-200 p-6 mb-6">
          <h2 className="text-base font-medium text-[#111827] dark:text-white mb-4">
            Available Counters
          </h2>

          {joinError && (
            <p className="text-sm text-red-500 mb-3">{joinError}</p>
          )}

          <div className="space-y-4">
            {center.counters.map((counter) => (
              <div
                key={counter._id}
                className="flex items-center justify-between bg-white dark:bg-gray-900/70 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)] transition-all duration-200"
              >
                <div>
                  <p className="font-medium text-[#111827] dark:text-white">
                    {counter.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Serving token #{counter.currentToken}
                  </p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
                      counter.status === "open"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {counter.status === "open" ? "Open" : "Closed"}
                  </span>
                </div>

                <button
                  onClick={() => handleJoinQueue(counter._id)}
                  disabled={
                    counter.status !== "open" ||
                    joiningCounterId === counter._id ||
                    !!joinedToken
                  }
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {joiningCounterId === counter._id
                    ? "Joining..."
                    : "Join Queue"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Token Confirmation */}
        {joinedToken && (
          <div className="bg-[#ECFDF5] dark:bg-gray-900/70 backdrop-blur-xl border border-[#10B981]/30 dark:border-gray-800 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)] transition-all duration-200 p-5 text-center">
            <p className="text-lg font-semibold text-[#111827] dark:text-white mb-3">
              ✅ You've joined the queue!
            </p>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-indigo-600">
                #{joinedToken.tokenNumber}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your Token Number
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Position:{" "}
                <span className="font-semibold">{joinedToken.position}</span>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Estimated Wait:{" "}
                <span className="font-semibold">
                  {joinedToken.estimatedWait} min
                </span>
              </p>
            </div>
            <button
              onClick={() => navigate("/my-token")}
              className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 text-sm font-medium"
            >
              Track My Token →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ServiceDetail;
