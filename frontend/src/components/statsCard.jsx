import React from "react";
import MiniGraph from "./MiniGraph";

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900

      border
      border-slate-200
      dark:border-slate-800

      rounded-3xl
      p-6

      hover:scale-105
      hover:shadow-xl

      transition-all
      duration-300

      overflow-hidden
      relative
      "
    >
      {/* Top */}

      <div className="flex items-center justify-between">
        <div>
          <p
            className="
            text-sm
            text-gray-500
            dark:text-gray-400
            "
          >
            {title}
          </p>

          <h2
            className="
            text-3xl
            font-bold
            mt-2

            text-gray-900
            dark:text-white
            "
          >
            {value}
          </h2>

          <p
            className="
            text-xs
            mt-1

            text-gray-500
            dark:text-gray-400
            "
          >
            {subtitle}
          </p>
        </div>

        {/* Icon */}

        <div
          className="
          h-14
          w-14

          rounded-2xl

          flex
          items-center
          justify-center

          text-white

          shadow-lg
          "
          style={{
            backgroundColor: color,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Mini Graph */}

      <MiniGraph color={color} />

      {/* Glow */}

      <div
        className="
        absolute
        -bottom-10
        -right-10

        w-32
        h-32

        rounded-full

        opacity-10
        blur-3xl
        "
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default StatsCard;