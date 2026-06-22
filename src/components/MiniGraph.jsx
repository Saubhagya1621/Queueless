import React from "react";

const MiniGraph = ({
  color = "#6366F1",
}) => {
  return (
    <div className="mt-4">
      <svg
        viewBox="0 0 120 40"
        className="w-full h-12"
      >
        {/* Gradient */}

        <defs>
          <linearGradient
            id="graphGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor={color}
              stopOpacity="0.2"
            />

            <stop
              offset="100%"
              stopColor={color}
              stopOpacity="0.9"
            />
          </linearGradient>
        </defs>

        {/* Area */}

        <path
          d="
          M0 30
          L20 25
          L40 28
          L60 15
          L80 20
          L100 10
          L120 5
          L120 40
          L0 40
          Z
          "
          fill="url(#graphGradient)"
          opacity="0.25"
        />

        {/* Line */}

        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="
            0,30
            20,25
            40,28
            60,15
            80,20
            100,10
            120,5
          "
        />

        {/* Dots */}

        <circle
          cx="60"
          cy="15"
          r="3"
          fill={color}
        />

        <circle
          cx="100"
          cy="10"
          r="3"
          fill={color}
        />

        <circle
          cx="120"
          cy="5"
          r="4"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default MiniGraph;