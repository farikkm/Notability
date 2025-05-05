import { Dropdown, MenuProps } from "antd";
import { Check, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "English" },
    { code: "ru", label: "Русский" },
    { code: "uz", label: "O'zbekcha" },
  ];

  const items: MenuProps["items"] = languages.map(({ code, label }) => ({
    key: code,
    label: (
      <span className="flex items-center gap-2">
        {label} {i18n.language === code && <Check size={16} />}
      </span>
    ),
    onClick: () => i18n.changeLanguage(code),
  }));

  return (
    <Dropdown placement="bottom" menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <div className="flex justify-center items-center w-10 h-10 rounded-xl cursor-pointer bg-yellow-500 text-white dark:bg-black">
          <Languages />
        </div>
      </a>
    </Dropdown>
  );
};
