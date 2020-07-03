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
        :class="['page-container', { 'sidebar-collapsed': isSidebarCollapsed }]"
      >
        <navbar
          :is-sidebar-collapsed="isSidebarCollapsed"
          :user-name="userName"
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
import { request, configStore, RequestError } from '@tager/admin-services';
import { ToastProvider, ToastPlugin } from '@tager/admin-ui';

import SplashScreen from '../SplashScreen.vue';
import { TranslatePlugin } from '../../i18n';
import {
  isProduction,
  removeTokenAndRedirectToLogin,
} from '../../utils/common';

import Sidebar from './components/Sidebar.vue';
import Navbar from './components/NavBar.vue';

function getProfile() {
  return request.get({ path: '/self' });
}

Vue.use(ToastPlugin);
Vue.use(TranslatePlugin);

export default Vue.extend({
  name: 'PageLayout',
  components: { Sidebar, Navbar, ToastProvider, SplashScreen },
  props: {
    sidebarMenuList: {
      type: Array,
      default: () => [],
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
  },
  mounted() {
    getProfile()
      .then((response) => {
        this.profile = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error(error);

        if (
          error instanceof RequestError &&
          error.status.code === 401 &&
          isProduction()
        ) {
          removeTokenAndRedirectToLogin();
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

<style scoped lang="scss">
.page-container {
  position: relative;
  min-height: 100vh;
  transition: all 0.3s linear;
  padding-left: 280px;
  z-index: 1;

  &.sidebar-collapsed {
    padding-left: 70px;
  }
}

.main {
  background-color: #f3f3f3;
  min-height: 100vh;
  padding: 75px 0 0 10px;
  display: flex;
  flex-direction: column;
}
</style>
