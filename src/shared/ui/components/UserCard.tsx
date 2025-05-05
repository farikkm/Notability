import { ArrowRight, User } from "lucide-react";

export const UserCard = ({ email, handleClick }: { email?: string; handleClick: () => void }) => {
  return (
    email && (
      <div onClick={handleClick}  className="user-card">
        <div className="user-card-wrapper">
          <div className="user-card-profile">
            <User />
          </div>
          <span>{email}</span>
        </div>
        <ArrowRight />
      </div>
    )
  );
};
