import { Spin } from "antd";
import { Suspense } from "react";

const WithSuspense = (element: React.ReactNode) => (
  <Suspense
    fallback={
      <div className="w-screen h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    }
  >
    {element}
  </Suspense>
);

export default WithSuspense;