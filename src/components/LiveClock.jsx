import React, { useEffect, useState } from "react";

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate =
    currentTime.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formattedTime =
    currentTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="flex flex-col items-end">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {formattedDate}
      </p>

      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {formattedTime}
      </h3>
    </div>
  );
};

export default LiveClock;