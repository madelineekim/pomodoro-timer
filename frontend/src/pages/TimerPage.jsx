import React from 'react'
import { useState } from "react"
import { useTimerStore } from "../store/useTimerStore"
import { Timer } from "../components/Timer"

const TimerPage = () => {
    const [workTimerOn, setWorkTimerOn] = useState(true);
    const [restTimerOn, setRestTimerOn] = useState(false);
    const { workHours, workMinutes, restHours, restMinutes} = useTimerStore();

  return (
    <div className="h-screen bg-base-300 flex items-center justify-center">
        <Timer hours={workHours} minutes={workMinutes} />
    </div>
  )
}

export default TimerPage
