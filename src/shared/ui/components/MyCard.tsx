import { Card, Typography } from "antd";
import { NoteType } from "shared/types";
import UpdateNoteModal from "widgets/notes/UpdateNoteModal";
import { ShowModalInfo } from "widgets/notes/ShowNoteInfoModal";
import { DeleteNotePop } from "widgets/notes/DeleteNotePop";

const { Title, Paragraph } = Typography;

export const MyCard: React.FC<Pick<NoteType, "content" | "title" | "_id">> = ({
  _id,
  content,
  title,
}) => {
  return (
    <Card
      title={
        <div className="flex justify-between items-center gap-2">
          <Title level={5} style={{ margin: 0 }} className="truncate">
            {title}
          </Title>
          <div className="flex gap-3">
            <ShowModalInfo title={title} content={content} />
            <UpdateNoteModal title={title} content={content} noteId={_id} />
            <DeleteNotePop noteId={_id} />
          </div>
        </div>
      }
      variant="outlined"
      style={{ width: "100%", cursor: "default" }}
      hoverable
      className="select-none"
    >
      <Paragraph ellipsis={{ rows: 3 }}>{content}</Paragraph>
    </Card>
  );
};
