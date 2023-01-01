<template>
  <div class="page-container">
    <div class="overlay-loading" v-if="isOverlayLoading">
      <Spinner size="50" />
    </div>
    <slot v-if="!isHeaderHidden" name="top">
      <Top :title="title" :button-list="headerButtons"></Top>
    </slot>

    <div class="content-outer">
      <div :class="['content', { loading: isContentLoading }]">
        <div class="content-loading-overlay">
          <Spinner size="50" />
        </div>

        <div class="content-inner" data-sticky-panel-limiter="true">
          <slot name="default"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>

    <slot v-if="isFooterEnabled" name="footer">
      <FormFooter
        :back-href="footer.backHref"
        :back-label="footer.backLabel"
        :submit-label="footer.submitLabel"
        :is-submit-button-disabled="
          footer.isSubmitButtonDisabled || isContentLoading
        "
        :is-submitting="footer.isSubmitting"
        @submit="footer.onSubmit"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

import {
  Spinner,
  FormFooter,
  type TagerFormSubmitEvent
} from "@tager/admin-ui";

import Top, { type TopButtonConfigType } from "./components/Top.vue";

interface PageFooterType {
  backHref?: string;
  backLabel?: string;
  onSubmit?: (event: TagerFormSubmitEvent) => void;
  submitLabel?: string;
  isSubmitButtonDisabled?: boolean;
  isSubmitting?: boolean;
}

interface Props {
  title: string;
  headerButtons: Array<TopButtonConfigType>;
  footer: PageFooterType;
  isContentLoading: boolean;
  isHeaderHidden: boolean;
}

export default defineComponent({
  name: "AppPage",
  components: { Top, Spinner, FormFooter },
  props: {
    title: {
      type: String,
      default: ""
    },
    headerButtons: {
      type: Array as PropType<Props["headerButtons"]>,
      default: () => []
    },
    footer: {
      type: Object as PropType<Props["footer"]>,
      default: () => ({})
    },
    isContentLoading: {
      type: Boolean,
      default: false
    },
    isOverlayLoading: {
      type: Boolean,
      default: false
    },
    isHeaderHidden: {
      type: Boolean,
      default: false
    }
  },
  setup(props: Props, context) {
    const isFooterEnabled = computed(() => {
      return context.slots.footer || Object.keys(props.footer).length !== 0;
    });

    return { isFooterEnabled };
  }
});
</script>

<style scoped lang="scss">
.page-container {
  padding: 0;
  background: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: -10px;
  position: relative;
}

.overlay-loading {
  position: absolute;
  inset: 0;
  background: rgba(243, 243, 243, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-outer {
  position: relative;
  background-color: white;
  flex: 1;
}

.content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;

  &.loading {
    .content-inner {
      filter: blur(3px);
    }

    .content-loading-overlay {
      display: flex;
    }
  }
}

.content-loading-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: rgba(243, 243, 243, 0.25);
  z-index: 10;
}

.content-inner {
  max-height: 100%;
  overflow: auto;
  padding: 1rem;
  flex: 1;
}
</style>
