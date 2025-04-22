// router.tsx
import { lazy } from "react";
import { RequireAuth } from "features/Auth/lib/navigation";
import WithSuspense from "shared/ui/lib/react/WithSuspense";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Notes = lazy(() => import("pages/Notes"));
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));

export function createAppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace={true} />,
    },
    {
      path: "/login",
      element: WithSuspense(<Login />),
    },
    {
      path: "/register",
      element: WithSuspense(<Register />),
    },
    {
      path: "/notes",
      element: WithSuspense(
        <RequireAuth>
          <Notes />
        </RequireAuth>
      ),
    },
  ]);
}
