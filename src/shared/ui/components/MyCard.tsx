import { Card } from "antd";
import { NoteType } from "shared/types";
import { DeleteNoteButton } from "features/Notes/ui";
import UpdateNoteModal from "widgets/notes/UpdateNoteModal";
import { ShowModalInfo } from "widgets/notes/ShowNoteInfoModal";

export const MyCard: React.FC<Partial<NoteType>> = ({ content, title }) => {
  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <h3>{title}</h3>
          <div className="flex gap-3">
            <ShowModalInfo title={title} content={content} />
            <UpdateNoteModal />
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
