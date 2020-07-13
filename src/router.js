import Vue from 'vue';
import VueRouter from 'vue-router';
import { configStore } from '@tager/admin-services';

import NotFound from './views/NotFound';
import UpdateProfileForm from './views/UpdateProfileForm';
import UpdateUserPasswordForm from './views/UpdateUserPasswordForm';

const HOME_BREADCRUMB = { path: '/', label: 'Home' };

const NOT_FOUND_ROUTE = {
  path: '*',
  name: 'Not Found',
  component: NotFound,
};

const USER_PROFILE_FORM_ROUTE = {
  path: '/profile',
  name: 'Change profile',
  component: UpdateProfileForm,
  meta: {
    getBreadcrumbs: (route) => [
      HOME_BREADCRUMB,
      { path: route.path, label: route.name },
    ],
  },
};

const USER_PASSWORD_FORM_ROUTE = {
  path: '/profile/password',
  name: 'Change password',
  component: UpdateUserPasswordForm,
  meta: {
    getBreadcrumbs: (route) => [
      HOME_BREADCRUMB,
      { path: route.path, label: route.name },
    ],
  },
};

export function createRouter(userRouterOptions = {}, userParams = {}) {
  Vue.use(VueRouter);

  const defaultRouterOptions = {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      USER_PASSWORD_FORM_ROUTE,
      USER_PROFILE_FORM_ROUTE,
      NOT_FOUND_ROUTE,
    ],
  };
  const defaultParams = {
    shouldMergeRoutes: true,
    useTitleSync: true,
  };

  const routerOptions = {
    ...defaultRouterOptions,
    ...userRouterOptions,
  };
  const params = { ...defaultParams, ...userParams };

  if (params.shouldMergeRoutes) {
    routerOptions.routes = [
      ...(userRouterOptions.routes ?? []),
      ...defaultRouterOptions.routes,
    ];
  }
  console.log('routerOptions', routerOptions);

  const router = new VueRouter(routerOptions);

  if (params.useTitleSync) {
    router.afterEach((routeTo) => {
      const pageName = routeTo.name ?? 'Not Found';

      document.title = configStore
        .getConfig()
        .TITLE_TEMPLATE.replace(/{{title}}/, pageName);
    });
  }

  return router;
}
