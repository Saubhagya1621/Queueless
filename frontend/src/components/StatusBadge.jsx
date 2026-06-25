import React from "react";

const STATUS_CONFIG = {
  called: {
    label: "Called",
    dot: "bg-green-500",
    ping: "bg-green-400",
    bg: "bg-green-50 dark:bg-green-500/10",
    border: "border-green-200 dark:border-green-500/20",
    text: "text-green-700 dark:text-green-400",
  },
  waiting: {
    label: "Waiting",
    dot: "bg-yellow-500",
    ping: "bg-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-500/10",
    border: "border-yellow-200 dark:border-yellow-500/20",
    text: "text-yellow-700 dark:text-yellow-400",
  },
  active: {
    label: "Live Queue Active",
    dot: "bg-green-500",
    ping: "bg-green-400",
    bg: "bg-green-50 dark:bg-green-500/10",
    border: "border-green-200 dark:border-green-500/20",
    text: "text-green-700 dark:text-green-400",
  },
};

const StatusBadge = ({ status = "active", label }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.active;

  return (
    <div
      className={`
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-full

      ${config.bg}

      border
      ${config.border}

      shadow-sm
      `}
    >
      {/* Pulse Dot */}

      <span className="relative flex h-3 w-3">
        <span
          className={`
          animate-ping
          absolute
          inline-flex
          h-full
          w-full
          rounded-full
          ${config.ping}
          opacity-75
          `}
        />

        <span
          className={`
          relative
          inline-flex
          rounded-full
          h-3
          w-3
          ${config.dot}
          `}
        />
      </span>

      {/* Text */}

      <span
        className={`
        text-sm
        font-semibold
        ${config.text}
        `}
      >
        {label || config.label}
      </span>
    </div>
  );
};

export default StatusBadge;