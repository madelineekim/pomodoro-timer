import React from "react"
import Navbar from "./components/Navbar"
import Settings from "./pages/Settings"
import TimerPage from "./pages/TimerPage"
import { Routes, Route } from "react-router-dom"



const App = () => {


  return (
    <div data-theme="luxury">
      <Navbar />
      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </div>
  )
}
 

export default App
