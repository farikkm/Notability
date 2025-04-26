import { Input, InputRef } from "antd";
import { useRef, useEffect } from "react";

export const AutoFocusInput = ({ value }: { value: string }) => {
  const inputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.input?.select();
    }
  }, []);

  return <Input ref={inputRef} defaultValue={value}/>;
};
