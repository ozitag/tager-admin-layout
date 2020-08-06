<template>
  <div :class="['navbar', { 'sidebar-collapsed': isSidebarCollapsed }]">
    <div class="navbar-inner">
      <div class="left-block">
        <base-button variant="icon" @click="toggleSidebar">
          <svg-icon name="menu" />
        </base-button>

        <div class="breadcrumbs">
          <ul>
            <li v-for="(breadcrumb, index) of breadcrumbList" :key="index">
              <router-link exact active-class="active" :to="breadcrumb.url">
                {{ breadcrumb.text }}
              </router-link>
              <svg-icon name="chevronRight" />
            </li>
          </ul>
        </div>
      </div>

      <div class="right-block">
        <base-button
          v-if="Boolean(websiteLink)"
          variant="outline-secondary"
          class="website-button"
          :href="websiteLink.url"
          target="_blank"
        >
          {{ websiteLink.label }}
        </base-button>
        <profile-dropdown v-if="userName" :user-name="userName" />
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import { BaseButton, SvgIcon } from '@tager/admin-ui';

import ProfileDropdown from './ProfileDropdown';

export default Vue.extend({
  components: { SvgIcon, BaseButton, ProfileDropdown },
  props: {
    isSidebarCollapsed: Boolean,
    userName: {
      type: String,
      default: ''
    },
    websiteLink: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isSignOutInProgress: false,
    };
  },
  computed: {
    breadcrumbList() {
      const routeMeta = this.$route?.meta;
      return routeMeta?.getBreadcrumbs
        ? routeMeta.getBreadcrumbs(this.$route)
        : [];
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('sidebar-toggle');
    }
  }
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
