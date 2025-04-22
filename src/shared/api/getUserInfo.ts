import { UserInfo } from "shared/types";

export const getUserInfo = async (): Promise<UserInfo> => {
  const url = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  const response = await fetch(`${url}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile information");
  }

  const data = await response.json();
  return data;
}