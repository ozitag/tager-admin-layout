import {
  createRouter as createVueRouter,
  type RouterOptions,
  createWebHistory,
  type RouteRecordRaw,
  type RouteLocationNormalizedLoaded,
} from "vue-router";

import {
  type AppConfigType,
  configStore,
  environment,
  previousRouteTracker,
} from "@tager/admin-services";

import NotFound from "./views/NotFound.vue";
import UpdateProfileForm from "./views/UpdateProfileForm.vue";
import UpdateUserPasswordForm from "./views/UpdateUserPasswordForm.vue";

const HOME_BREADCRUMB = { url: "/", text: "Home" };

function getBreadcrumbFromRoute(route: RouteLocationNormalizedLoaded) {
  const text = typeof route.name === "symbol" ? "Unknown page" : route.name;
  return { url: route.path, text: text || "" };
}

const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "Not Found",
  component: NotFound,
};

const USER_PROFILE_FORM_ROUTE: RouteRecordRaw = {
  path: "/profile",
  name: "Change profile",
  component: UpdateProfileForm,
  meta: {
    getBreadcrumbs: (route) => [HOME_BREADCRUMB, getBreadcrumbFromRoute(route)],
  },
};

const USER_PASSWORD_FORM_ROUTE: RouteRecordRaw = {
  path: "/profile/password",
  name: "Change password",
  component: UpdateUserPasswordForm,
  meta: {
    getBreadcrumbs: (route) => [HOME_BREADCRUMB, getBreadcrumbFromRoute(route)],
  },
};

interface RouterParams {
  shouldMergeRoutes: boolean;
  useTitleSync: boolean;
}

const defaultParams: RouterParams = {
  shouldMergeRoutes: true,
  useTitleSync: true,
};

function configureParams(userParams: Partial<RouterParams>): RouterParams {
  return { ...defaultParams, ...userParams };
}

const predefinedRoutes: Array<RouteRecordRaw> = [
  USER_PASSWORD_FORM_ROUTE,
  USER_PROFILE_FORM_ROUTE,
  NOT_FOUND_ROUTE,
];

function configureRoutes(
  userRoutes: Array<RouteRecordRaw>,
  params: RouterParams
): Array<RouteRecordRaw> {
  if (params.shouldMergeRoutes) {
    return [...userRoutes, ...predefinedRoutes];
  }

  return predefinedRoutes;
}

export function createRouter(
  userRouterOptions: Partial<RouterOptions> = {},
  userParams: Partial<RouterParams> = {}
) {
  const params = configureParams(userParams);
  const routes = configureRoutes(userRouterOptions.routes || [], params);

  const routerOptions: RouterOptions = {
    history: createWebHistory(environment.baseUrl),
    ...userRouterOptions,
    routes,
  };

  const router = createVueRouter(routerOptions);

  previousRouteTracker.track(router);

  if (params.useTitleSync) {
    router.afterEach((routeTo) => {
      const pageName = (routeTo.name as string) ?? "Not Found";

      document.title = configStore
        .getConfig<AppConfigType>()
        .TITLE_TEMPLATE.replace(/{{title}}/, pageName);
    });
  }

  return router;
}
