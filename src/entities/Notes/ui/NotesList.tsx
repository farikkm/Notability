import { NoteType } from "shared/types";
import { MyCard } from "shared/ui/components";

type NotesListProps = {
  notes: NoteType[];
  error?: string | null;
};

export const NotesList = ({ notes, error }: NotesListProps) => {
  return (
    <>
      {error && (
        <div className="error-message text-red-500 text-center mt-4">
          {error}
        </div>
      )}
      {notes && notes.length === 0 && (
        <div className="no-notes-message text-center mt-4">
          No notes available. Please add a note.
        </div>
      )}
      {notes && notes.length > 0 && (
        <ul className="notes-list">
          {notes &&
            notes.map((note) => (
              <MyCard title={note.title} content={note.content} key={note._id} />
            ))}
        </ul>
      )}
    </>
  );
};
