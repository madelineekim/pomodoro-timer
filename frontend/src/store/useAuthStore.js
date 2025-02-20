import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data});
            toast.success("Logged in successfully");
        } catch (error) {
            console.log("Error in checkAuth:", error)
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          console.log("Signup Response:", res.data);
          set({ authUser: res.data });
          console.log("Updated authUser in store:", res.data);
          toast.success("Account created successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
      },

    logout: async () => {
       try {
        await axiosInstance.post("/auth/logout");
        set({authUser: null});
        toast.success("Logged out successfully");
       } catch (error) {
        console.log("Error in logout:", error);
        toast.error(error.response.data.message);
       }
    },

    deleteAccount: async () => {
        try {
            await axiosInstance.post("/auth/delete-account");
            set({authUser: null});
            toast.success("Account deleted successfully")
        } catch (error) {
            console.log("Error in deleteAccount:", error);
            toast.error(error.response.data.message);
        }
    }

}));