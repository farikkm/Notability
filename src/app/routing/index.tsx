import Login from "pages/Login";
import Register from "pages/Register";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Notes = lazy(() => import("pages/Notes"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/notes",
    element: <Notes />,
  },
]);
