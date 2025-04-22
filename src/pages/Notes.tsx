import { useUserStore } from "entities/User";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div>
      <h1>Notes</h1>
      <p>This is a protected route. You should see this if you are logged in.</p>

      <form action="#" method="POST" id="add-note">
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
