import { NoteForm } from "widgets/notes";
import { useFetchNotes } from "shared/hooks";
import { NotesHeader, NotesList } from "entities/Notes/ui";
import { LoginButton, LogoutButton } from "features/Auth/ui";
import { useAuthorizedUser } from "features/Auth/hooks/useAuthorizedUser";
import { useClearNotesOnUnmount } from "features/Notes/hooks/useClearNotesOnUnmount";

const Notes = () => {
  const userInfo = useAuthorizedUser();
  const { notes, error } = useFetchNotes();

  useClearNotesOnUnmount([]);

  return (
    <div className="p-5">
      <LoginButton />

      <NotesHeader user={userInfo?.email || ""} />

      <NoteForm />

      <NotesList notes={notes || []} error={error} />

      <LogoutButton />
    </div>
  );
};

export default Notes;
