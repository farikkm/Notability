import { Spin } from "antd";
import { AddNoteModal } from "widgets/notes";
import { NotesHeader, NotesList } from "entities/Notes/ui";
import { LoginButton, LogoutButton } from "features/Auth/ui";
import { useAuthorizedUser } from "features/Auth/hooks/useAuthorizedUser";
import { useClearNotesOnUnmount } from "features/Notes/hooks/useClearNotesOnUnmount";
import { useNotesStore } from "entities/Notes/model";
import { useLoadNotes } from "features/Notes/hooks";

const Notes = () => {
  const userInfo = useAuthorizedUser();
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

      <NotesHeader user={userInfo?.email || ""} />

      <AddNoteModal />

      {loading ? <Spin /> : <NotesList notes={notes || []} error={error} />}

      <LogoutButton />
    </div>
  );
};

export default Notes;
