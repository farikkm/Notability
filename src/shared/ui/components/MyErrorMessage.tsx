import React, { useEffect } from 'react';
import { message } from 'antd';

interface MyErrorMessageProps {
  message: string;
}

export const MyErrorMessage: React.FC<MyErrorMessageProps> = ({ message: errorMessage }) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (errorMessage) {
      messageApi.open({
        type: 'error',
        content: errorMessage,
      });
    }
  }, [errorMessage, messageApi]);

  return <>{contextHolder}</>;
};