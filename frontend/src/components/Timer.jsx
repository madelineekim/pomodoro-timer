import React, { useState, useEffect } from 'react';
import { Circle } from 'rc-progress';
import { timerStore } from "../store/timerStore.js"
import {Howl} from 'howler';
import Alarm from "../assets/alarm.mp3";
import { useDataStore } from '../store/useDataStore.js';

export const Timer = () => {
    const { timerType, setTimerType, workHours, workMinutes, restHours, restMinutes } = timerStore();
    const { addNewData } = useDataStore();
    const [percentage, setPercentage] = useState(0);
    const [timeLeft, setTimeLeft] = useState(() => {
        const hours = timerType === "work" ? workHours : restHours;
        const minutes = timerType === "work" ? workMinutes : restMinutes;
      
        return hours * 3600 + minutes * 60;
      });

    const [startTime, setStartTime] = useState(timeLeft);
      
    useEffect(() => {
        const hours = timerType === "work" ? workHours : restHours;
        const minutes = timerType === "work" ? workMinutes : restMinutes;
      
        const newTime = hours * 3600 + minutes * 60;
        setStartTime(newTime);
        setTimeLeft(newTime);
      }, [timerType, workHours, workMinutes, restHours, restMinutes]);


    const [isRunning, setIsRunning] = useState(false);

    var alarm = new Howl({
        src: [Alarm]
      });

    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            alarm.play();
            setIsRunning(false);
            setTimerType();
            if (timerType == "work") {
              const timeInHours = startTime / 3600;
              addNewData(timeInHours)
            }
        }
    }, [timeLeft]);
    
    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;
    
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
    
            setPercentage(() => {
                return ((startTime - (timeLeft - 1)) / startTime) * 100;
            });
    
        }, 1000);
    
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, startTime]); 
    

    const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold mb-4">{timerType == "work" ? "Work" : "Rest"}</div>

            <div className="relative w-[400px] h-[400px] flex items-center justify-center mb-4">
                <Circle
                    percent={percentage}
                    strokeWidth={8} 
                    strokeColor="#dca54c"
                    trailWidth={8}
                    trailColor="#e6d1ad"
                    style={{ width: '100%', height: '100%' }}
                />
                
                <div className="absolute text-2xl font-mono">{formatTime(timeLeft)}</div>
            </div>

      <button
        onClick={() => setIsRunning(!isRunning)}
        className="btn m-1"
      >
        {isRunning ? "Stop Timer" : "Start Timer"}
      </button>
      <button
        onClick={() => {
            setTimeLeft(startTime);
            setPercentage(0);
          }}
          
        className="btn m-1"
        disabled={isRunning}
      >
        Reset Timer
      </button>
      <button
        onClick={() => setTimerType()}
        className="btn m-1"
        disabled={isRunning}
      >
        {timerType == "work" ? "Change to Rest" : "Change to work"}
      </button>
    </div>
  );
};

export default Timer;
