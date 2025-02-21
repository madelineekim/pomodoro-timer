import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const User = () => {
  const { logout } = useAuthStore();
  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
      Logout
    </button>
    </div>
  )
}

export default User
