import { useUserStore } from "entities/User";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const setUserId = useUserStore((state) => state.setUserId);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/protected`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          navigate("/login", { replace: true });
          throw new Error("Unauthorized");
        }

        const data = await response.json();
        setUserId(data.userId);
      } catch (err) {
        console.error("Ошибка:", err);
      }
    };

    fetchProtectedData();
  }, []);

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
