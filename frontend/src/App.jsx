import React from "react"
import {useEffect} from "react"
import Navbar from "./components/Navbar"
import Settings from "./pages/Settings"
import TimerPage from "./pages/TimerPage"
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"
import User from "./pages/User"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { Loader } from "lucide-react"



const App = () => {
  const {authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme="luxury">
      <Navbar />
      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/user" element={<User />} />
      </Routes>
      </div>
  )
}
 

export default App
