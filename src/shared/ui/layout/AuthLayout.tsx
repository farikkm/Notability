import { motion } from "motion/react";

const AuthLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>
            <p className="text-center text-sm">{description}</p>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
