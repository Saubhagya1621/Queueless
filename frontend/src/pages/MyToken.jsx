import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { getMyToken, cancelToken } from "../utils/api";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

function MyToken() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const socketRef = useRef(null);
  const { user } = useAuth();

  const fetchToken = async () => {
    try {
      const data = await getMyToken();
      setToken(data.token);
      return data.token;
    } catch (err) {
      if (err?.response?.status === 404) {
        setToken(null);
      } else {
        setError("Could not load your token.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cleanup = () => {};

    fetchToken().then((currentToken) => {
      if (!currentToken) return;
      if (socketRef.current) socketRef.current.disconnect();

      const socket = io(
        import.meta.env.VITE_API_URL || "http://localhost:8000",
        {
          withCredentials: true,
        },
      );
      socketRef.current = socket;

      socket.emit(
        "join-room",
        currentToken.serviceCenterId?._id || currentToken.serviceCenterId,
      );
      socket.emit("join-room", user?.id);

      socket.emit("join-room", currentToken.userId?.toString() || currentToken.userId);
      socket.on("queue:updated", () => fetchToken());

      socket.on("token:called", ({ tokenId }) => {
        if (tokenId === currentToken._id.toString()) {
          toast.success("🔔 Your token is being called! Please proceed.", {
            duration: 6000,
          });
          fetchToken();
        }
      });

      cleanup = () => socket.disconnect();
    });

    return () => cleanup();
  }, []);

  const handleCancelToken = async () => {
    setCancelling(true);
    try {
      await cancelToken(token._id);
      setToken(null);
      if (socketRef.current) socketRef.current.disconnect();
    } catch (err) {
      setError("Could not cancel your token. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const getProgress = (position) => {
    if (!position || position <= 0) return 100;
    if (position === 1) return 90;
    if (position === 2) return 60;
    if (position === 3) return 40;
    if (position === 4) return 25;
    return Math.max(5, 30 - position * 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-300">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 pt-28">
          <div className="glass-card p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 pt-28 pb-12">
        {error && (
          <div className="mb-4 text-center text-sm text-red-500">{error}</div>
        )}

        {!token ? (
          <div className="glass-card p-10 text-center">
            <div className="text-6xl mb-4">🎫</div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              No Active Token
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              You don't have an active queue right now. Browse available
              services and join instantly.
            </p>

            <button
              onClick={() => (window.location.href = "/home")}
              className="glow-btn mt-6 px-6 py-3 rounded-xl text-white font-medium"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div
            className={`overflow-hidden glass-card ${
              token.status === "called"
                ? "ring-2 ring-green-400 shadow-[0_0_30px_rgba(74,222,128,0.4)]"
                : ""
            }`}
          >
            {/* Token Number */}
            <div className="bg-linear-to-r from-indigo-500 to-violet-600 p-8 text-center">
              <p className="text-indigo-100 mb-2">Your Token</p>

              <h1 className="text-6xl font-bold text-white">
                #{token.tokenNumber}
              </h1>
            </div>
            <div className="p-8">
              {/* Details */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Service Center
                  </span>
                  <span className="font-medium text-[#111827] dark:text-white">
                    {token.serviceCenterId?.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Location
                  </span>
                  <span className="font-medium text-[#111827] dark:text-white">
                    {token.serviceCenterId?.location || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Position
                  </span>
                  <span className="font-medium text-[#111827] dark:text-white">
                    {token.position} in line
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Estimated Wait
                  </span>
                  <span className="font-medium text-[#111827] dark:text-white">
                    ~{token.estimatedWait} min
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Status
                  </span>
                  <span className="font-medium capitalize text-[#111827] dark:text-white">
                    {token.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Queue Progress
                  </span>
                  <span className="text-sm text-indigo-500 font-medium">
                    {getProgress(token.position)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${getProgress(token.position)}%` }}
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-6 flex justify-center">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    token.status === "waiting"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : token.status === "called"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 animate-pulse"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {token.status.charAt(0).toUpperCase() + token.status.slice(1)}
                </span>
              </div>

              {/* Cancel Button */}
              <button
                onClick={handleCancelToken}
                disabled={cancelling || token.status === "called"}
                className="mt-8 w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all duration-200 hover:shadow-lg"
              >
                {cancelling ? "Cancelling..." : "Cancel Token"}
              </button>
            </div>
            {/* p-8 wrapper */}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyToken;
