import { InputRef } from "antd";

export const autoFocusInput = (inputRef: React.RefObject<InputRef | null>) => {
  if (inputRef.current) {
    inputRef.current.focus();
    setTimeout(() => {
      inputRef.current?.input?.select();
    }, 0);
  }
}