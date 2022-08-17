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
      <div
        :class="[
          'sidebar-body',
          { 'sidebar-body--with-subtitle': Boolean(subtitle) },
        ]"
      >
        <div v-if="shouldDisplayVersion" class="sidebar-version">
          <span class="version-word">ver.</span> {{ appVersion }}
        </div>

        <ul
          class="menu-list"
          @mouseover="handleMouseOver"
          @mouseleave="handleMouseLeave"
        >
          <li
            v-for="menuItem in menuItemListFiltered"
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
                <component :is="menuItem.icon" />
              </span>
              <span class="menu-link-name">{{ menuItem.text }}</span>
              <span
                v-show="Array.isArray(menuItem.children)"
                class="arrow-icon-container"
              >
                <ExpandMoreIcon />
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

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  type PropType,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import {
  environment,
  type AppConfigType,
  useUserStore,
} from "@tager/admin-services";
import { ExpandMoreIcon } from "@tager/admin-ui";

import { getLogoUrl } from "../../../utils/common";
import { MenuItemType } from "../../../typings/menu";

interface Props {
  isCollapsed: boolean;
  menuItemList: Array<MenuItemType>;
  brandConfig: AppConfigType["BRAND"];
  displayVersion: boolean;
}

export default defineComponent({
  name: "AppSidebar",
  components: { ExpandMoreIcon },
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
    menuItemList: {
      type: Array as PropType<Props["menuItemList"]>,
      required: true,
    },
    brandConfig: {
      type: Object as PropType<Props["brandConfig"]>,
      required: true,
    },
    displayVersion: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props) {
    const { checkScopes } = storeToRefs(useUserStore());

    const route = useRoute();
    const isHovered = ref(false);
    const appVersion = environment.version;

    const shouldDisplayVersion = computed(() => {
      return Boolean(props.displayVersion) && Boolean(appVersion);
    });

    const currentBrand = computed(() => {
      return props.isCollapsed && !isHovered.value
        ? props.brandConfig.small
        : props.brandConfig.large;
    });

    const logoUrl = computed(() => {
      return getLogoUrl(currentBrand.value.logo || "");
    });

    const shouldDisplayLogo = computed(() => {
      return Boolean(logoUrl.value);
    });

    const brandName = computed(() => {
      return currentBrand.value.label ?? "";
    });

    const subtitle = computed(() => {
      return props.brandConfig.subtitle ?? "";
    });

    const shouldDisplayBrandName = computed(() => {
      if (props.isCollapsed && !isHovered.value) {
        return !shouldDisplayLogo.value && Boolean(brandName.value);
      } else {
        return Boolean(brandName.value);
      }
    });

    const brandNameColor = computed(() => {
      if (props.isCollapsed && !isHovered.value) {
        return (
          props.brandConfig.small["label-color"] ??
          props.brandConfig.large["label-color"] ??
          undefined
        );
      } else {
        return (
          props.brandConfig.large["label-color"] ??
          props.brandConfig.small["label-color"] ??
          undefined
        );
      }
    });

    function handleMouseOver() {
      isHovered.value = true;
    }

    function handleMouseLeave() {
      isHovered.value = false;
    }

    const openItemIdList = ref<string[]>([]);

    const activeItemId = computed(() => {
      const activeItem = props.menuItemList.find((menuItem) =>
        menuItem.children
          ? menuItem.children.some((childItem) => childItem.url === route.path)
          : menuItem.url === route.path
      );

      return activeItem ? activeItem.id : null;
    });

    function openActiveItem() {
      if (
        activeItemId.value &&
        !openItemIdList.value.includes(activeItemId.value)
      ) {
        openItemIdList.value.push(activeItemId.value);
      }
    }

    watch(activeItemId, () => {
      openActiveItem();
    });

    function toggleMenuItem(itemId: string) {
      if (openItemIdList.value.includes(itemId)) {
        openItemIdList.value = openItemIdList.value.filter(
          (id) => id !== itemId
        );
      } else {
        openItemIdList.value.push(itemId);
      }
    }

    onMounted(() => {
      openActiveItem();
    });

    const menuItemListFiltered = computed<Array<MenuItemType>>(() => {
      return props.menuItemList
        .filter((menuItem) => {
          if (!menuItem.scopes) {
            return true;
          }

          return checkScopes.value(menuItem.scopes);
        })
        .map((menuItem) => {
          if (menuItem.children) {
            menuItem.children = menuItem.children.filter((childItem) => {
              if (!childItem.scopes) {
                return true;
              }

              return checkScopes.value(childItem.scopes);
            });
          }

          return menuItem;
        });
    });

    return {
      subtitle,
      isHovered,
      toggleMenuItem,
      handleMouseOver,
      handleMouseLeave,
      logoUrl,
      shouldDisplayLogo,
      brandName,
      shouldDisplayBrandName,
      brandNameColor,
      appVersion,
      shouldDisplayVersion,
      activeItemId,
      openItemIdList,
      menuItemListFiltered,
    };
  },
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

.sidebar-top-subtitle {
  display: block;
  text-align: center;
  border-top: 1px solid #eee;
  padding: 5px;
  margin-top: -10px;
  color: #000;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
