import { role } from "@/constants/role";
import { AdminSidebarItems } from "@/routes/AdminSidebarItems";
import { UserSidebarItems } from "@/routes/UserSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      // return [...AdminSidebarItems , ...UserSidebarItems];
      return [...AdminSidebarItems ];
    case role.admin:
      return [...AdminSidebarItems];
    case role.user:
      return [...UserSidebarItems];
    default:
      return [];
  }
};
