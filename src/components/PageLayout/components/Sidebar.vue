<template>
  <aside :class="['sidebar', { collapsed: isCollapsed, hovered: isHovered }]">
    <div class="sidebar-inner">
      <div class="sidebar-top">
        <div class="sidebar-brand">
          <div v-if="shouldDisplayLogo" class="logo-container">
            <img :src="logoUrl" alt="" />
          </div>
          <span
            v-if="shouldDisplayBrandName"
            class="sidebar-top-title"
            :style="{ color: brandNameColor }"
          >
            {{ brandName }}
          </span>
        </div>
      </div>

      <div :class="['sidebar-body']">
        <div v-if="Boolean(appVersion)" class="sidebar-version">
          <span class="version-word">ver.</span> {{ appVersion }}
        </div>

        <ul
          class="menu-list"
          @mouseover="handleMouseOver"
          @mouseleave="handleMouseLeave"
        >
          <li
            v-for="menuItem in menuItemList"
            :key="menuItem.id"
            :class="[
              'menu-item',
              {
                active: isMenuItemActive(menuItem.id),
                expanded: isMenuItemOpen(menuItem.id),
              },
            ]"
          >
            <component
              :is="menuItem.children ? 'button' : 'router-link'"
              class="menu-link"
              :to="menuItem.children ? undefined : menuItem.path"
              @click="
                menuItem.children ? toggleMenuItem(menuItem.id) : undefined
              "
            >
              <span class="menu-link-icon-container">
                <svg-icon :name="menuItem.icon" />
              </span>
              <span class="menu-link-name">{{ menuItem.name }}</span>
              <span
                v-show="Array.isArray(menuItem.children)"
                class="arrow-icon-container"
              >
                <svg-icon name="expandMore" />
              </span>
            </component>
            <ul v-if="Array.isArray(menuItem.children)" class="child-menu-list">
              <li
                v-for="childItem of menuItem.children"
                :key="childItem.path"
                class="child-menu-item"
              >
                <router-link
                  active-class="active"
                  class="child-menu-link"
                  :to="childItem.path"
                  exact
                >
                  {{ childItem.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="footer">
          <span class="brand">TAGER</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="js">
import Vue from 'vue';
import { SvgIcon } from '@tager/admin-ui';

import { getLogoUrl } from '../../../utils/common';

export default Vue.extend({
  components: { SvgIcon },
  props: {
    isCollapsed: {
      type: Boolean,
      required: true
    },
    menuItemList: {
      type: Array,
      required: true
    },
    brandConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isHovered: false,
      openItemIdList: [],
      appVersion: process.env.VUE_APP_VERSION
    };
  },
  computed: {
    logoUrl() {
      if (this.isCollapsed && !this.isHovered) {
        return getLogoUrl(this.brandConfig.small.logo);
      } else {
        return getLogoUrl(this.brandConfig.large.logo);
      }
    },
    brandName() {
      if (this.isCollapsed && !this.isHovered) {
        return this.brandConfig.small.label ?? '';
      } else {
        return this.brandConfig.large.label ?? '';
      }
    },
    brandNameColor() {
      if (this.isCollapsed && !this.isHovered) {
        return (
          this.brandConfig.small['label-color'] ??
          this.brandConfig.large['label-color'] ??
          undefined
        );
      } else {
        return (
          this.brandConfig.large['label-color'] ??
          this.brandConfig.small['label-color'] ??
          undefined
        );
      }
    },
    shouldDisplayLogo() {
      return Boolean(this.logoUrl);
    },
    shouldDisplayBrandName() {
      if (this.isCollapsed && !this.isHovered) {
        return !this.shouldDisplayLogo && Boolean(this.brandName);
      } else {
        return Boolean(this.brandName);
      }
    }
  },
  methods: {
    handleMouseOver() {
      this.isHovered = true;
    },
    handleMouseLeave() {
      this.isHovered = false;
    },
    toggleMenuItem(itemId) {
      if (this.openItemIdList.includes(itemId)) {
        this.openItemIdList = this.openItemIdList.filter(id => id !== itemId);
      } else {
        this.openItemIdList.push(itemId);
      }
    },
    isMenuItemActive(itemId) {
      const foundItem = this.menuItemList.find(
        menuItem => menuItem.id === itemId
      );

      if (!foundItem) return false;

      return foundItem.children
        ? foundItem.children.some(
          childItem => childItem.path === this.$route.path
        )
        : foundItem.path === this.$route.path;
    },
    isMenuItemOpen(itemId) {
      return this.openItemIdList.includes(itemId);
    }
  }
});
</script>

<style scoped lang="scss">
.sidebar {
  background-color: #fff;
  bottom: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transition: width 0.3s linear;
  width: 280px;
  z-index: 1000;

  &.collapsed:not(.hovered) {
    width: 70px;

    .sidebar-top {
      width: 70px;
      border-bottom: 1px solid transparent;
      justify-content: center;
    }

    .sidebar-top-title {
      text-align: center;
      margin-left: 0;
    }

    .menu-item.expanded .child-menu-list,
    .menu-link-name,
    .arrow-icon-container {
      display: none;
    }

    .menu-link-icon-container {
      margin-right: 0;
    }

    .footer {
      .brand {
        letter-spacing: normal;
        font-size: 16px;
      }
    }
  }
}

.sidebar-inner {
  position: relative;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.0625);
}

.sidebar-top {
  border-bottom: 1px solid rgba(0, 0, 0, 0.0625);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 0.5rem;
  height: 66px;
  line-height: 0;
}

.sidebar-version {
  display: block;
  padding: 0.2rem 0.2rem 0.2rem 0.2rem;
  font-size: 0.9rem;
  text-align: center;
  margin-top: -15px;
  white-space: nowrap;

  .collapsed & {
    .version-word {
      display: none;
    }
  }
}

.logo-container {
  height: calc(70px - 1rem);
  width: auto;
  flex-shrink: 0;
  max-width: 100%;
  margin: 0 auto;

  img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
}

.logo {
  vertical-align: middle;
}

.sidebar-top-title {
  display: block;
  text-align: center;

  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: 0.1rem;
  font-weight: 600;
  margin-left: 1rem;
  flex: 1;
}

.sidebar-body {
  height: calc(100vh - 51px);
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.menu-list {
  flex: 1;
  list-style-type: none;
}

.menu-item {
  cursor: pointer;

  &.active {
  }

  &.expanded {
    .arrow-icon-container svg {
      transform: rotate(180deg);
    }

    .child-menu-list {
      display: block;
    }
  }
}

.menu-link {
  display: flex;
  align-items: center;
  width: 100%;
  color: rgba(0, 0, 0, 0.5);
  padding: 4px 15px 4px 15px;
  position: relative;
  white-space: nowrap;
  min-width: 1px;

  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }

  .expanded & {
    color: rgba(0, 0, 0, 0.7);
  }
}

.menu-link-name {
  font-size: 1rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.menu-link-icon-container {
  width: 35px;
  height: 35px;
  margin-right: 0.5rem;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    display: block;
    width: 20px;
    height: 20px;
  }
}

.arrow-icon-container {
  margin-left: auto;
  transform: rotate(180deg);

  svg {
    transition: transform 0.2s linear;
    display: block;
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
  }
}

.child-menu-list {
  display: none;
  background: #fafafa;
  padding: 10px 0;
}

.child-menu-item {
  padding: 0 0 0 50px;
  &:first-child {
    padding-top: 0;
    margin-top: -5px;
  }
  &:last-child {
    padding-bottom: 0;
  }
}

.child-menu-link {
  display: block;
  color: #888;
  white-space: nowrap;
  padding: 7px 15px;
  font-size: 0.95rem;

  &:hover {
    color: #555;
  }

  &.active {
    color: #000;
  }
}

.footer {
  padding: 0.75rem 0.5rem 0.75rem;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.0625);
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  .brand {
    display: block;
    font-weight: 600;
    letter-spacing: 0.2em;
  }
}
</style>
