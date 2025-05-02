import { AddNoteModal } from "widgets/notes";
import { NotesList } from "entities/Notes/ui";
import { useLoadNotes } from "features/Notes/hooks";
import { useNotesStore } from "entities/Notes/model";
import { LoadingSpinner } from "shared/ui/components";
import { LoginButton, LogoutButton } from "features/Auth/ui";
import { useClearNotesOnUnmount } from "features/Notes/hooks/useClearNotesOnUnmount";

const Notes = () => {
  // State
  const notes = useNotesStore((state) => state.notes);
  const error = useNotesStore((state) => state.error);
  const loading = useNotesStore((state) => state.loading);

  // Hooks
  useLoadNotes();
  useClearNotesOnUnmount([]);

  return (
    <div className={`p-5 container mx-auto`}>
      <div className="w-full flex justify-between">
        <LoginButton />
        <LogoutButton />
      </div>

      <div className="w-full flex justify-between my-6">
        <h1 className="text-center font-bold text-2xl">Notes</h1>
        <AddNoteModal />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <NotesList notes={notes || []} error={error} />
      )}
    </div>
  );
};

export default Notes;
