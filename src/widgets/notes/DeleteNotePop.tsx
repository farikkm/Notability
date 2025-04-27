import { Trash2 } from "lucide-react";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import { useNotesStore } from "entities/Notes/model";
import { deleteNoteRequest } from "features/Notes/hooks";

export const DeleteNotePop = ({ noteId }: { noteId: string }) => {
  const deleteNote = useNotesStore((state) => state.deleteNote);

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
      title="Delete the note"
      description="Are you sure to delete this note?"
      onConfirm={() => confirm(noteId)}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button
        type="default"
        icon={<Trash2 size={16} />}
        onClick={() => {}}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "all 0.3s ease",
          backgroundColor: "#fff",
          borderColor: "#d9d9d9",
          color: "rgba(0, 0, 0, 0.88)",
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          target.style.backgroundColor = "#ff4d4f"; // красный
          target.style.borderColor = "#ff4d4f";
          target.style.color = "white";
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.backgroundColor = "#fff"; // default
          target.style.borderColor = "#d9d9d9";
          target.style.color = "rgba(0, 0, 0, 0.88)";
        }}
      />
    </Popconfirm>
  );
}
