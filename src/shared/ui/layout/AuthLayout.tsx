import { motion } from "motion/react";

export const AuthLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
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
            <>{children}</>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
