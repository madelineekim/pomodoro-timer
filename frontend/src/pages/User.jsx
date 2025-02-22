import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useDataStore } from '../store/useDataStore'
import BarChart from '../components/BarChart';
import { useEffect } from 'react';


const User = () => {
  const { logout } = useAuthStore();

  const {weekData, getWeekData} = useDataStore();
  useEffect(() => {
    getWeekData();
  }, [getWeekData]);

  // Condense the list by summing hours for the same date
  const condensedWeekData = (weekData || []).reduce((acc, record) => {
  // Check if the date already exists in the accumulator
  const existingRecord = acc.find(r => r.date === record.date);
  
  if (existingRecord) {
    // If the date exists, add the hours to the existing entry
    existingRecord.hours += record.hours;
  } else {
    // If the date does not exist, add a new record to the accumulator
    acc.push({ ...record });
  }

  return acc;
  }, []);


  return (
    <div className="flex justify-center items-center h-screen flex-col">
      < BarChart data={condensedWeekData} />
      <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
      Logout
    </button>
    </div>
  )
}

export default User
