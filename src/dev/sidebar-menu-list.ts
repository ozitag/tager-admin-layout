import { ViewListIcon, AssignmentIcon, SettingsIcon } from "@tager/admin-ui";

import { MenuItemType } from "../typings/menu";

export const sidebarMenuList: Array<MenuItemType> = [
  {
    id: "catalog",
    text: "Services",
    icon: ViewListIcon,
    scopes: ["brands.view", "services.view"],
    scopesOperand: "OR",
    children: [
      {
        url: "/presets",
        text: "All presets",
        scopes: ["brands.view", "services.view"],
        scopesOperand: "AND",
      },
      {
        url: "/presets/create",
        text: "Create presets",
      },
    ],
  },

  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "settings",
    text: "Settings",
    icon: SettingsIcon,
    children: [
      {
        url: "/settings/common",
        text: "Common",
      },
      {
        url: "/settings/seo",
        text: "SEO",
      },
    ],
  },
];
