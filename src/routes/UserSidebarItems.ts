import Booking from "@/pages/user/Booking";
import type { ISidebarItems } from "@/types";

export const UserSidebarItems : ISidebarItems[] = [
  {
    title: "History",
    items: [
      {
        title: "Bookings",
        url: "/user/booking",
        component : Booking,
      },
    ],
  },

];
