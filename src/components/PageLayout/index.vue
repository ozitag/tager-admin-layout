<template>
  <div>
    <toast-provider />
    <splash-screen
      v-show="isSplashScreenVisible"
      :config="splashScreenConfig"
    />

    <ErrorPage v-if="error" :code="error.code" :text="error.text" />
    <div v-else>
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
  isAbsoluteUrl,
  removeAuthTokensAndRedirectToAuthPage,
  RequestError,
} from '@tager/admin-services';
import { ToastPlugin, ToastProvider } from '@tager/admin-ui';

import SplashScreen from '../SplashScreen.vue';
import { getUserProfile } from '../../services/requests';

import Sidebar from './components/Sidebar.vue';
import Navbar from './components/NavBar.vue';
import { isProduction, parseUserResponse } from '@/utils/common';
import ErrorPage from './components/ErrorPage';

Vue.use(ToastPlugin);

export default Vue.extend({
  name: 'PageLayout',
  components: { Sidebar, Navbar, ToastProvider, SplashScreen, ErrorPage },
  props: {
    sidebarMenuList: {
      type: Array,
      default: () => [],
    },
    websiteLink: {
      type: Object,
      default: null,
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
      error: null,
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
      if (this.websiteLink) return this.websiteLink;

      const urlFromEnv = process.env.VUE_APP_WEBSITE_BUTTON_URL;

      const isDisabled = ['false', 'null'].includes(urlFromEnv);

      if (isDisabled) return null;

      const url = isAbsoluteUrl(urlFromEnv)
        ? urlFromEnv
        : isAbsoluteUrl(process.env.VUE_APP_WEBSITE_URL)
        ? process.env.VUE_APP_WEBSITE_URL
        : window.location.origin;

      return {
        url,
        text: this.$t('layout:openWebsite'),
      };
    },
  },
  mounted() {
    getUserProfile()
      .then((response) => {
        this.profile = parseUserResponse(response.data);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error(error);

        this.isLoading = false;

        if (isProduction()) {
          if (error instanceof RequestError) {
            if (error.status >= 500) {
              this.error = { code: error.status, text: error.statusText };
              return;
            }

            if (error.status >= 400 && error.status < 500) {
              removeAuthTokensAndRedirectToAuthPage();
              return;
            }
          }

          this.error = {
            code: 'Error',
            text: 'Something goes wrong. Please ask administrator',
          };
        } else {
          this.$toast({
            variant: 'danger',
            title: 'Error',
            body: 'User profile fetching has been failed',
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
