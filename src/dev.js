import Vue from 'vue';
import VueRouter from 'vue-router';
import { configStore } from '@tager/admin-services';
import '@tager/admin-ui/dist/admin-ui.css';

import BaseLayout from '@/components/BaseLayout.vue';
import NotFound from '@/views/NotFound';

const TEST_CONFIG = {
  APP_NAME: 'OZiTAG_ADMIN',
  TITLE_TEMPLATE: 'OZiTAG Admin - {{title}}',
  LANGUAGE: 'EN',
  BRAND: {
    small: {
      logo: 'logo-small.svg',
      label: 'OZi',
      'label-color': '#DD6900',
    },
    large: {
      logo: 'logo.svg',
      label: 'OZiTAG',
      'label-color': '#DD6900',
    },
  },
  SPLASH_SCREEN: {
    enabled: true,
    logo: 'logo.svg',
    background: '#1e1e1e',
  },
};

configStore.setConfig(TEST_CONFIG);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

const sidebarMenuList = [
  {
    id: 'catalog',
    name: 'Catalog',
    path: '',
    icon: 'viewList',
    children: [
      {
        path: '/presets',
        name: 'All presets',
      },
      {
        path: '/presets/create',
        name: 'Create presets',
      },
    ],
  },

  {
    id: 'orders',
    name: 'Orders',
    path: '/orders',
    icon: 'assignment',
  },
  {
    id: 'settings',
    name: 'Settings',
    path: '',
    icon: 'settings',
    children: [
      {
        path: '/settings/common',
        name: 'Common',
      },
      {
        path: '/settings/seo',
        name: 'SEO',
      },
    ],
  },
];

new Vue({
  router,
  components: { BaseLayout },
  data() {
    return { sidebarMenuList };
  },
  template: `
    <base-layout v-bind:sidebar-menu-list="sidebarMenuList">
      <router-view/>
    </base-layout>
  `,
}).$mount('#app');
