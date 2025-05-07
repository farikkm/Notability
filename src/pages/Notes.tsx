import { AddNoteModal } from "widgets/notes";
import { NotesList } from "entities/Notes/ui";
import { useLoadNotes } from "features/Notes/hooks";
import { useNotesStore } from "entities/Notes/model";
import { LoadingSpinner, Logo } from "shared/ui/components";
import { useClearNotesOnUnmount } from "features/Notes/hooks/useClearNotesOnUnmount";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ru, enUS, uz } from "date-fns/locale";

const Notes = () => {
  // State
  const notes = useNotesStore((state) => state.notes);
  const error = useNotesStore((state) => state.error);
  const loading = useNotesStore((state) => state.loading);
  
  const { t, i18n } = useTranslation();
  
  // Hooks
  useLoadNotes();
  useClearNotesOnUnmount([]);

  const localeLanguage =
    i18n.language === "ru" ? ru : i18n.language === "en" ? enUS : uz;

  const notesByDate = notes.reduce((acc, note) => {
    const dateKey = formatDistanceToNow(new Date(note.createdAt), {
      locale: localeLanguage,
    });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(note);
    return acc;
  }, {} as Record<string, typeof notes>);

  return (
    <div className="p-5 container mx-auto">
      <div className="w-fit mx-auto">
        <Logo />
      </div>

      <div className="mt-12">
        <div className="w-full flex justify-between my-6">
          <h1 className="text-center font-bold text-2xl dark:text-white">
            {t("notes.title")}
          </h1>
          <AddNoteModal />
        </div>

        {loading ? (
          <div className="min-h-screen">
            <LoadingSpinner />
          </div>
        ) : (
          <NotesList notesByDate={notesByDate || []} error={error} />
        )}
      </div>
    </div>
  );
};

export default Notes;
