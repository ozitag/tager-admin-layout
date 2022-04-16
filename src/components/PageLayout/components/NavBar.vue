<template>
  <div :class="['navbar', { 'sidebar-collapsed': isSidebarCollapsed }]">
    <div class="navbar-inner">
      <div class="left-block">
        <BaseButton variant="icon" @click="toggleSidebar">
          <MenuIcon />
        </BaseButton>

        <div class="breadcrumbs">
          <ul>
            <li v-for="(breadcrumb, index) of breadcrumbList" :key="index">
              <RouterLink exact active-class="active" :to="breadcrumb.url">
                {{ breadcrumb.text }}
              </RouterLink>
              <ChevronRightIcon />
            </li>
          </ul>
        </div>
      </div>

      <div class="right-block">
        <BaseButton
          v-if="Boolean(websiteLink) && userName"
          variant="outline-secondary"
          class="website-button"
          :href="websiteLink.url"
          target="_blank"
        >
          {{ websiteLink.text }}
        </BaseButton>
        <ProfileDropdown v-if="userName" :user-name="userName" />
        <Spinner v-else class="auth-spinner" size="30" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { RouterLink, useRoute } from "vue-router";

import {
  BaseButton,
  Spinner,
  MenuIcon,
  ChevronRightIcon,
  LinkType,
} from "@tager/admin-ui";
import { useI18n } from "@tager/admin-services";

import ProfileDropdown from "./ProfileDropdown.vue";

interface Props {
  isSidebarCollapsed: boolean;
  userName: string;
  websiteLink: LinkType | null;
}

export default defineComponent({
  components: {
    BaseButton,
    Spinner,
    ProfileDropdown,
    MenuIcon,
    ChevronRightIcon,
    RouterLink,
  },
  props: {
    isSidebarCollapsed: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      default: "",
    },
    websiteLink: {
      type: Object as PropType<Props["websiteLink"]>,
      default: null,
    },
  },
  emits: ["sidebar-toggle"],
  setup(props: Props, context) {
    const route = useRoute();
    const i18n = useI18n();

    function toggleSidebar() {
      context.emit("sidebar-toggle");
    }

    const breadcrumbList = computed(() => {
      return route.meta.getBreadcrumbs
        ? route.meta.getBreadcrumbs(route, i18n)
        : [];
    });

    return { breadcrumbList, toggleSidebar };
  },
});
</script>

<style scoped lang="scss">
.navbar {
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0625);
  display: block;
  margin-bottom: 0;
  padding: 0;
  position: fixed;
  transition: width 0.3s linear;
  min-width: 500px;
  width: calc(100% - var(--sidebar-width));
  z-index: 800;

  &.sidebar-collapsed {
    width: calc(100% - var(--sidebar-colapsed-width));
  }
}

.navbar-inner {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 25px;
}

.auth-spinner {
  color: var(--primary);
}

.right-block {
  display: flex;
  align-items: center;
  margin-left: 10px;

  .website-button:not(:last-child) {
    margin-right: 2rem;
  }
}

.left-block {
  display: flex;
  align-items: center;
  margin-left: -20px;
}

.breadcrumbs {
  margin-left: 1rem;
  font-size: 0.9rem;

  ul {
    display: flex;
  }

  li {
    display: inline-flex;
    align-items: center;

    a {
      &:hover:not(.active) {
        text-decoration: underline;
      }

      &.active {
        cursor: default;
        color: #000;
      }
    }

    &:last-child {
      svg {
        display: none;
      }
    }

    svg {
      margin: 0 0.2rem;
      width: 16px;
      height: 16px;
    }
  }
}
</style>
