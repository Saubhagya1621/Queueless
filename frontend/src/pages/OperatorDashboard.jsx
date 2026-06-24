import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import LiveClock from "../components/LiveClock";
import StatusBadge from "../components/StatusBadge";
import StatsCard from "../components/StatsCard";
import QueueItem from "../components/QueueItem";
import {
  getQueueForCounter,
  callNextToken,
  skipToken,
  addWalkIn,
} from "../utils/api";
import { FaUsers, FaClock, FaChartLine, FaPlus } from "react-icons/fa";
import { io } from "socket.io-client";

const formatToken = (num) => `A-${String(num).padStart(3, "0")}`;

const mapToken = (t, index) => ({
  id: t._id,
  token: formatToken(t.tokenNumber),
  name: t.userId?.name || "Customer",
  service: "General Service",
  eta: `${(index + 1) * 5} min`,
  color: index === 0 ? "green" : index === 1 ? "orange" : "red",
});

const OperatorDashboard = () => {
  const [currentToken, setCurrentToken] = useState(null);
  const [queue, setQueue] = useState([]);
  const [servedToday, setServedToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQueue = useCallback(async () => {
    try {
      const data = await getQueueForCounter();
      const tokens = data.tokens || [];

      const called = tokens.find((t) => t.status === "called");
      const waiting = tokens.filter((t) => t.status === "waiting");

      setCurrentToken(called ? mapToken(called, 0) : null);
      setQueue(waiting.map((t, i) => mapToken(t, i)));
    } catch (err) {
      console.error(err);
      setError("Failed to load queue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:8000", {
      withCredentials: true,
    });

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.serviceCenterId) {
      socket.emit("join-room", user.serviceCenterId);
    }

    socket.on("queue:updated", () => {
      fetchQueue();
    });

    return () => socket.disconnect();
  }, [fetchQueue]);

  const handleCallNext = async () => {
    try {
      await callNextToken();
      setServedToday((prev) => prev + 1);
      await fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkip = async () => {
    if (!currentToken) return;
    try {
      await skipToken(currentToken.id);
      await fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddWalkIn = async () => {
    try {
      await addWalkIn();
      await fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-slate-500">
        Loading dashboard...
      </div>
    );
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-300">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Operator Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Manage live queue efficiently
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 mt-4 lg:mt-0">
            <LiveClock />
            <StatusBadge />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            {/* NOW SERVING */}
            <div className="rounded-4xl bg-white dark:bg-[#07111f] border border-slate-200 dark:border-slate-800 shadow-xl p-8 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium">
                    NOW SERVING
                  </span>

                  {currentToken ? (
                    <>
                      <h1 className="text-7xl md:text-8xl font-black text-indigo-600 dark:text-white tracking-widest mt-6">
                        {currentToken.token}
                      </h1>
                      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-4">
                        {currentToken.name}
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 mt-2">
                        {currentToken.service}
                      </p>
                    </>
                  ) : (
                    <p className="text-slate-400 dark:text-slate-500 mt-8 text-lg">
                      No token currently serving
                    </p>
                  )}

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={handleCallNext}
                      disabled={queue.length === 0}
                      className="flex-1 border-2 border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl py-4 font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Call Next
                    </button>
                    <button
                      onClick={handleSkip}
                      disabled={!currentToken}
                      className="flex-1 border-2 border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl py-4 font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Skip
                    </button>
                    <button
                      onClick={handleSkip}
                      disabled={!currentToken}
                      className="flex-1 border-2 border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl py-4 font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      No Show
                    </button>
                  </div>
                </div>

                <div className="hidden md:flex justify-center">
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4">
                    <img
                      src="/src/assets/Consulting-amico.png"
                      alt="QueueLess"
                      className="w-[320px] hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              <StatsCard
                title="People Waiting"
                value={queue.length}
                subtitle="Current Queue"
                icon={<FaUsers size={22} />}
                color="#6366F1"
              />
              <StatsCard
                title="Average Wait"
                value={`${queue.length * 5} min`}
                subtitle="Estimated"
                icon={<FaClock size={22} />}
                color="#10B981"
              />
              <StatsCard
                title="Served Today"
                value={servedToday}
                subtitle="Daily Count"
                icon={<FaChartLine size={22} />}
                color="#8B5CF6"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white dark:bg-[#07111f] border border-slate-200 dark:border-slate-800 rounded-4xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Upcoming Queue
                </h2>
                <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                  {queue.length} Waiting
                </span>
              </div>
            </div>

            <div className="p-4 space-y-4 max-h-155 overflow-y-auto">
              {queue.length === 0 ? (
                <p className="text-center text-slate-400 dark:text-slate-500 py-8 text-sm">
                  Queue is empty
                </p>
              ) : (
                queue.map((item) => <QueueItem key={item.id} item={item} />)
              )}
            </div>

            <div className="p-4">
              <button
                onClick={handleAddWalkIn}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-lg transition-all duration-300"
              >
                <FaPlus /> Add Walk-In
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            QueueLess © 2026 • Smart Queue Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
