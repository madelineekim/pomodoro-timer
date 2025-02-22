import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast"

export const useDataStore = create((set, get) => ({
    weekData: null,

    getWeekData: async() => {
        try {
            const res = await axiosInstance.get("/data/get-week-data");
            console.log(res.data)
            set({weekData: res.data});
        } catch (error) {
            console.log("Error in getWeekData:", error)
            set({weekData: null})
            toast.error("Error fetching week data")
        }
    },

    addNewData: async(data) => {
        try {
            const res = await axiosInstance.post("/data/add-new-data", data);
        } catch (error) {
            console.log("Error in addNewData:", error)
        }
    }

}))