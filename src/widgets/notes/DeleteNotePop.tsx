import { Trash2 } from "lucide-react";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import { useNotesStore } from "entities/Notes/model";
import { deleteNoteRequest } from "features/Notes/hooks";
import { useTranslation } from "react-i18next";

export const DeleteNotePop = ({ noteId }: { noteId: string }) => {
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const { t } = useTranslation();

  const confirm = async (noteId: string) => {
    try {
      await deleteNoteRequest({ _id: noteId });
      deleteNote(noteId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title={t("notes.delete-note.title")}
      description={t("notes.delete-note.warning")}
      onConfirm={() => confirm(noteId)}
      onCancel={cancel}
      okText={t("notes.delete-note.yes")}
      cancelText={t("notes.delete-note.no")}
    >
      <Button type="dashed" icon={<Trash2 size={16} />} />
    </Popconfirm>
  );
};
