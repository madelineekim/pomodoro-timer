import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const timerStore = create(
    persist((
        set ) => ({
    workHours: 0,
    workMinutes: 0,
    restHours: 0,
    restMinutes: 0,
    timerType: "work",

    setWorkHours: (hours) => set({ workHours: hours }),
    setWorkMinutes: (minutes) => set({ workMinutes: minutes }),
    setRestHours: (hours) => set({ restHours: hours }),
    setRestMinutes: (minutes) => set({ restMinutes: minutes }),
    setWorkTimerOn: () => set({ workTimerOn: true}),
    setTimerType: () => set((state) => {
        return { timerType: state.timerType === "work" ? "rest" : "work" };
    })
}),
{
    name: 'timer-storage',
}
    ));