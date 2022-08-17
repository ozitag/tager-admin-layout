<template>
  <div>
    <ToastList />
    <SplashScreen v-show="isSplashScreenVisible" :config="splashScreenConfig" />

    <ErrorPage
      v-if="profileRequestError"
      :code="profileRequestError.code"
      :text="profileRequestError.text"
    />
    <div v-else>
      <Sidebar
        :display-version="shouldDisplayVersion"
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
        <Navbar
          :is-sidebar-collapsed="isSidebarCollapsed"
          :user-name="userName"
          :website-link="computedWebsiteLink"
          @sidebar-toggle="handleSidebarToggle"
        />
        <main class="main">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  type PropType,
  ref,
  watch,
} from "vue";
import { storeToRefs } from "pinia";

import {
  configStore,
  environment,
  isAbsoluteUrl,
  removeAuthTokensAndRedirectToAuthPage,
  RequestError,
  useI18n,
  useToast,
  type AppConfigType,
  useUserStore,
} from "@tager/admin-services";
import { type LinkType, ToastList } from "@tager/admin-ui";

import SplashScreen from "../SplashScreen.vue";
import { isProduction } from "../../utils/common";
import { MenuItemType } from "../../typings/menu";

import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/NavBar.vue";
import ErrorPage from "./components/ErrorPage.vue";

interface Props {
  sidebarMenuList: Array<MenuItemType>;
  websiteLink: LinkType | null;
}

export default defineComponent({
  name: "PageLayout",
  components: { Sidebar, Navbar, ToastList, SplashScreen, ErrorPage },
  props: {
    sidebarMenuList: {
      type: Array as PropType<Props["sidebarMenuList"]>,
      default: () => [],
    },
    websiteLink: {
      type: Object as PropType<Props["websiteLink"]>,
      default: null,
    },
  },
  setup(props) {
    const i18n = useI18n();

    const isSidebarCollapsed = ref(
      localStorage.getItem("isSidebarCollapsed") === "true"
    );

    function handleSidebarToggle() {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
      localStorage.setItem(
        "isSidebarCollapsed",
        String(isSidebarCollapsed.value)
      );
    }

    const config: AppConfigType = configStore.getConfig();
    const isSplashScreenEnabled = Boolean(config.SPLASH_SCREEN.enabled);
    const isLoading = ref(true);
    const isTimeoutInProgress = ref(false);
    const profileRequestError = ref<{
      code: string | number;
      text: string;
    } | null>(null);
    const toast = useToast();

    const userStore = useUserStore();
    const { profileStatus, profileError, profile } = storeToRefs(userStore);

    onMounted(() => {
      userStore.fetchProfile();

      updateProfileError();
    });

    function updateProfileError() {
      if (!profileError.value) {
        profileRequestError.value = null;
        return;
      }

      isLoading.value = false;

      if (profileError.value instanceof RequestError) {
        if (isProduction()) {
          if (
            profileError.value.status >= 400 &&
            profileError.value.status < 500
          ) {
            removeAuthTokensAndRedirectToAuthPage();
            return;
          }
        }

        const jsonResult = profileError.value.body as {
          [key: string]: any;
        };

        profileRequestError.value = {
          code: profileError.value.status,
          text: jsonResult?.message || "",
        };
      } else {
        profileRequestError.value = {
          code: "Error",
          text: "Something goes wrong. Please ask administrator",
        };
      }

      toast.show({
        variant: "danger",
        title: "Error",
        body: "User profile fetching has been failed",
      });
    }

    watch([profileError], updateProfileError);

    onMounted(() => {
      if (isSplashScreenEnabled) {
        isTimeoutInProgress.value = true;
        setTimeout(() => {
          isTimeoutInProgress.value = false;
        }, 3000);
      }
    });

    const userName = computed(() => {
      return profile.value?.name ?? "";
    });

    const computedWebsiteLink = computed(() => {
      if (props.websiteLink) return props.websiteLink;

      const urlFromEnv = environment.websiteButtonUrl;

      const isDisabled = ["false", "null"].includes(urlFromEnv);

      if (isDisabled) return null;

      const url = isAbsoluteUrl(urlFromEnv)
        ? urlFromEnv
        : isAbsoluteUrl(environment.websiteUrl)
        ? environment.websiteUrl
        : window.location.origin;

      return {
        url,
        text: i18n.t("layout:openWebsite"),
      };
    });

    const isSplashScreenVisible = computed(() => {
      return (
        isSplashScreenEnabled &&
        (isTimeoutInProgress.value || profileStatus.value === "LOADING")
      );
    });

    return {
      splashScreenConfig: config.SPLASH_SCREEN,
      brandConfig: config.BRAND,
      shouldDisplayVersion: false,
      userName,
      computedWebsiteLink,
      isSidebarCollapsed,
      handleSidebarToggle,
      isSplashScreenVisible,
      profileRequestError,
    };
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
