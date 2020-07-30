<template>
  <div>
    <toast-provider />

    <splash-screen
      v-show="isSplashScreenVisible"
      :config="splashScreenConfig"
    />
    <div v-show="!isSplashScreenVisible">
      <sidebar
        :is-collapsed="isSidebarCollapsed"
        :menu-item-list="sidebarMenuList"
        :brand-config="brandConfig"
      />
      <div
        :class="[
          'page-layout-container',
          { 'sidebar-collapsed': isSidebarCollapsed },
        ]"
      >
        <navbar
          :is-sidebar-collapsed="isSidebarCollapsed"
          :user-name="userName"
          :website-link="computedWebsiteLink"
          @sidebar-toggle="handleSidebarToggle"
        ></navbar>
        <main class="main">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  configStore,
  removeAuthTokensAndRedirectToAuthPage,
} from '@tager/admin-services';
import { ToastProvider, ToastPlugin } from '@tager/admin-ui';

import SplashScreen from '../SplashScreen.vue';
import { isProduction } from '../../utils/common';
import { getUserProfile } from '../../services/requests';

import Sidebar from './components/Sidebar.vue';
import Navbar from './components/NavBar.vue';

Vue.use(ToastPlugin);

export default Vue.extend({
  name: 'PageLayout',
  components: { Sidebar, Navbar, ToastProvider, SplashScreen },
  props: {
    sidebarMenuList: {
      type: Array,
      default: () => [],
    },
    websiteLink: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const isSidebarCollapsed =
      localStorage.getItem('isSidebarCollapsed') === 'true';
    const config = configStore.getConfig();

    return {
      isSidebarCollapsed,
      profile: null,
      isLoading: true,
      isSplashScreenEnabled: Boolean(config.SPLASH_SCREEN?.enabled),
      isTimeoutInProgress: false,
    };
  },
  computed: {
    splashScreenConfig() {
      return configStore.getConfig().SPLASH_SCREEN;
    },
    brandConfig() {
      return configStore.getConfig().BRAND;
    },
    userName() {
      return this.profile?.name ?? '';
    },
    isSplashScreenVisible() {
      return (
        this.isSplashScreenEnabled &&
        (this.isTimeoutInProgress || this.isLoading)
      );
    },
    computedWebsiteLink() {
      const defaultLink = {
        url: process.env.VUE_APP_WEBSITE_URL || window.location.origin,
        label: this.$t('layout:openWebsite'),
      };

      return this.websiteLink ? { ...defaultLink, ...this.websiteLink } : null;
    },
  },
  mounted() {
    getUserProfile()
      .then((response) => {
        this.profile = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error(error);

        if (isProduction()) {
          removeAuthTokensAndRedirectToAuthPage();
        } else {
          this.isLoading = false;

          this.$toast({
            variant: 'danger',
            title: 'Error',
            body: 'Server error',
          });
        }
      });

    if (this.isSplashScreenEnabled) {
      this.isTimeoutInProgress = true;
      setTimeout(() => {
        this.isTimeoutInProgress = false;
      }, 3000);
    }
  },
  methods: {
    handleSidebarToggle() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      localStorage.setItem(
        'isSidebarCollapsed',
        String(this.isSidebarCollapsed)
      );
    },
  },
});
</script>

<style>
:root {
  --sidebar-width: 280px;
  --sidebar-colapsed-width: 70px;
}
</style>

<style scoped lang="scss">
.page-layout-container {
  position: relative;
  min-height: 100vh;
  transition: all 0.3s linear;
  padding-left: var(--sidebar-width);
  z-index: 1;

  &.sidebar-collapsed {
    padding-left: var(--sidebar-colapsed-width);
  }
}

.main {
  background-color: #f3f3f3;
  min-height: 100vh;
  padding: 75px 10px 0 10px;
  display: flex;
  flex-direction: column;
}
</style>
