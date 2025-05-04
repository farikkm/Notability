import { Dropdown, MenuProps } from "antd";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const items: MenuProps["items"] = [
    {
      label: "English",
      key: "1",
      onClick: () => i18n.changeLanguage("en"),
    },
    {
      label: "Русский",
      key: "2",
      onClick: () => i18n.changeLanguage("ru"),
    },
    {
      label: "O'zbekcha",
      key: "3",
      onClick: () => i18n.changeLanguage("uz"),
    },
  ];

  return (
    <Dropdown placement="bottomCenter" menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <div className="flex justify-center items-center w-10 h-10 rounded-xl cursor-pointer bg-yellow-500 text-white dark:bg-black">
          <Languages />
        </div>
      </a>
    </Dropdown>
  );
};
