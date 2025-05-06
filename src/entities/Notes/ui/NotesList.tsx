import { NoteType } from "shared/types";
import { MyCard } from "shared/ui/components";

import { format } from "date-fns";

type NotesListProps = {
  notes: NoteType[];
  error?: string | null;
};

export const NotesList = ({ notes, error }: NotesListProps) => {
  const groupedNotes = notes.reduce((acc, note) => {
    const dateKey = format(new Date(note.createdAt), "d MMMM yyyy");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(note);
    return acc;
  }, {} as Record<string, typeof notes>);

  return (
    <>
      {error && (
        <div className="error-message text-red-500 text-center mt-4">
          {error}
        </div>
      )}
      {notes && notes.length === 0 && (
        <div className="no-notes-message text-center mt-4 dark:text-white">
          No notes available. Please add a note.
        </div>
      )}
      {notes && notes.length > 0 && (
        <ul>
          {Object.entries(groupedNotes).map(([date, notesOnDate]) => (
            <li key={date}>
              <h2 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{date}</h2>
              <div className="notes-list">
                {notesOnDate.map((note) => (
                  <MyCard
                    key={note._id}
                    title={note.title}
                    content={note.content}
                    _id={note._id}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
