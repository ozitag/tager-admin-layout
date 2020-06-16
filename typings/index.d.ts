import Vue, { VueConstructor } from 'vue';
import { ExtendedVue } from 'vue/types/vue';
import VueRouter, { Route, RouteConfig, RouterOptions } from 'vue-router';
import { Nullish } from '@tager/admin-services';

export type ToastVariant = 'success' | 'warning' | 'danger';

export type ToastParams = {
  variant: ToastVariant;
  title: string;
  body: string;
};

export type ToastItem = ToastParams & {
  id: number;
};

export type ToastFunction = (params: ToastParams) => void;

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $toast: ToastFunction;
  }
  interface VueConstructor {
    $toast: ToastFunction;
  }
}

export type MenuItemType = {
  id: string;
  name: string;
  path: string;
  icon: string;
  children?: Array<{ name: string; path: string }>;
};

export declare const BaseLayout: ExtendedVue<
  Vue,
  {},
  {},
  {},
  { sidebarMenuList: Array<MenuItemType> }
>;

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

export declare const NotFound: VueConstructor<Vue>;
