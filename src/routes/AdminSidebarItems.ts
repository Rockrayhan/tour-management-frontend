import AddTour from "@/pages/admin/AddTour";
// import Analytics from "@/pages/admin/Analytics";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const Analytics = lazy( ()=> import('@/pages/admin/Analytics')) ;

export const AdminSidebarItems : ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component : Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component : AddTour
      },
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        // component : AddTour
        element : "Kire khoka"
      },
    ],
  },
];
