import Vue from 'vue';
import { configStore } from '@tager/admin-services';
import { AdminUiPlugin } from '@tager/admin-ui';
import '@tager/admin-ui/dist/admin-ui.css';

import Page from '@/components/Page';
import PageLayout from '@/components/PageLayout.vue';
import { createRouter } from '@/router';

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

const router = createRouter();

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

Vue.use(AdminUiPlugin);

new Vue({
  router,
  components: { PageLayout, Page },
  data() {
    return {
      sidebarMenuList,
      headerButtons: [
        { variant: 'secondary', text: 'say cow2', onClick: this.sayCow },
        {
          variant: 'secondary',
          text: 'Create entity link',
          href: 'http://ozitag.com',
        },
      ],
    };
  },
  methods: {
    sayCow() {
      alert('Cooow');
    },
  },
  template: `
    <page-layout v-bind:sidebar-menu-list="sidebarMenuList">
        <page title="Page Title" :header-buttons="headerButtons">
            <template v-slot:content>
                Page content
            </template>
        </page>
    </page-layout>
  `,
}).$mount('#app');
