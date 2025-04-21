import { useUserStore } from "entities/User";

export const useAuth = () => {
  const setToken = useUserStore((state) => state.setToken);
  const setErrorMessage = useUserStore((state) => state.setErrorMessage);
  const clearErrorMessage = useUserStore((state) => state.clearErrorMessage);

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
      clearErrorMessage();
      return true;
    } catch (error: unknown) {
      let message = "Login failed";
      if (error instanceof Error) message = error.message;
      setErrorMessage(message);
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

      clearErrorMessage();
      return true;
    } catch (error: unknown) {
      let message = "Registration failed";
      if (error instanceof Error) message = error.message;
      setErrorMessage(message);
      return false;
    }
  };

  return {
    login,
    register,
  };
};
