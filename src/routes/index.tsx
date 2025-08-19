import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import About from "../pages/About";
import Home from "../pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { generateRoutes } from "@/components/ults/generateRoutes";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { UserSidebarItems } from "./UserSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },

  // admin routes
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      {
        path: "",
        // index : true,
        element: <Navigate to="/admin/analytics" />,
      },
      ...generateRoutes(AdminSidebarItems),
    ],
  },

  // user routes

  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      {
        // path: "",
        index : true,
        element: <Navigate to="/user/booking" />,
      },
      ...generateRoutes(UserSidebarItems),
    ],
  },

  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
]);
