import { BookUser } from "lucide-react";
import { Dropdown, MenuProps } from "antd";

interface Props {
  items: MenuProps["items"];
}

export const UserProfileIcon = ({ items }: Props) => {
  return (
    <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <div className="flex justify-center items-center w-10 h-10 rounded-xl cursor-pointer bg-yellow-500 text-white dark:bg-black">
          <BookUser />
        </div>
      </a>
    </Dropdown>
  );
};
