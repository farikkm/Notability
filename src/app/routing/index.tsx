// router.tsx
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Spin } from "antd";

const Notes = lazy(() => import("pages/Notes"));
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center"><Spin size="large" /></div>}>
    {element}
  </Suspense>
);

export function createAppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace={true} />,
    },
    {
      path: "/login",
      element: withSuspense(<Login />),
    },
    {
      path: "/register",
      element: withSuspense(<Register />),
    },
    {
      path: "/notes",
      element: withSuspense(<Notes />),
    },
  ]);
}
