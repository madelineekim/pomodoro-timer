import React from 'react'
import { useTimerStore } from "../store/useTimerStore"
import { Timer } from "../components/Timer"

const TimerPage = () => {

  return (
    <div className="h-screen bg-base-300 flex items-center justify-center">
        <Timer />
    </div>
  )
}

export default TimerPage
