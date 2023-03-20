<template>
  <div
    :class="{ 'spin-wrapper': true, _visible: visible }"
    :style="{ background: backgroundColor }"
  >
    <div class="spin-wrapper__inner">
      <template v-if="logoUrl">
        <img v-if="Boolean(logoUrl)" :src="logoUrl" alt="logo" />
        <div class="spinner-logo"></div>
      </template>
      <Spinner v-else size="50" :color="color" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { Spinner } from "@tager/admin-ui";

import { getLogoUrl } from "../utils/common";

export default defineComponent({
  name: "SplashScreen",
  components: { Spinner },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object || null,
      default: null,
    },
  },
  setup(props) {
    const logoUrl = computed(() => getLogoUrl(props.config.logo));
    const backgroundColor = computed(() => props.config.background || "#fff");
    const color = computed(() => props.config.color || "#000");

    return { logoUrl, backgroundColor, color };
  },
});
</script>

<style scoped lang="scss">
.spin-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  transition: 1s all ease;
  opacity: 0;
  visibility: hidden;
  &._visible {
    opacity: 1;
    visibility: visible;

    .spin-wrapper__inner {
      opacity: 1;
    }
  }

  &__inner {
    transition: 0.3s opacity ease;
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 120px;
  }

  .spinner-logo {
    position: absolute;
    width: 290px;
    height: 290px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #00b8d4;
    animation: spin 3s linear infinite;

    &:before {
      content: "";
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
      content: "";
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
