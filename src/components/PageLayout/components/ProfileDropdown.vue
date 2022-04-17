<template>
  <div class="dropdown" @mouseenter="openMenu" @mouseleave="closeMenu">
    <button class="user-name">{{ userName }}</button>
    <DropdownMenu
      :options="options"
      :class="['menu', { open: isOpen }]"
      @dropdown-item:click="closeMenu"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import {
  removeAuthTokensAndRedirectToAuthPage,
  useI18n,
  useToast,
} from "@tager/admin-services";
import { DropdownMenu } from "@tager/admin-ui";
import type { DropdownMenuItemType } from "@tager/admin-ui";

import { isDevelopment } from "../../../utils/common";
import { signOut } from "../../../services/requests";

interface Props {
  userName: string;
}

export default defineComponent({
  name: "ProfileDropdown",
  components: { DropdownMenu },
  props: {
    userName: {
      type: String,
      default: "",
    },
  },
  setup(props: Props) {
    const i18n = useI18n();
    const toast = useToast();
    const isSignOutInProgress = ref(false);
    const isOpen = ref(false);

    function logout() {
      const handleError = () => {
        toast.show({
          variant: "danger",
          title: "Error",
          body: "Server error",
        });
        isSignOutInProgress.value = false;
      };

      const handleRedirect = () => {
        if (isDevelopment()) {
          isSignOutInProgress.value = false;
        } else {
          removeAuthTokensAndRedirectToAuthPage();
        }
      };

      isSignOutInProgress.value = true;

      return signOut()
        .then((response) => {
          if (response.success) {
            handleRedirect();
          } else {
            handleError();
          }
        })
        .catch((error) => {
          console.error(error);

          toast.show({
            variant: "danger",
            title: "Error",
            body: "Server error",
          });
          isSignOutInProgress.value = false;
        });
    }

    function closeMenu() {
      isOpen.value = false;
    }

    function openMenu() {
      isOpen.value = true;
    }

    const options = computed<Array<DropdownMenuItemType>>(() => [
      {
        type: "link",
        text: i18n.t("layout:changeUserProfile"),
        url: "/profile",
      },
      {
        type: "link",
        text: i18n.t("layout:changeUserPassword"),
        url: "/profile/password",
      },
      { type: "divider" },
      {
        type: "button",
        text: i18n.t("layout:logout"),
        onClick: logout,
      },
    ]);

    return {
      isOpen,
      options,
      openMenu,
      closeMenu,
    };
  },
});
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;

  .menu {
    right: 0;
    left: auto;

    &.open {
      top: calc(100% - 0.5rem);
      display: block;
    }
  }
}

.user-name {
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 600;
}
</style>
