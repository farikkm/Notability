import { safeFetch } from "shared/api";
import { useUserStore } from "entities/User/model";

export const useAuth = () => {
  const setToken = useUserStore((state) => state.setToken);
  const setUserId = useUserStore((state) => state.setUserId);
  const setErrorMessage = useUserStore((state) => state.setErrorMessage);
  const clearErrorMessage = useUserStore((state) => state.clearErrorMessage);

  const login = async (email: string, password: string) => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL;
      const result = await safeFetch(`${url}/api/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

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
      await safeFetch(`${url}/api/register`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

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
      const result = await safeFetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/protected`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setUserId(result.userId);
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
