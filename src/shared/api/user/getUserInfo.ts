import { UserInfo } from "shared/types";
import { safeFetch } from "shared/api";
import { getToken } from "shared/lib/token";

export const getUserInfo = async (): Promise<UserInfo> => {
  const token = getToken();
  const url = import.meta.env.VITE_API_BASE_URL;

  try {
    const result = await safeFetch(`${url}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return result;
  } catch (error: unknown) {
    let message = "Failed to fetch user info";
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}