import { create } from "zustand";
import { persist } from 'zustand/middleware';



export const useTimerStore = create(
    persist((
        set ) => ({
    workHours: 0,
    workMinutes: 0,
    restHours: 0,
    restMinutes: 0,
    setWorkHours: (hours) => set({ workHours: hours }),
    setWorkMinutes: (minutes) => set({ workMinutes: minutes }),
    setRestHours: (hours) => set({ restHours: hours }),
    setRestMinutes: (minutes) => set({ restMinutes: minutes }),
}),
{
    name: 'timer-storage',
}
    ));