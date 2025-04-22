import { create } from "zustand";

interface UserState {
  email: string;
  password: string;
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  errorMessage: string | null;

  emailErrorMessage: string | null;
  passwordErrorMessage: string | null;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  resetFields: () => void;

  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;

  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;

  setToken: (token: string) => void;
  setUserId: (id: string) => void;
  logout: () => void;
  initFromLocalStorage: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  // States
  email: "",
  password: "",
  token: null,
  userId: null,
  isAuthenticated: false,

  errorMessage: null,
  emailErrorMessage: null,
  passwordErrorMessage: null,

  // Actions
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  resetFields: () => set({ email: "", password: "" }),

  setErrorMessage: (message) => set({ errorMessage: message }),
  clearErrorMessage: () => set({ errorMessage: null }),

  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      set({ emailErrorMessage: "Invalid email format" });
      return false;
    }
    set({ emailErrorMessage: null });
    return true;
  },

  validatePassword: (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      set({ passwordErrorMessage: "Password must be at least 6 characters long and contain at least one letter and one number" });
      return false;
    }
    set({ passwordErrorMessage: null });
    return true;
  },

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
      isAuthenticated: !!token && token !== "undefined",
    })
  }
}));
