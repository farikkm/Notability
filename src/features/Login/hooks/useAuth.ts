import { useUserStore } from "entities/User";

export const useAuth = () => {
  const setToken = useUserStore((state) => state.setToken);

  const login = async (email: string, password: string) => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${url}/api/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      setToken(result.token);
      return true;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${url}/api/register`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }
      return true;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  }

  return {
    login,
    register
  };
};