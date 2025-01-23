import { create } from "zustand";
import axios from "../axios/axios";

interface UserStore {
  user: any;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isChecking: boolean;
  clearError: () => void;
  signup: (email: string, username: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  googleSignin: (code: string) => Promise<void>;
  signout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isChecking: true,

  clearError: () => set({ error: null }),

  signup: async (email: string, username: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await axios.post("/auth/register", {
        email,
        username,
        password,
      });
      set({
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (email: string, code: string) => {
    // console.log("v");
    try {
      // console.log("object");
      set({ isLoading: true, error: null });
      const response = await axios.post("/auth/verify-email", {
        email,
        code,
      });
      set({
        isLoading: false,
        user: response.data.data.user,
        isAuthenticated: true,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  signin: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post("/auth/login", { email, password });
      set({
        user: response.data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data.message || "Error signing in",
        isLoading: false,
      });
      throw error;
    }
  },

  googleSignin: async (code: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`/auth/google?code=${code}`);
      set({
        user: response.data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data.message || "Error signing in",
        isLoading: false,
      });
      throw error;
    }
  },

  signout: async () => {
    try {
      set({ isLoading: true, error: null });
      await axios.post("/auth/logout");
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error: any) {
      set({
        error: error?.response?.data.message || "Error signing out",
        isLoading: false,
      });
      if (error.response.status === 401) {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    }
  },

  checkAuth: async () => {
    try {
      set({ isChecking: true, error: null });
      const response = await axios.get("/auth/me");
      set({
        user: response.data.data,
        isAuthenticated: true,
        isChecking: false,
      });
    } catch (error) {
      set({ isChecking: false });
    }
  },
}));
