import React from 'react'
import { useTimerStore } from "../store/useTimerStore"

const Settings = () => {
    const { workHours, workMinutes, restHours, restMinutes, setWorkHours, setWorkMinutes, setRestHours, setRestMinutes } = useTimerStore();

  return (
    <div className="center-div flex gap-2 justify-center items-center h-screen bg-base-300 ">
      <details className="dropdown">
        <summary className="btn m-1">{workHours} Hours</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-24 p-2 shadow-sm">
        <li><a onClick={() => setWorkHours(0)}>0</a></li>
        <li><a onClick={() => setWorkHours(1)}>1</a></li>
        <li><a onClick={() => setWorkHours(2)}>2</a></li>
        <li><a onClick={() => setWorkHours(3)}>3</a></li>
        <li><a onClick={() => setWorkHours(4)}>4</a></li>
        <li><a onClick={() => setWorkHours(5)}>5</a></li>
      </ul>
      </details>
      <details className="dropdown">
        <summary className="btn m-1">{workMinutes} Minutes</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-27 p-2 shadow-sm">
        <li><a onClick={() => setWorkMinutes(0)}>0</a></li>
        <li><a onClick={() => setWorkMinutes(15)}>15</a></li>
        <li><a onClick={() => setWorkMinutes(30)}>30</a></li>
        <li><a onClick={() => setWorkMinutes(45)}>45</a></li>
      </ul>
      </details>

      <details className="dropdown">
        <summary className="btn m-1">{restHours} Hours</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-24 p-2 shadow-sm">
        <li><a onClick={() => setRestHours(0)}>0</a></li>
        <li><a onClick={() => setRestHours(1)}>1</a></li>
        <li><a onClick={() => setRestHours(2)}>2</a></li>
        <li><a onClick={() => setRestHours(3)}>3</a></li>
        <li><a onClick={() => setRestHours(4)}>4</a></li>
        <li><a onClick={() => setRestHours(5)}>5</a></li>
      </ul>
      </details>
      <details className="dropdown">
        <summary className="btn m-1">{restMinutes} Minutes</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-27 p-2 shadow-sm">
        <li><a onClick={() => setRestMinutes(0)}>0</a></li>
        <li><a onClick={() => setRestMinutes(5)}>5</a></li>
        <li><a onClick={() => setRestMinutes(10)}>10</a></li>
        <li><a onClick={() => setRestMinutes(15)}>15</a></li>
      </ul>
      </details>
    </div>
  )
}

export default Settings
