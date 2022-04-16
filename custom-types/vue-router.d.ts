import { RouteLocationNormalizedLoaded } from "vue-router";

import { I18nContext } from "@tager/admin-services";

declare module "vue-router" {
  interface Breadcrumb {
    url: string;
    text: string;
  }

  interface RouteMeta {
    getBreadcrumbs?: (
      route: RouteLocationNormalizedLoaded,
      i18n: I18nContext
    ) => Array<Breadcrumb>;
  }
}
