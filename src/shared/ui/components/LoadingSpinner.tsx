import { Spin } from 'antd';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <Spin size="large" />
    </div>
  );
};
