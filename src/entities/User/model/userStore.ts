import { create } from "zustand";

interface UserState {
  email: string;
  password: string;
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  reset: () => void;
  setToken: (token: string) => void;
  setUserId: (id: string) => void;
  logout: () => void;
  initFromLocalStorage: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  email: "",
  password: "",
  token: null,
  userId: null,
  isAuthenticated: false,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  reset: () => set({ email: "", password: "" }),

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },

  setUserId: (userId) => {
    localStorage.setItem("userId", userId);
    set({ userId });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    set({ email: "", password: "", token: null, userId: null, isAuthenticated: false });
  },

  initFromLocalStorage: () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    set({
      token,
      userId,
      isAuthenticated: !!token, // true if token exists
    })
  }
}));
