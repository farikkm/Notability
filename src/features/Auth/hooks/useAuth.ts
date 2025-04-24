import { useUserStore } from "entities/User/model";
import { safeFetch } from "shared/api";

export const useAuth = () => {
  const setToken = useUserStore((state) => state.setToken);
  const setUserId = useUserStore((state) => state.setUserId);
  const setErrorMessage = useUserStore((state) => state.setErrorMessage);
  const clearErrorMessage = useUserStore((state) => state.clearErrorMessage);

  // Hooks

  const login = async (email: string, password: string) => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL;
      const response = await safeFetch(`${url}/api/login`, {
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
      const response = await safeFetch(`${url}/api/register`, {
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

  const checkToken = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await safeFetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/protected`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();      
      setUserId(data.userId);

      return true;
    } catch (err: any) {
      setErrorMessage("Token is invalid or expired");
      return false;
    }
  };

  return {
    login,
    register,
    checkToken
  };
};
