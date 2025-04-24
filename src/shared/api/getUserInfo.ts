import { UserInfo } from "shared/types";
import { safeFetch } from "shared/api";

export const getUserInfo = async (): Promise<UserInfo> => {
  const url = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const result = await safeFetch(`${url}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  return result;
}