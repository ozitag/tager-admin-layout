import Vue from 'vue';
import VueRouter from 'vue-router';
import { configStore } from '@tager/admin-services';

import NotFound from '@/views/NotFound';

const NOT_FOUND_ROUTE = {
  path: '*',
  name: 'Not Found',
  component: NotFound,
};

export function createRouter(userRouterOptions = {}, userParams = {}) {
  Vue.use(VueRouter);

  const defaultRouterOptions = {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [NOT_FOUND_ROUTE],
  };
  const defaultParams = {
    useNotFoundRoute: true,
    useTitleSync: true,
  };

  const routerOptions = {
    ...defaultRouterOptions,
    ...userRouterOptions,
  };
  const params = { ...defaultParams, ...userParams };

  if (params.useNotFoundRoute) {
    routerOptions.routes = [...routerOptions.routes, NOT_FOUND_ROUTE];
  }

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
