import { useEffect, useState } from "react";
import { getUserInfo } from "shared/api";
import { UserInfo } from "shared/types";

export const useAuthorizedUser = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
      } catch (_) {
        // Возможно, токен просрочен — ничего не делаем
      }
    };
    fetchUserInfo();
  }, []);

  return userInfo;
};