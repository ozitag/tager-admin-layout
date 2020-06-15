import type { Route, RouteConfig } from 'vue-router';

export type Option<V = string> = {
  value: V;
  label: string;
};

export type Breadcrumb = { path: string; label: string };

export type RouteMeta = {
  getBreadcrumbs: (route: Route) => Array<Breadcrumb>;
};

export type CustomRouteConfig = Omit<RouteConfig, 'meta'> & {
  meta?: RouteMeta;
};
