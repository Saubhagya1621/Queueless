import React from "react";

const StatusBadge = () => {
  return (
    <div
      className="
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-full

      bg-green-50
      dark:bg-green-500/10

      border
      border-green-200
      dark:border-green-500/20

      shadow-sm
      "
    >
      {/* Pulse Dot */}

      <span className="relative flex h-3 w-3">
        <span
          className="
          animate-ping
          absolute
          inline-flex
          h-full
          w-full
          rounded-full
          bg-green-400
          opacity-75
          "
        />

        <span
          className="
          relative
          inline-flex
          rounded-full
          h-3
          w-3
          bg-green-500
          "
        />
      </span>

      {/* Text */}

      <span
        className="
        text-sm
        font-semibold
        text-green-700
        dark:text-green-400
        "
      >
        Live Queue Active
      </span>
    </div>
  );
};

export default StatusBadge;