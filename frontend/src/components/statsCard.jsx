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
      group
      bg-white
      dark:bg-gray-900/70
      dark:backdrop-blur-xl

      border
      border-slate-200
      dark:border-slate-800

      rounded-2xl
      p-6

      shadow-[0_10px_35px_rgba(0,0,0,0.12)]
      hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)]

      hover:-translate-y-1

      transition-all
      duration-200

      overflow-hidden
      relative
      "
    >
      {/* Subtle colored background tint per stat type */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Top: Icon */}
      <div className="relative flex items-center justify-between">
        <div
          className="
          h-12
          w-12

          rounded-2xl

          flex
          items-center
          justify-center

          text-white

          shadow-lg

          group-hover:scale-110
          transition-transform
          duration-200
          "
          style={{
            backgroundColor: color,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Big bold number */}
      <h2
        className="
        relative
        text-3xl
        font-bold
        mt-4

        text-gray-900
        dark:text-white
        "
      >
        {value}
      </h2>

      {/* Label below */}
      <p
        className="
        relative
        text-sm
        font-medium
        mt-1

        text-gray-500
        dark:text-gray-400
        "
      >
        {title}
      </p>

      {subtitle && (
        <p
          className="
          relative
          text-xs
          mt-1

          text-gray-400
          dark:text-gray-500
          "
        >
          {subtitle}
        </p>
      )}

      {/* Mini Graph */}
      <div className="relative">
        <MiniGraph color={color} />
      </div>

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
