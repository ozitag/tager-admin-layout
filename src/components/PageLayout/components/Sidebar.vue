<template>
  <aside :class="['sidebar', { collapsed: isCollapsed, hovered: isHovered }]">
    <div class="sidebar-inner">
      <div class="sidebar-top">
        <div class="sidebar-brand">
          <div
            v-if="shouldDisplayLogo"
            class="logo-container"
            data-sidebar-logo-container
          >
            <img :src="logoUrl" alt="" data-sidebar-logo />
          </div>
          <span
            v-if="shouldDisplayBrandName"
            class="sidebar-top-title"
            :style="{ color: brandNameColor }"
          >
            {{ brandName }}
          </span>
        </div>
        <span v-if="Boolean(subtitle)" class="sidebar-top-subtitle">
            {{ subtitle }}
          </span>
      </div>

      <div :class="['sidebar-body', { 'sidebar-body--with-subtitle': Boolean(subtitle) }]">
        <div v-if="shouldDisplayVersion" class="sidebar-version">
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
                active: menuItem.id === activeItemId,
                expanded: openItemIdList.includes(menuItem.id),
              },
            ]"
          >
            <component
              :is="menuItem.children ? 'button' : 'router-link'"
              class="menu-link"
              :to="menuItem.children ? undefined : menuItem.url"
              @click="
                menuItem.children ? toggleMenuItem(menuItem.id) : undefined
              "
            >
              <span class="menu-link-icon-container">
                <svg-icon :name="menuItem.icon" />
              </span>
              <span class="menu-link-name">{{ menuItem.text }}</span>
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
                :key="childItem.url"
                class="child-menu-item"
              >
                <router-link
                  active-class="active"
                  class="child-menu-link"
                  :to="childItem.url"
                  exact
                >
                  {{ childItem.text }}
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
import Vue from "vue";
import { SvgIcon } from "@tager/admin-ui";

import { getLogoUrl } from "../../../utils/common";

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
    },
    displayVersion: {
      type: Boolean
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
        return this.brandConfig.small.label ?? "";
      } else {
        return this.brandConfig.large.label ?? "";
      }
    },
    subtitle() {
      return this.brandConfig.subtitle ?? "";
    },
    brandNameColor() {
      if (this.isCollapsed && !this.isHovered) {
        return (
          this.brandConfig.small["label-color"] ??
          this.brandConfig.large["label-color"] ??
          undefined
        );
      } else {
        return (
          this.brandConfig.large["label-color"] ??
          this.brandConfig.small["label-color"] ??
          undefined
        );
      }
    },
    shouldDisplayVersion() {
      return Boolean(this.displayVersion) && Boolean(process.env.VUE_APP_VERSION);
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
    },
    activeItemId() {
      const activeItem = this.menuItemList.find(
        menuItem => menuItem.children
          ? menuItem.children.some(
            childItem => childItem.url === this.$route.path
          )
          : menuItem.url === this.$route.path
      );

      return activeItem ? activeItem.id : null;
    }
  },
  watch: {
    activeItemId() {
      this.openActiveItem();
    }
  },
  mounted() {
    this.openActiveItem();
  },
  methods: {
    openActiveItem() {
      if (this.activeItemId && !this.openItemIdList.includes(this.activeItemId)) {
        this.openItemIdList.push(this.activeItemId);
      }
    },
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
  width: var(--sidebar-width);
  z-index: 1000;

  .sidebar-top-subtitle {
    display: block;
    text-align: center;
    border-top: 1px solid #eee;
    padding: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &.collapsed:not(.hovered) {
    width: var(--sidebar-colapsed-width);

    .sidebar-top {
      min-width: var(--sidebar-colapsed-width);
      width: var(--sidebar-colapsed-width);
      border-bottom: 1px solid transparent;
      justify-content: center;
    }

    .sidebar-top-subtitle {
      border-bottom: 1px solid #eee;
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
  min-width: var(--sidebar-width);
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
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: auto;
    max-width: 90%;
    max-height: 90%;
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

  &:first-child {
    margin-left: 0;
  }
}

.sidebar-body {
  height: calc(100vh - 51px);
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  &--with-subtitle {
    height: calc(100vh - 71px);
  }
}

.menu-list {
  flex: 1;
  list-style-type: none;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #eee;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(170, 170, 170, 0.6);

    &:hover {
      background-color: rgba(153, 153, 153, 0.6);
    }
  }
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
  min-height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;

  .brand {
    display: block;
    font-weight: 600;
    letter-spacing: 0.15em;
    font-size: 20px;
  }
}
</style>
