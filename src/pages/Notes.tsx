import { Spin } from "antd";
import { AddNoteModal } from "widgets/notes";
import { NotesList } from "entities/Notes/ui";
import { useLoadNotes } from "features/Notes/hooks";
import { useNotesStore } from "entities/Notes/model";
import { LoginButton, LogoutButton } from "features/Auth/ui";
import { useClearNotesOnUnmount } from "features/Notes/hooks/useClearNotesOnUnmount";

const Notes = () => {
  const notes = useNotesStore((state) => state.notes);

  // States
  const error = useNotesStore((state) => state.error);
  const loading = useNotesStore((state) => state.loading);

  // Hooks
  useLoadNotes();
  useClearNotesOnUnmount([]);

  return (
    <div className="p-5">
      <LoginButton />

      <div className="w-full flex justify-between">
        <h1 className="text-center font-bold text-2xl">Notes</h1>
        <AddNoteModal />
      </div>

      {loading ? <Spin /> : <NotesList notes={notes || []} error={error} />}

      <LogoutButton />
    </div>
  );
};

export default Notes;
