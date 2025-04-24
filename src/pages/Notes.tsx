import { useNotesStore } from "entities/Notes/model";
import { useUserStore } from "entities/User/model";
import { useAuthorizedUser } from "features/Auth/hooks/useAuthorizedUser";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { safeFetch } from "shared/api";
import NoteForm from "widgets/notes/NoteForm";

const Notes = () => {
  // States
  const userInfo = useAuthorizedUser();
  const notes = useNotesStore((state) => state.notes);

  // Actions
  const logout = useUserStore((state) => state.logout);
  const setNotes = useNotesStore((state) => state.setNotes);

  // Hooks
  const navigate = useNavigate();

  // Handlers
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const data = await safeFetch("http://localhost:3001/api/notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(data);
        
        setNotes(data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    getAllNotes();
  }, []);

  return (
    <div className="p-5">
      <Link to={"/login"} className="icon-text-wrapper">
        <ArrowLeft />
        <span>Login</span>
      </Link>

      <NoteForm />

      <h1>Welcome, {userInfo?.email || "Loading.."}</h1>

      <h1>Notes</h1>

      <ul className="notes-list">
        {notes && notes.map((note) => (
          <li key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Notes;
