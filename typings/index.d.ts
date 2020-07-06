import Vue, { PluginFunction, VueConstructor } from 'vue';
import VueRouter, { Route, RouterOptions } from 'vue-router';
import { Nullish } from '@tager/admin-services';
import { IconName } from '@tager/admin-ui';
import {
  RouteConfigMultipleViews,
  RouteConfigSingleView,
} from 'vue-router/types/router';

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

export interface CustomRoute extends Route {
  meta?: RouteMeta;
}

export interface CustomRouteConfigSingleView extends RouteConfigSingleView {
  meta?: RouteMeta;
}

export interface CustomRouteConfigMultipleViews
  extends RouteConfigMultipleViews {
  meta?: RouteMeta;
}

export type CustomRouteConfig =
  | CustomRouteConfigSingleView
  | CustomRouteConfigMultipleViews;

export interface CustomRouterOptions extends RouterOptions {
  routes?: Array<CustomRouteConfig>;
}

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

export declare const AdminLayoutPlugin: PluginFunction<undefined>;
