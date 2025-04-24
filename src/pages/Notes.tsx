import { useUserStore } from "entities/User/model";
import { useAuthorizedUser } from "features/Auth/hooks/useAuthorizedUser";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NoteForm from "widgets/notes/NoteForm";

const Notes = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const userInfo = useAuthorizedUser();

  return (
    <div className="p-5">
      <Link to={"/login"} className="icon-text-wrapper">
        <ArrowLeft />
        <span>Login</span>
      </Link>

      <h1>Welcome, {userInfo?.email || "Loading.."}</h1>

      <h1>Notes</h1>
      <p>
        This is a protected route. You should see this if you are logged in.
      </p>

      <NoteForm />

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Notes;
