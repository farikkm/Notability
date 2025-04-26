import { Card } from "antd";
import { NoteType } from "shared/types";
import { DeleteNoteButton } from "features/Notes/ui";
import UpdateNoteModal from "widgets/notes/UpdateNoteModal";
import { ShowModalInfo } from "widgets/notes/ShowNoteInfoModal";

export const MyCard: React.FC<Pick<NoteType, "content" | "title">> = ({ content, title }) => {
  return (
    <Card
      title={
        <div className="flex justify-between items-center gap-2">
          <h3 className="truncate">{title}</h3>
          <div className="flex gap-3">
            <ShowModalInfo title={title} content={content} />
            <UpdateNoteModal title={title} content={content} />
            <DeleteNoteButton onClick={() => {}} />
          </div>
        </div>
      }
      variant="outlined"
      style={{ width: "100%", backgroundColor: "#fefce8", cursor: "default" }}
      hoverable
      className="select-none"
    >
      <p>{content}</p>
    </Card>
  );
};
