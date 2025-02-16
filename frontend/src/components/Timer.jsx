import React, { useState, useEffect } from 'react';

export const Timer = ({ hours, minutes }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const totalSeconds = hours * 3600 + minutes * 60;
    return totalSeconds;
  });

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold mb-4">Countdown</div>
      <div className="text-xl font-mono">{formatTime(timeLeft)}</div>
      <button
        onClick={() => setIsRunning(true)}
        className="btn m-1"
        disabled={isRunning || timeLeft <= 0}
      >
        Start Timer
      </button>
    </div>
  );
};

export default Timer;
