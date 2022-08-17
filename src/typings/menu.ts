import { Component } from "vue";

import { LinkType } from "@tager/admin-ui";
import { Scopes } from "@tager/admin-services";

type MenuItemChildrenLink = LinkType & {
  scopes?: Scopes;
};

export interface BaseMenuItemType {
  id: string;
  text: string;
  url?: string;
  icon: Component;
  scopes?: Scopes;
  children?: Array<MenuItemChildrenLink>;
}

export interface MenuItemSingleType extends BaseMenuItemType {
  url: string;
}

export interface MenuItemWithChildrenType extends BaseMenuItemType {
  children: Array<MenuItemChildrenLink>;
}

export type MenuItemType = MenuItemSingleType | MenuItemWithChildrenType;
