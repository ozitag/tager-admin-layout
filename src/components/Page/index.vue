<template>
  <div class="page-container">
    <top
      v-if="!isHeaderHidden"
      :title="title"
      :button-list="headerButtons"
      :top-slot="$slots.top"
    ></top>

    <div class="content-outer">
      <div :class="['content', { loading: isContentLoading }]">
        <div class="content-loading-overlay">
          <spinner size="50" />
        </div>

        <div class="content-inner">
          <slot name="default"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>

    <page-footer
      v-if="isFooterEnabled"
      :back-href="footer.backHref"
      :back-label="footer.backLabel"
      :on-submit="footer.onSubmit"
      :submit-label="footer.submitLabel"
      :is-submit-button-disabled="
        footer.isSubmitButtonDisabled || isContentLoading
      "
      :is-submitting="footer.isSubmitting"
      :footer-slot="$slots.footer"
    ></page-footer>
  </div>
</template>

<script lang="js">
import Vue from 'vue';

import Top from './components/Top';
import PageFooter from './components/PageFooter';

export default Vue.extend({
  name: 'Page',
  components: { Top, PageFooter },
  props: {
    title: {
      type: String,
      default: '',
    },
    headerButtons: {
      type: Array,
      default: () => []
    },
    footer: {
      type: Object,
      default: () => { return {}; }
    },
    isContentLoading: Boolean,
    isHeaderHidden: Boolean,
  },
  computed: {
    isFooterEnabled() {
      return this.$slots.footer || Object.keys(this.footer).length !== 0;
    }
  },
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
