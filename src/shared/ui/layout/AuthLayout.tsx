import { motion } from "motion/react";
import { AuthorizedUserCard } from "shared/ui/components";

export const AuthLayout = ({
  email,
  title,
  description,
  children,
  handleCardClick
}: {
  email?: string;
  title: string;
  description: string;
  children: React.ReactNode;
  handleCardClick?: () => void;
}) => {
  return (
    <div className="auth-wrapper">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-cart">
            <h1 className="auth-title">{title}</h1>
            <p className="auth-description">{description}</p>
            {children}
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: .4 }}
        className="w-full max-w-xl"
      >
        {email ? (
          <AuthorizedUserCard handleClick={handleCardClick || (() => {})} email={email} />
        ) : (
          <div className="h-20 bg-muted rounded-xl" />
        )}
      </motion.div>
    </div>
  );
};
