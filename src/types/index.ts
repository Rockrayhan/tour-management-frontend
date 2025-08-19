import type { ComponentType } from "react";

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component?: ComponentType;
    element?: any;
  }[];
}

export type TRole = "ADMIN" | "SUPER_ADMIN" | "USER";
