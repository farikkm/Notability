import { NoteType } from "shared/types";
import { MyCard } from "shared/ui/components";

import { useTranslation } from "react-i18next";

type NotesListProps = {
  notesByDate: Record<string, NoteType[]>;
  error?: string | null;
};

export const NotesList = ({ notesByDate, error }: NotesListProps) => {
  const { t } = useTranslation();

  return (
    <>
      {error && (
        <div className="error-message text-red-500 text-center mt-4">
          {error}
        </div>
      )}
      {Object.keys(notesByDate).length === 0 && (
        <div className="no-notes-message text-center mt-4 dark:text-white">
          No notes available. Please add a note.
        </div>
      )}
      {Object.keys(notesByDate).length > 0 && (
        <ul>
          {Object.entries(notesByDate).map(([date, notesOnDate]) => (
            <li key={date}>
              <h2 className="text-xl font-semibold mt-4 mb-2 dark:text-white">
                {date + " " + t("notes.time-last")}
              </h2>
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
