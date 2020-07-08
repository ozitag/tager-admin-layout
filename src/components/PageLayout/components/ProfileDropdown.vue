<template>
  <div class="dropdown" @mouseenter="openMenu" @mouseleave="closeMenu">
    <button class="user-name">{{ userName }}</button>
    <dropdown-menu
      :options="options"
      :class="['menu', { open: isOpen }]"
      @dropdown-item:click="closeMenu"
    />
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import { RequestError } from '@tager/admin-services';

import { isDevelopment, isProduction, removeTokenAndRedirectToLogin } from '../../../utils/common';
import { signOut } from '../../../services/requests';

export default Vue.extend({
  name: 'ProfileDropdown',
  props: {
    userName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isHovered: false,
      isOpen: false,
      options: [
        { type: 'link', label: 'Change profile', href: '/profile' },
        {
          type: 'link',
          label: 'Change password',
          href: '/profile/password'
        },
        { type: 'divider' },
        { type: 'button', label: 'Logout', onClick: this.logout }
      ]
    };
  },
  methods: {
    closeMenu() {
      this.isOpen = false;
    },
    openMenu() {
      this.isOpen = true;
    },
    logout() {
      const handleError = () => {
        this.$toast({
          variant: 'danger',
          title: 'Error',
          body: 'Server error'
        });
        this.isSignOutInProgress = false;
      };

      const handleRedirect = () => {
        if (isDevelopment()) {
          this.isSignOutInProgress = false;
        } else {
          removeTokenAndRedirectToLogin();
        }
      };

      this.isSignOutInProgress = true;

      signOut()
        .then(response => {
          if (response.success) {
            handleRedirect();
          } else {
            handleError();
          }
        })
        .catch(error => {
          console.error(error);

          if (error instanceof RequestError && error.status.code === 401 && isProduction()) {
            removeTokenAndRedirectToLogin();
          } else {
            this.$toast({
              variant: 'danger',
              title: 'Error',
              body: 'Server error'
            });
            this.isSignOutInProgress = false;
          }
        });
    }

  }
});
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  margin-right: 1.5rem;

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
