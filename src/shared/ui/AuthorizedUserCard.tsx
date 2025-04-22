import { ArrowRight, User } from "lucide-react";

const AuthorizedUserCard = ({ email }: { email?: string }) => {
  return (
    email && (
      <div className="bg-white shadow-md flex items-center justify-between p-4! rounded-2xl!">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
            <User />
          </div>
          <span>{email}</span>
        </div>
        <ArrowRight />
      </div>
    )
  );
};

export default AuthorizedUserCard;
