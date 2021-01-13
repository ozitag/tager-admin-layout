<template>
  <div class="spin-wrapper" :style="{ background: backgroundColor }">
    <img v-if="Boolean(logoUrl)" :src="logoUrl" />
    <div class="spinner"></div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';

import { getLogoUrl } from '../utils/common';

export default Vue.extend({
  name: 'SplashScreen',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  computed: {
    logoUrl() {
      return getLogoUrl(this.config.logo);
    },
    backgroundColor() {
      return this.config.background;
    }
  }
});
</script>

<style scoped lang="scss">
.spin-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  img {
    width: 120px;
  }

  .spinner {
    position: absolute;
    width: 290px;
    height: 290px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #00b8d4;
    animation: spin 3s linear infinite;

    &:before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #ff5252;
      animation: spin-reverse 1.1s linear infinite;
    }
    &:after {
      content: '';
      position: absolute;
      top: 45px;
      left: 45px;
      right: 45px;
      bottom: 45px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #faf49a;
      animation: spin 2s linear infinite;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-reverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
