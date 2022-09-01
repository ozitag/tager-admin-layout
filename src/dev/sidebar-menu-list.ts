import { ViewListIcon, AssignmentIcon, SettingsIcon } from "@tager/admin-ui";

import { MenuItemType } from "../typings/menu";

export const sidebarMenuList: Array<MenuItemType> = [
  {
    id: "catalog",
    text: "Services",
    icon: ViewListIcon,
    scopes: ["OR", "brands.view", "services.view"],
    children: [
      {
        url: "/presets",
        text: "All presets",
        scopes: ["brands.view", "services.view"],
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
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
  },
  {
    id: "orders",
    text: "Orders",
    url: "/orders",
    icon: AssignmentIcon,
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
