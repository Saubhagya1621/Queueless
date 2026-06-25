import React from "react";
import {
  FaClock,
  FaChevronRight,
} from "react-icons/fa";

const QueueItem = ({
  item,
}) => {

  const getEtaColor = () => {
    switch (item.color) {
      case "green":
        return `
          bg-green-100
          text-green-600
          dark:bg-green-500/10
          dark:text-green-400
        `;

      case "orange":
        return `
          bg-orange-100
          text-orange-600
          dark:bg-orange-500/10
          dark:text-orange-400
        `;

      case "red":
        return `
          bg-red-100
          text-red-600
          dark:bg-red-500/10
          dark:text-red-400
        `;

      default:
        return `
          bg-indigo-100
          text-indigo-600
          dark:bg-indigo-500/10
          dark:text-indigo-400
        `;
    }
  };

  // Left status indicator bar — green=called, yellow=waiting
  const getStatusBarColor = () => {
    switch (item.status) {
      case "called":
        return "bg-green-500";

      case "waiting":
        return "bg-yellow-500";

      default:
        return "bg-slate-300 dark:bg-slate-700";
    }
  };

  return (
    <div
      className="
      group

      relative

      bg-white
      dark:bg-gray-900/70
      dark:backdrop-blur-xl

      border
      border-slate-200
      dark:border-slate-800

      rounded-2xl

      pl-6
      pr-5
      py-5

      overflow-hidden

      shadow-[0_10px_35px_rgba(0,0,0,0.12)]
      hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)]

      hover:-translate-y-1

      transition-all
      duration-200

      cursor-pointer
      "
    >
      {/* Left status indicator bar */}
      <div
        className={`
        absolute
        left-0
        top-0
        h-full
        w-1.5

        ${getStatusBarColor()}
        `}
      />

      <div className="flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Token */}

          <div
            className="
            h-12
            w-12

            rounded-xl

            bg-indigo-500
            text-white

            flex
            items-center
            justify-center

            font-bold
            "
          >
            {item.token.split("-")[1]}
          </div>

          {/* Info */}

          <div>
            <h3
              className="
              font-semibold

              text-gray-900
              dark:text-white
              "
            >
              {item.name}
            </h3>

            <p
              className="
              text-sm

              text-gray-500
              dark:text-gray-400
              "
            >
              {item.service}
            </p>

            <span
              className="
              text-xs
              font-medium

              text-indigo-600
              dark:text-indigo-400
              "
            >
              {item.token}
            </span>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* ETA */}

          <div
            className={`
            px-3
            py-2

            rounded-xl

            flex
            items-center
            gap-2

            text-xs
            font-semibold

            ${getEtaColor()}
            `}
          >
            <FaClock />

            {item.eta}
          </div>

          {/* Arrow */}

          <FaChevronRight
            className="
            opacity-0

            group-hover:opacity-100

            transition-all
            duration-300
            "
          />
        </div>

      </div>
    </div>
  );
};

export default QueueItem;