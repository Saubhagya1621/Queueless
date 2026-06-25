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
  status: t.status,
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

  // ---- Skeleton loader ----
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-300">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-10 animate-pulse">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <div className="h-10 w-72 bg-slate-200 dark:bg-slate-800 rounded-xl mb-3" />
              <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
            <div className="flex flex-col items-end gap-2 mt-4 lg:mt-0">
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white dark:bg-[#07111f] border border-slate-200 dark:border-slate-800 shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="h-7 w-32 bg-slate-200 dark:bg-slate-800 rounded-full mb-6" />
                    <div className="h-20 w-64 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
                    <div className="h-6 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg mb-2" />
                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="flex gap-3 mt-8">
                      <div className="flex-1 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                      <div className="flex-1 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                      <div className="flex-1 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                    </div>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <div className="h-64 w-64 bg-slate-100 dark:bg-slate-900 rounded-3xl" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5 mt-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900/70 dark:backdrop-blur-xl rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-slate-200 dark:border-slate-800 p-6"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800 mb-4" />
                    <div className="h-7 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg mb-2" />
                    <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#07111f] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.12)]">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              </div>
              <div className="p-4 space-y-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-slate-100 dark:bg-slate-900 rounded-2xl"
                  />
                ))}
              </div>
              <div className="p-4">
                <div className="h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-300">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
          <div className="bg-white dark:bg-[#07111f] rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-red-100 dark:border-red-900/40 p-10 text-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );

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
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white dark:bg-[#07111f] border border-slate-200 dark:border-slate-800 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)] p-8 transition-all duration-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium">
                    NOW SERVING
                  </span>

                  {currentToken ? (
                    <>
                      <h1 className="text-7xl md:text-8xl font-black bg-linear-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent tracking-widest mt-6">
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
                    <div className="flex flex-col items-start mt-8">
                      <div className="h-14 w-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                        <FaUsers size={22} className="text-indigo-500" />
                      </div>
                      <p className="text-slate-400 dark:text-slate-500 text-lg">
                        No token currently serving
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={handleCallNext}
                      disabled={queue.length === 0}
                      className="flex-1 border-2 border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl py-4 font-semibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Call Next
                    </button>
                    <button
                      onClick={handleSkip}
                      disabled={!currentToken}
                      className="flex-1 border-2 border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl py-4 font-semibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Skip
                    </button>
                    <button
                      onClick={handleSkip}
                      disabled={!currentToken}
                      className="flex-1 border-2 border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl py-4 font-semibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
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

          <div className="bg-white dark:bg-[#07111f] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)] transition-all duration-200">
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
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                    <FaUsers size={22} className="text-indigo-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Queue is empty
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    New walk-ins will appear here.
                  </p>
                </div>
              ) : (
                queue.map((item) => <QueueItem key={item.id} item={item} />)
              )}
            </div>

            <div className="p-4">
              <button
                onClick={handleAddWalkIn}
                className="w-full bg-linear-to-r from-indigo-500 to-violet-600 hover:-translate-y-1 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 active:scale-95 shadow-lg transition-all duration-200"
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