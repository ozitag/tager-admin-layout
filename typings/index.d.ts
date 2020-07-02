import Vue, { VueConstructor } from 'vue';
import VueRouter, { Route, RouteConfig, RouterOptions } from 'vue-router';
import { Nullish } from '@tager/admin-services';
import { IconName } from '@tager/admin-ui';

export type MenuItemType = {
  id: string;
  name: string;
  path: string;
  icon: IconName;
  children?: Array<{ name: string; path: string }>;
};

export declare const PageLayout: VueConstructor<Vue>;
export declare const Page: VueConstructor<Vue>;
export declare const NotFoundView: VueConstructor<Vue>;

export type Breadcrumb = { path: string; label: Nullish<string> };

export type RouteMeta = {
  getBreadcrumbs: (route: CustomRoute) => Array<Breadcrumb>;
};

export type CustomRoute = Omit<Route, 'meta'> & {
  meta?: RouteMeta;
};

export type CustomRouteConfig = Omit<RouteConfig, 'meta'> & {
  meta?: RouteMeta;
};

export type CustomRouterOptions = Omit<RouterOptions, 'routes'> & {
  routes?: Array<CustomRouteConfig>;
};

export declare function createRouter(
  routerOptions?: CustomRouterOptions,
  params?: { useNotFoundRoute?: boolean; useTitleSync?: boolean }
): VueRouter;

export type TopButtonConfig = {
  variant?: string;
  text?: string;
  onClick: (event: any) => void;
  class?: string;
  style?: string | object[] | object;
  href?: string;
  target?: string;
};
