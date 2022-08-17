import { Component } from "vue";

import { LinkType } from "@tager/admin-ui";
import { Scopes, ScopesOperand } from "@tager/admin-services";

type MenuItemChildrenLink = LinkType & {
  scopes?: Scopes;
  scopesOperand?: ScopesOperand;
};

export interface BaseMenuItemType {
  id: string;
  text: string;
  url?: string;
  icon: Component;
  scopes?: Scopes;
  scopesOperand?: ScopesOperand;
  children?: Array<MenuItemChildrenLink>;
}

export interface MenuItemSingleType extends BaseMenuItemType {
  url: string;
}

export interface MenuItemWithChildrenType extends BaseMenuItemType {
  children: Array<MenuItemChildrenLink>;
}

export type MenuItemType = MenuItemSingleType | MenuItemWithChildrenType;
