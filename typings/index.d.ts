import Vue, { PluginFunction, VueConstructor } from 'vue';
import VueRouter, { Route, RouterOptions } from 'vue-router';
import { IconName, LinkType } from '@tager/admin-ui';
import {
  RouteConfigMultipleViews,
  RouteConfigSingleView,
} from 'vue-router/types/router';
import { TFunction } from 'i18next';

export type MenuItemType =
  | {
      id: string;
      text: string;
      url: string;
      icon: IconName;
      children?: Array<LinkType>;
    }
  | {
      id: string;
      text: string;
      url?: string;
      icon: IconName;
      children: Array<LinkType>;
    };

export declare const PageLayout: VueConstructor<Vue>;
export declare const Page: VueConstructor<Vue>;
export declare const NotFoundView: VueConstructor<Vue>;

export type Breadcrumb = LinkType;

export type RouteMeta = {
  getBreadcrumbs: (route: CustomRoute, t: TFunction) => Array<Breadcrumb>;
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
  params?: { shouldMergeRoutes?: boolean; useTitleSync?: boolean }
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
