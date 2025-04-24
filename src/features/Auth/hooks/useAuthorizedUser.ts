import { useUserStore } from "entities/User/model";
import { useEffect, useState } from "react";
import { getUserInfo } from "shared/api";
import { UserInfo } from "shared/types";

export const useAuthorizedUser = () => {
  const logout = useUserStore((state) => state.logout);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
      } catch (error) {
        logout();
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  return userInfo;
};