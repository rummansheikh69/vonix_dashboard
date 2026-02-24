import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      const user = res.data;
      set({ authUser: user });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const user = res.data;
      set({ authUser: user });
    } catch (error) {
      console.log("Error in login", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      toast.success("Logged Out");
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
