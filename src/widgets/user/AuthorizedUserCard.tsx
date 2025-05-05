import { useUserStore } from "entities/User/model";
import { getUserInfo } from "features/Auth/api";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCard } from "shared/ui/components";

const AuthorizedUserCard = () => {
  const navigate = useNavigate();
  const email = useUserStore((state) => state.email);
  const setEmail = useUserStore((state) => state.setEmail);

  useEffect(() => {
    const setUserInfo = async () => {
      const userInfo = await getUserInfo();
      setEmail(userInfo.email);
    };

    setUserInfo();
  }, []);

  const handleCardClick = async () => {
    navigate("/notes");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-xl"
    >
      {email ? (
        <UserCard handleClick={handleCardClick} email={email} />
      ) : (
        <div className="h-20 bg-muted rounded-xl" />
      )}
    </motion.div>
  );
};

export default AuthorizedUserCard;
