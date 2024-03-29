<template>
  <div :class="['footer', { collapsed }]">
    <button :disabled="!zoomOutAvailable" @click="onZoomOut">
      <ZoomOutIcon />
    </button>
    <span class="brand">TAGER</span>
    <button :disabled="!zoomInAvailable" @click="onZoomIn">
      <ZoomInIcon />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";

import { ZoomInIcon, ZoomOutIcon } from "@tager/admin-ui";

export default defineComponent({
  name: "SidebarTager",
  components: {
    ZoomInIcon,
    ZoomOutIcon,
  },
  props: {
    collapsed: Boolean,
  },
  setup() {
    const zoomValue = ref<number>(1.0);

    onMounted(() => {
      const defaultZoom = localStorage.getItem("tagerPageZoom");
      if (defaultZoom && defaultZoom !== "1.0") {
        zoomValue.value = parseFloat(defaultZoom);
      }
    });

    watch([zoomValue], () => {
      document.body.style.setProperty('--zoom', String(zoomValue.value));

      const changeZoomEvent = new CustomEvent("zoom-changed", {
        detail: {
          zoom: zoomValue.value,
        },
      });

      document.body.dispatchEvent(changeZoomEvent);

      localStorage.setItem("tagerPageZoom", zoomValue.value.toFixed(1));
    });

    const changeZoom = (delta: number) => {
      zoomValue.value = Math.round((zoomValue.value + delta) * 10) / 10;
    };

    const onZoomOut = () => changeZoom(-0.1);
    const onZoomIn = () => changeZoom(0.1);

    const zoomOutAvailable = computed<boolean>(() => zoomValue.value > 0.5);
    const zoomInAvailable = computed<boolean>(() => zoomValue.value < 1.3);

    return {
      zoomOutAvailable,
      zoomInAvailable,
      onZoomOut,
      onZoomIn,
    };
  },
});
</script>

<style scoped lang="scss">
.footer {
  padding: 0.75rem 0.5rem 0.75rem;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.0625);
  min-height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    display: block;
    margin: 0 0.5rem;
  }

  button:not(:disabled) {
    svg {
      transition: 0.3s all ease;
    }
    &:hover svg {
      opacity: 0.75;
    }
  }

  .brand {
    display: block;
    font-weight: 600;
    letter-spacing: 0.15em;
    font-size: 20px;
  }

  &.collapsed {
    .brand {
      font-size: 16px;
      letter-spacing: normal;
    }

    svg {
      display: none;
    }
  }
}
</style>
