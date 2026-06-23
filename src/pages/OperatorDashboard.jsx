import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import LiveClock from "../components/LiveClock";
import StatusBadge from "../components/StatusBadge";
import StatsCard from "../components/StatsCard";
import QueueItem from "../components/QueueItem";

import queueData, {
  currentServingData,
} from "../data/queueData";

import {
  FaUsers,
  FaClock,
  FaChartLine,
  FaPlus,
} from "react-icons/fa";

const OperatorDashboard = () => {

  const [currentToken, setCurrentToken] =
    useState(currentServingData);

  const [queue, setQueue] =
    useState(queueData);

  const [servedToday, setServedToday] =
    useState(124);

  const [avgWait] =
    useState("12 min");

  useEffect(() => {
    localStorage.setItem(
      "queue",
      JSON.stringify(queue)
    );
  }, [queue]);

  const moveToNextCustomer = () => {

    if (queue.length === 0) return;

    const nextCustomer = queue[0];

    setCurrentToken(nextCustomer);

    setQueue(
      queue.slice(1)
    );

    setServedToday(
      prev => prev + 1
    );

    /*
    Backend Later

    PATCH
    /api/v1/operator/call-next

    */
  };

  const handleCallNext = () => {
    moveToNextCustomer();
  };

  const handleSkip = () => {
    moveToNextCustomer();

    /*
    PATCH
    /api/v1/operator/skip
    */
  };

  const handleNoShow = () => {
    moveToNextCustomer();

    /*
    PATCH
    /api/v1/operator/no-show
    */
  };

  const handleAddWalkIn = () => {

    const nextNumber =
      queue.length + 45;

    const newToken = {
      id: Date.now(),

      token: `A-${String(
        nextNumber
      ).padStart(3, "0")}`,

      name: "Walk-In Customer",

      service:
        "General Consultation",

      eta: "20 min",

      color: "green",
    };

    setQueue(prev => [
      ...prev,
      newToken,
    ]);

    /*
    POST
    /api/v1/operator/walkin
    */
  };  return (
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

        {/* Main Grid */}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}

          <div className="lg:col-span-2">

            {/* NOW SERVING CARD */}

            <div
              className="
              rounded-4xl

              bg-white
              dark:bg-[#07111f]

              border
              border-slate-200
              dark:border-slate-800

              shadow-xl

              p-8

              transition-all
              duration-300
              "
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">

                {/* LEFT CONTENT */}

                <div>

                  <span
                    className="
                    bg-indigo-100
                    dark:bg-indigo-500/10

                    text-indigo-600
                    dark:text-indigo-300

                    px-4
                    py-2

                    rounded-full

                    text-sm
                    font-medium
                    "
                  >
                    NOW SERVING
                  </span>

                  <h1
                    className="
                    text-7xl
                    md:text-8xl

                    font-black

                    text-indigo-600
                    dark:text-white

                    tracking-widest

                    mt-6
                    "
                  >
                    {currentToken.token}
                  </h1>

                  <h2
                    className="
                    text-2xl
                    font-semibold

                    text-slate-900
                    dark:text-white

                    mt-4
                    "
                  >
                    {currentToken.name}
                  </h2>

                  <p
                    className="
                    text-slate-500
                    dark:text-slate-400

                    mt-2
                    "
                  >
                    {currentToken.service}
                  </p>

                  {/* BUTTONS */}

                  <div className="flex gap-3 mt-8">

                    {/* Call Next */}

                    <button
                      onClick={handleCallNext}
                      className="
                      flex-1

                      border-2
                      border-green-500

                      bg-green-50
                      dark:bg-green-500/10

                      text-green-600
                      dark:text-green-400

                      rounded-2xl

                      py-4

                      font-semibold

                      hover:scale-105
                      hover:shadow-[0_0_25px_rgba(34,197,94,0.35)]

                      transition-all
                      duration-300
                      "
                    >
                      Call Next
                    </button>

                    {/* Skip */}

                    <button
                      onClick={handleSkip}
                      className="
                      flex-1

                      border-2
                      border-amber-500

                      bg-amber-50
                      dark:bg-amber-500/10

                      text-amber-600
                      dark:text-amber-400

                      rounded-2xl

                      py-4

                      font-semibold

                      hover:scale-105
                      hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]

                      transition-all
                      duration-300
                      "
                    >
                      Skip
                    </button>

                    {/* No Show */}

                    <button
                      onClick={handleNoShow}
                      className="
                      flex-1

                      border-2
                      border-red-500

                      bg-red-50
                      dark:bg-red-500/10

                      text-red-600
                      dark:text-red-400

                      rounded-2xl

                      py-4

                      font-semibold

                      hover:scale-105
                      hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]

                      transition-all
                      duration-300
                      "
                    >
                      No Show
                    </button>

                  </div>

                </div>

                {/* RIGHT ILLUSTRATION */}

                <div className="hidden md:flex justify-center">

                  <div
                    className="
                    bg-slate-50
                    dark:bg-slate-900

                    border
                    border-slate-200
                    dark:border-slate-800

                    rounded-3xl

                    p-4
                    "
                  >
                    <img
                      src="/src/assets/Consulting-amico.png"
                      alt="QueueLess"

                      className="
                      w-[320px]

                      hover:scale-105

                      transition-all
                      duration-500
                      "
                    />
                  </div>

                </div>

              </div>

            </div>
                        {/* STATS CARDS */}

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
                value={avgWait}
                subtitle="Updated Live"
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

          <div
            className="
            bg-white
            dark:bg-[#07111f]

            border
            border-slate-200
            dark:border-slate-800

            rounded-4xl

            overflow-hidden

            shadow-xl
            "
          >

            {/* HEADER */}

            <div
              className="
              p-6

              border-b
              border-slate-200
              dark:border-slate-800
              "
            >
              <div className="flex items-center justify-between">

                <h2
                  className="
                  text-xl
                  font-bold

                  text-slate-900
                  dark:text-white
                  "
                >
                  Upcoming Queue
                </h2>

                <span
                  className="
                  px-3
                  py-1

                  rounded-full

                  bg-indigo-100
                  dark:bg-indigo-500/10

                  text-indigo-600
                  dark:text-indigo-400

                  text-sm
                  font-medium
                  "
                >
                  {queue.length} Waiting
                </span>

              </div>

            </div>

            {/* QUEUE LIST */}

            <div className="p-4 space-y-4 max-h-155 overflow-y-auto">

              {queue.map((item) => (
                <QueueItem
                  key={item.id}
                  item={item}
                />
              ))}

            </div>

            {/* ADD WALK-IN */}

            <div className="p-4">

              <button
                onClick={handleAddWalkIn}
                className="
                w-full

                bg-indigo-600
                hover:bg-indigo-700

                text-white

                rounded-2xl

                py-4

                font-semibold

                flex
                items-center
                justify-center
                gap-2

                hover:scale-[1.02]
                active:scale-95

                shadow-lg

                transition-all
                duration-300
                "
              >
                <FaPlus />

                Add Walk-In
              </button>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="mt-10 text-center">

          <p
            className="
            text-sm

            text-slate-500
            dark:text-slate-400
            "
          >
            QueueLess © 2026 • Smart Queue Management System
          </p>

        </div>

      </div>

    </div>
  );
};

export default OperatorDashboard;