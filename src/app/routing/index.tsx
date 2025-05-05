import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { WithSuspense } from "shared/lib/react";
import { RequireAuth } from "features/Auth/lib/navigation";
import { MainLayout } from "shared/ui/layout";

const Notes = lazy(() => import("pages/Notes"));
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));

export const appRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "login",
          element: WithSuspense(<Login />),
        },
        {
          path: "register",
          element: WithSuspense(<Register />),
        },
        {
          path: "notes",
          element: WithSuspense(
            <RequireAuth>
              <Notes />
            </RequireAuth>
          ),
        },
      ],
    },
  ]);
};
