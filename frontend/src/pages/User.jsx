import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useDataStore } from '../store/useDataStore';
import BarChart from '../components/BarChart';
import { Loader } from 'lucide-react';
import { startOfDay } from "date-fns";

// Helper function to format the date
const formatDate = (date) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(date));

  // Add ordinal suffix for day
  const day = new Date(date).getDate();
  const suffix = day % 10 === 1 && day !== 11 ? 'st' :
                 day % 10 === 2 && day !== 12 ? 'nd' :
                 day % 10 === 3 && day !== 13 ? 'rd' : 'th';
  
  return formattedDate.replace(/\d+/, day + suffix);
};

const today = startOfDay(new Date());

const User = () => {
  const { logout, deleteAccount } = useAuthStore();
  const { weekData, getWeekData } = useDataStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getWeekData();  // Wait for data to be fetched
        setLoading(false);
    };
    fetchData();
  }, [getWeekData]);

  if (loading || !weekData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Format weekData day field and condense it by summing hours for the same date
  const condensedWeekData = weekData.reduce((acc, record) => {
    const existingRecord = acc.find(r => r.day === record.day);
    if (existingRecord) {
      existingRecord.hours += record.hours;
    } else {
      acc.push({ ...record });
    }
    return acc;
  }, []);

  const formattedWeekData = condensedWeekData.map(item => ({
    ...item,
    day: formatDate(item.day),
  }));

  return (
    <div className="flex justify-center items-center h-screen flex-col bg-base-300">
      <h1 className="text-2xl font-bold mt-5">Your Profile</h1>
      <BarChart data={formattedWeekData} />
      <button
        onClick={logout}
        className="btn m-1"
      >
        Logout
      </button>
      <button
        onClick={deleteAccount}
        className="btn m-1"
      >
        Delete Account
      </button>
    </div>
  );
};

export default User;
