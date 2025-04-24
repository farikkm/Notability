import { useUserStore } from "entities/User/model";
import { useAuthorizedUser } from "features/Auth/hooks/useAuthorizedUser";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { safeFetch } from "shared/api";

const Notes = () => {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const userInfo = useAuthorizedUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("note-title") as string;
    const content = formData.get("note-content") as string;
    console.log("Title:", title);
    console.log("Content:", content);

    try {
      const result = await safeFetch(`http://localhost:3001/api/notes/add`, {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Link to={"/login"} className="icon-text-wrapper">
        <ArrowLeft />
        <span>Login</span>
      </Link>

      <h1>Welcome, {userInfo?.email || "Loading.."}</h1>

      <h1>Notes</h1>
      <p>
        This is a protected route. You should see this if you are logged in.
      </p>

      <form onSubmit={handleSubmit} method="POST" id="add-note">
        <div>
          <label htmlFor="note-title">Title:</label>
          <input type="text" id="note-title" name="note-title" required />
        </div>
        <div>
          <label htmlFor="note-content">Content:</label>
          <textarea id="note-content" name="note-content" required></textarea>
        </div>
        <div>
          <button type="submit">Add Note</button>
        </div>
      </form>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Notes;
