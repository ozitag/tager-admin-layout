import { ViewListIcon, AssignmentIcon, SettingsIcon } from "@tager/admin-ui";

import { type MenuItemType } from "../components/PageLayout/components/Sidebar.vue";

export const sidebarMenuList: Array<MenuItemType> = [
  {
    id: "catalog",
    text: "Catalog",
    icon: ViewListIcon,
    children: [
      {
        url: "/presets",
        text: "All presets",
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
