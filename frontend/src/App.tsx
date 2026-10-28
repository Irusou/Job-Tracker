import { createBrowserRouter, RouterProvider } from "react-router";
import Applications from "./pages/Applications";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Board from "./pages/Board";
import DashBoard from "./pages/DashBoard";
import Application from "./pages/Application";
import { getAllApplications, getApplicationById } from "./api/applications";
import AuthLayout from "./layouts/Auth";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/signin",
      Component: Signin,
    },
    {
      Component: AuthLayout,
      children: [
        {
          path: "/dashboard",
          Component: DashBoard,
          loader: async () => {
            return await getAllApplications();
          },
        },
        {
          path: "/applications",
          Component: Applications,
          loader: async () => {
            return await getAllApplications();
          },
        },
        {
          path: "/applications/:id",
          loader: async ({ params }) => {
            return await getApplicationById(params.id!);
          },
          Component: Application,
        },
        {
          path: "/board",
          Component: Board,
          loader: async () => {
            return await getAllApplications();
          },
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
